import { Injectable, inject, isDevMode } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  ConditionsStatementTuple,
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
  private globalVariableService = inject(GlobalVariableService);
  private httpRequestCacheService = inject(HttpRequestCacheService);
  private cancelAll$ = new Subject<void>();

  cancelAllRequest(): void {
    this.cancelAll$.next();
    this.httpRequestCacheService.reset();
  }

  onDestroy(): void {
    this.cancelAllRequest();
    this.cancelAll$.complete();
  }

  getOptions$(srcConfig: OptionSourceConfig): Observable<OptionItem[]> {
    if (!srcConfig) {
      return EMPTY;
    }

    const { url, method, headers, mapData } = srcConfig;
    const bodyMapped = this.mapBodyValue(srcConfig);
    const src = this.getMappedSrc(url, bodyMapped);

    return this.httpRequestCacheService
      .request$({
        src,
        method,
        headers,
        body: bodyMapped,
      })
      .pipe(
        map((x) => this.mapData(x, mapData)),
        tap((x) => {
          if (isDevMode() && x.length > 100) {
            console.warn(
              `NgDynamicJsonForm:\nThe data length from the response ${srcConfig.url} is > 100.\n` +
                `Please make sure there is optimization made. e.g. virtual scroll, lazy loading`,
            );
          }
        }),
        catchError(() => of([])),
        takeUntil(this.cancelAll$),
      );
  }

  getOptionsByFilter$(props: {
    srcConfig: OptionSourceConfig;
    valueChangeCallback: () => void;
    finalizeCallback: () => void;
  }): Observable<OptionItem[]> {
    const { srcConfig, finalizeCallback, valueChangeCallback } = props;

    const sourceValueChanges$ = this.onTriggerControlChanges$(
      srcConfig.filter || srcConfig.trigger,
      valueChangeCallback,
    );

    if (!srcConfig.filter) {
      return of([]);
    }

    const mapTupleFn = (
      tuple: ConditionsStatementTuple,
      triggerValue: any,
      optionItem: OptionItem | null | undefined,
    ): ConditionsStatementTuple => {
      const [triggerValuePath, operator, optionValuePath] = tuple;
      return [
        getValueInObject(triggerValue, triggerValuePath),
        operator,
        getValueInObject(optionItem?.value, optionValuePath),
      ];
    };

    const data$ = this.getOptions$(srcConfig).pipe(
      finalize(() => finalizeCallback()),
    );

    const result$ = combineLatest([data$, sourceValueChanges$]).pipe(
      map(([options, value]) =>
        options.filter((optionItem) => {
          const result = evaluateConditionsStatements(
            srcConfig.filter!.conditions!,
            (e) => mapTupleFn(e, value, optionItem),
          );

          return result;
        }),
      ),
      tap(() => finalizeCallback()),
    );

    return result$.pipe(takeUntil(this.cancelAll$));
  }

  getOptionsOnTrigger$(props: {
    srcConfig: OptionSourceConfig;
    valueChangeCallback: () => void;
    finalizeCallback: () => void;
  }): Observable<OptionItem[]> {
    const { srcConfig, finalizeCallback, valueChangeCallback } = props;

    const sourceValueChanges$ = this.onTriggerControlChanges$(
      srcConfig.filter || srcConfig.trigger,
      valueChangeCallback,
    );

    if (!srcConfig.trigger) {
      return of([]);
    }

    return sourceValueChanges$.pipe(
      switchMap(() =>
        this.getOptions$(srcConfig).pipe(finalize(() => finalizeCallback())),
      ),
      takeUntil(this.cancelAll$),
    );
  }

  /**The `valueChanges` of trigger control */
  private onTriggerControlChanges$(
    triggerConfig: OptionSourceConfig['trigger'] | OptionSourceConfig['filter'],
    valueChangesCallback?: () => void,
  ): Observable<any> {
    if (!triggerConfig) {
      return EMPTY;
    }

    const { by, debounceTime: _debounceTime = 0 } = triggerConfig;
    if (!by.trim()) {
      return EMPTY;
    }

    const form = this.globalVariableService.rootForm;
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
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      // The callback when valueChanges emit, should place before debounceTime
      tap(() => valueChangesCallback?.()),
      debounceTime(_debounceTime),
      map((x) => (!paths.valuePath ? x : getValueInObject(x, paths.valuePath))),
    );
  }

  private mapData(
    input: Object,
    mapData: OptionSourceConfig['mapData'],
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

  private getMappedSrc(src: string, body: any): string {
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

  private mapBodyValue(config: OptionSourceConfig): any {
    if (!config.trigger) return config.body;

    const triggerBody = config.trigger.body;
    if (!triggerBody) return null;

    const form = this.globalVariableService.rootForm;
    const result = Object.keys(triggerBody).reduce((acc, key) => {
      const { controlPath, valuePath } = getControlAndValuePath(
        triggerBody[key],
      );

      const control = form?.get(controlPath);
      const value = getValueInObject(control?.value, valuePath);

      acc[key] = !control ? triggerBody[key] : value;
      return acc;
    }, {} as any);

    return result;
  }
}
