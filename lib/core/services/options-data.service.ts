import { Injectable, inject, isDevMode } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  ConditionsStatementTupple,
  OptionItem,
  OptionSourceConfig,
} from '../models';
import { evaluateConditionsStatements } from '../utilities/evaluate-conditions-statements';
import { getControlAndValuePath } from '../utilities/get-control-and-value-path';
import { getValueInObject } from '../utilities/get-value-in-object';
import { trimObjectByKeys } from '../utilities/trim-object-by-keys';
import { GlobalVariableService } from './global-variable.service';
import { HttpRequestCacheService } from './http-request-cache.service';

@Injectable()
export class OptionsDataService {
  private _globalVariableService = inject(GlobalVariableService);
  private _httpRequestCacheService = inject(HttpRequestCacheService);
  private _cancelAll$ = new Subject<void>();

  getOptions$(srcConfig: OptionSourceConfig): Observable<OptionItem[]> {
    if (!srcConfig) {
      return EMPTY;
    }

    const event$ = () => {
      if (srcConfig.filter) return this._getOptionsByFilter$(srcConfig);
      if (srcConfig.trigger) return this._getOptionsOnTrigger$(srcConfig);
      return this._getOptions$(srcConfig);
    };

    return event$().pipe(
      tap((x) => {
        if (isDevMode() && x.length > 100) {
          console.warn(
            `NgDynamicJsonForm:\nThe data length from the response ${srcConfig.url} is > 100.\n` +
              `Please make sure there is optimization made. e.g. virtual scroll, lazy loading`
          );
        }
      })
    );
  }

  cancelAllRequest(): void {
    this._cancelAll$.next();
    this._httpRequestCacheService.reset();
  }

  onDestroy(): void {
    this.cancelAllRequest();
    this._cancelAll$.complete();
  }

  private _getOptions$(
    srcConfig: OptionSourceConfig
  ): Observable<OptionItem[]> {
    if (!srcConfig) {
      return EMPTY;
    }

    const { url, method, mapData } = srcConfig;
    const bodyMapped = this._mapBodyValue(srcConfig);
    const src = this._getMappedSrc(url, bodyMapped);

    return this._httpRequestCacheService
      .request$({
        src,
        method,
        body: bodyMapped,
      })
      .pipe(
        map((x) => this._mapData(x, mapData)),
        catchError(() => of([])),
        takeUntil(this._cancelAll$)
      );
  }

  private _getOptionsByFilter$(
    srcConfig: OptionSourceConfig
  ): Observable<OptionItem[]> {
    if (!srcConfig.filter) return of([]);

    const mapTuppleFn = (
      tupple: ConditionsStatementTupple,
      triggerValue: any,
      optionItem: OptionItem | null | undefined
    ): ConditionsStatementTupple => {
      const [triggerValuePath, operator, optionValuePath] = tupple;
      return [
        getValueInObject(triggerValue, triggerValuePath),
        operator,
        getValueInObject(optionItem?.value, optionValuePath),
      ];
    };

    const filterOptions$ = this._getOptions$(srcConfig).pipe(
      switchMap((x) =>
        combineLatest([of(x), this._onTriggerControlChanges$(srcConfig.filter)])
      ),
      map(([options, value]) =>
        options.filter((optionItem) => {
          const result = evaluateConditionsStatements(
            srcConfig.filter!.conditions!,
            (e) => mapTuppleFn(e, value, optionItem)
          );

          return result;
        })
      )
    );

    return filterOptions$.pipe(takeUntil(this._cancelAll$));
  }

  private _getOptionsOnTrigger$(
    srcConfig: OptionSourceConfig
  ): Observable<OptionItem[]> {
    if (!srcConfig.trigger) return of([]);

    return this._onTriggerControlChanges$(srcConfig.trigger).pipe(
      switchMap((x) => {
        const emptyValue = x === undefined || x === null || x === '';
        return emptyValue ? of([]) : this._getOptions$(srcConfig);
      }),
      takeUntil(this._cancelAll$)
    );
  }

  /**The `valueChanges` of trigger control */
  private _onTriggerControlChanges$(
    triggerConfig: OptionSourceConfig['trigger'] | OptionSourceConfig['filter']
  ): Observable<any> {
    if (!triggerConfig) return EMPTY;

    const { by, debounceTime: _debouceTime = 0 } = triggerConfig;
    if (!by.trim()) return EMPTY;

    const form = this._globalVariableService.rootForm;
    const paths = getControlAndValuePath(by);
    const control = form?.get(paths.controlPath);

    if (!control) {
      if (isDevMode()) {
        console.warn(`Form control ${paths.controlPath} not found.`);
      }
      return EMPTY;
    }

    return control.valueChanges.pipe(
      startWith(control.value),
      debounceTime(_debouceTime),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map((x) => (!paths.valuePath ? x : getValueInObject(x, paths.valuePath)))
    );
  }

  private _mapData(
    input: Object,
    mapData: OptionSourceConfig['mapData']
  ): OptionItem[] {
    if (!input) return [];

    const { contentPath, slice, labelKey, valueKeys } = mapData ?? {};
    const data = contentPath ? getValueInObject(input, contentPath) : input;
    const filteredValueKeys = [...new Set(valueKeys)].filter(Boolean);

    if (!data || !Array.isArray(data)) return [];

    const slicedData = data.slice(slice?.[0] ?? 0, slice?.[1] ?? data.length);
    const result: OptionItem[] = slicedData.map((item: any) => ({
      label: getValueInObject(item, labelKey),
      value: !filteredValueKeys.length
        ? item
        : trimObjectByKeys(item, filteredValueKeys),
    }));

    return result;
  }

  private _getMappedSrc(src: string, body: any): string {
    // url variables (.../:x/:y/:z)
    const urlVariables = src.match(/:([^/:\s]+)/g) || ([] as string[]);

    if (typeof body !== 'object') {
      return src;
    }

    if (!urlVariables.length) {
      return `${src}?${new URLSearchParams(body).toString()}`;
    }

    return Object.keys(body).reduce((acc, key) => {
      acc = acc.replace(`:${key}`, `${body[key]}`);
      return acc;
    }, src);
  }

  private _mapBodyValue(config: OptionSourceConfig): any {
    if (!config.trigger) return config.body;

    const triggerBody = config.trigger.body;
    if (!triggerBody) return null;

    const form = this._globalVariableService.rootForm;
    const result = Object.keys(triggerBody).reduce((acc, key) => {
      const paths = getControlAndValuePath(triggerBody[key]);
      const value = getValueInObject(
        form?.get(paths.controlPath)?.value,
        paths.valuePath
      );

      acc[key] = value;
      return acc;
    }, {} as any);

    return result;
  }
}
