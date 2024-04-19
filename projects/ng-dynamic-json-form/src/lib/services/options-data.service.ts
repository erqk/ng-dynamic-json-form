import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  EMPTY,
  Observable,
  Subject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  from,
  map,
  of,
  onErrorResumeNextWith,
  startWith,
  switchMap,
  takeUntil,
  tap,
  toArray,
} from 'rxjs';
import {
  FormControlOptions,
  OptionItem,
  OptionSource,
  OptionTrigger,
} from '../models/form-control-options.interface';
import { getControlAndValuePath } from '../utilities/get-control-and-value-path';
import { getValueInObject } from '../utilities/get-value-in-object';
import { trimObjectByKeys } from '../utilities/trim-object-by-keys';

@Injectable()
export class OptionsDataService {
  private _http = inject(HttpClient);
  private _cancelAll$ = new Subject<void>();
  private _requests: { src: string; data: Subject<any>; params?: any }[] = [];

  getOptions$(config: FormControlOptions): Observable<OptionItem[]> {
    const { sourceList } = config;
    if (!sourceList?.length) return EMPTY;

    return from(sourceList).pipe(
      concatMap((x) =>
        this._fetchData$({
          config: x,
          useTrigger: false,
        })
      ),
      toArray(),
      map((x) => x.flat()),
      tap((x) => {
        if (x.length > 500) {
          console.warn(
            'Data amount too big, auto limit to 500 items.\n' +
              'Please consider using typeahead or other implementation to filter the data'
          );
        }
      }),
      takeUntil(this._cancelAll$)
    );
  }

  filterOptionsOnTrigger$(
    form: UntypedFormGroup,
    config: OptionTrigger
  ): Observable<OptionItem[]> {
    const { filterMatchPath } = config;
    const valueChanges$ = (rawData: OptionItem[]) =>
      this._onTriggerControlChanges$(form, config).pipe(
        map((x) => {
          if (!filterMatchPath) return x;

          return rawData.filter(
            (item) => getValueInObject(item.value, filterMatchPath) === x
          );
        })
      );

    // Check if `valueKeys` is provided and the value of `filterMatchPath` is included
    // to ensure filter works properly
    if (filterMatchPath) {
      const valueKeys = config.data.valueKeys || [];
      const key = filterMatchPath.split('.').slice(-1)[0] || '';

      if (valueKeys.length > 0 && !valueKeys.includes(key)) {
        valueKeys.push(key);
        config.data.valueKeys = [...new Set(valueKeys)];
      }
    }

    return this._fetchData$({ config, useTrigger: true }).pipe(
      switchMap((x) => valueChanges$(x)),
      takeUntil(this._cancelAll$)
    );
  }

  requestOptionsOnTrigger$(
    form: UntypedFormGroup,
    config: OptionTrigger
  ): Observable<OptionItem[]> {
    return this._onTriggerControlChanges$(form, config).pipe(
      switchMap((x) => {
        const emptyValue = x === undefined || x === null || x === '';
        return emptyValue
          ? of([])
          : this._fetchData$({ config, useTrigger: true, controlValue: x });
      }),
      takeUntil(this._cancelAll$)
    );
  }

  cancelAllRequest(): void {
    this._cancelAll$.next();
    this._requests
      .filter((x) => !x.data.closed)
      .forEach(({ data }) => {
        data.next([]);
        data.complete();
        data.unsubscribe();
      });

    this._requests = [];
  }

  onDestroy(): void {
    this.cancelAllRequest();
    this._cancelAll$.complete();
  }

  private _fetchData$({
    config,
    useTrigger,
    controlValue,
  }: {
    config: OptionSource;
    useTrigger: boolean | undefined;
    controlValue?: any;
  }): Observable<OptionItem[]> {
    const {
      data: { path, labelKey, valueKeys = [] },
      slice,
    } = config;

    const _valueKeys = [...new Set(valueKeys)].filter((x) => x.length > 0);
    const result$ = this._httpRequest$(config, useTrigger, controlValue).pipe(
      onErrorResumeNextWith(),
      map((x: any) => {
        if (!x) return [];

        const targetData = !path ? x : getValueInObject(x, path);
        if (!targetData || !Array.isArray(targetData)) return [];

        const slicedData = targetData.slice(
          slice?.[0] ?? 0,
          slice?.[1] ?? targetData.length
        );

        const result: OptionItem[] = slicedData.map((item) => ({
          label: getValueInObject(item, labelKey),
          value: !_valueKeys.length ? item : trimObjectByKeys(item, _valueKeys),
        }));

        return result;
      })
    );

    return result$;
  }

  /**The observable that listen to `valueChanges` of trigger control,
   * and return it's value
   */
  private _onTriggerControlChanges$(
    form: UntypedFormGroup,
    config: OptionTrigger
  ): Observable<any> {
    const { triggerValuePath, debounceTime: _debouceTime = 0 } = config;
    if (!triggerValuePath.trim()) return EMPTY;

    const paths = getControlAndValuePath(triggerValuePath);
    const control = form.get(paths.controlPath);

    if (!control) return EMPTY;

    return control.valueChanges.pipe(
      startWith(control.value),
      debounceTime(_debouceTime),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map((x) => (!paths.valuePath ? x : getValueInObject(x, paths.valuePath)))
    );
  }

  private _httpRequest$(
    config: OptionSource,
    useTrigger: boolean | undefined,
    controlValue?: any
  ): Observable<Object | null> {
    const { method, params, src } = config;

    const newSrc = this._getMappedSrc(config, controlValue);
    const newParams = useTrigger
      ? this._getDynamicParams(config, controlValue)
      : params || {};

    if (!method) {
      console.warn(`Please specify HTTP method for ${src}`);
    }

    // This cannot be a constant because the cache is available once the first request is made.
    // Then, we update the cache after the response is get.
    const prevSameRequest = () =>
      this._requests.find((x) => {
        const sameParams =
          !params || method === 'GET'
            ? true
            : JSON.stringify(newParams) === JSON.stringify(x.params);

        return x.src === newSrc && sameParams;
      });

    const sameRequest = prevSameRequest();

    if (sameRequest && !sameRequest.data.closed) {
      return sameRequest.data;
    }

    if (sameRequest) {
      sameRequest.data = new Subject<any>();
    }

    this._requests.push({
      src: newSrc,
      data: new Subject<any>(),
      params: method === 'GET' ? null : newParams,
    });

    const sources = {
      GET: this._http.get(newSrc),
      POST: this._http.post(src, newParams),
    };

    return sources[method].pipe(
      tap((x) => {
        const sameRequest = prevSameRequest();
        !sameRequest?.data.closed && sameRequest?.data.next(x);
      }),
      finalize(() => {
        const sameRequest = prevSameRequest();
        sameRequest?.data.complete();
        sameRequest?.data.unsubscribe();
      })
    );
  }

  private _getMappedSrc(config: OptionSource, controlValue: any): string {
    const { params, src } = config;

    if (!params) {
      return src;
    }

    // url variables (.../:x/:y/:z)
    const urlVariables = src.match(/:([^/:\s]+)/g) || ([] as string[]);
    const _params = this._getDynamicParams(config, controlValue);

    if (!urlVariables.length) {
      return `${src}?${new URLSearchParams(_params).toString()}`;
    }

    return Object.keys(_params).reduce((acc, key) => {
      acc = acc.replace(`:${key}`, `${_params[key]}`);
      return acc;
    }, src);
  }

  /**Get params from the `controlValue` */
  private _getDynamicParams(
    config: OptionSource,
    controlValue: any,
    form?: UntypedFormGroup
  ): any {
    const { params, paramsFromControls } = config;
    if (!params) return {};

    const paramsFromCurrentControl = Object.keys(params).reduce((acc, key) => {
      const valuePath = `${params[key]}`.trim();
      acc[key] = getValueInObject(controlValue, valuePath);
      return acc;
    }, {} as any);

    const paramsFromOtherControls =
      !paramsFromControls || !form
        ? undefined
        : Object.keys(paramsFromControls).reduce((acc, key) => {
            const paths = getControlAndValuePath(key);
            const control = form.get(paths.controlPath);

            if (control && paths.valuePath !== undefined) {
              acc[key] = getValueInObject(control?.value, paths.valuePath);
            }

            return acc;
          }, {} as any);

    return {
      ...paramsFromCurrentControl,
      ...paramsFromOtherControls,
    };
  }
}
