import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  concatAll,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  from,
  map,
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
import { getValueInObject } from '../utilities/get-value-in-object';
import { trimObjectByKeys } from '../utilities/trim-object-by-keys';

@Injectable()
export class OptionsDataService {
  private _http = inject(HttpClient);
  private _requests: { src: string; data: BehaviorSubject<any> }[] = [];
  private _cancelAll$ = new Subject<void>();

  getOptions$(config: FormControlOptions): Observable<OptionItem[]> {
    const { sourceList } = config;
    if (!sourceList?.length) return EMPTY;

    return from(sourceList).pipe(
      concatMap((x) => this._fetchData$(x)),
      toArray(),
      map((x) => x.flat()),
      this._limitDataAmount,
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

          const result = rawData.filter(
            (item) => getValueInObject(item.value, filterMatchPath) === x
          );

          return result;
        })
      );

    // Must includes the key `filterMatchPath` to ensure filter works properly
    if (filterMatchPath) {
      const valueKeys = config.data.valueKeys || [];
      const key = filterMatchPath.split('.').slice(-1)[0] || '';
      valueKeys.push(key);
      config.data.valueKeys = [...new Set(valueKeys)];
    }

    return this._fetchData$(config).pipe(
      switchMap((x) => valueChanges$(x)),
      takeUntil(this._cancelAll$)
    );
  }

  requestOptionsOnTrigger$(
    form: UntypedFormGroup,
    config: OptionTrigger
  ): Observable<OptionItem[]> {
    return this._onTriggerControlChanges$(form, config).pipe(
      switchMap((x) => this._fetchData$(config, x)),
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

  private _fetchData$(
    config: OptionSource,
    controlValue?: any
  ): Observable<OptionItem[]> {
    const {
      data: { path, labelKey, valueKeys = [] },
      slice,
    } = config;

    const sliceData = (
      source: Observable<OptionItem[]>
    ): Observable<OptionItem[]> => {
      return source.pipe(
        map((x) => x.slice(slice?.[0] ?? 0, slice?.[1] ?? x.length))
      );
    };

    const _valueKeys = [...new Set(valueKeys)].filter((x) => x.length > 0);
    const result$ = this._httpRequest$(config, controlValue).pipe(
      onErrorResumeNextWith(),
      concatMap((x: any) => {
        const result = !path ? x : getValueInObject(x, path);
        return !result || !Array.isArray(result) ? [] : result;
      }),
      map((x) => ({
        label: getValueInObject(x, labelKey),
        value: x,
      })),
      toArray(),
      sliceData,
      concatAll(),
      map((x) => ({
        ...x,
        value: !_valueKeys.length
          ? x.value
          : trimObjectByKeys(x.value, _valueKeys),
      })),
      toArray()
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
    if (!triggerValuePath) return EMPTY;

    const triggerPaths = triggerValuePath.split(',');
    if (!triggerPaths.length) return EMPTY;

    const controlPath = triggerPaths[0].trim();
    const controlValuePath = triggerPaths?.[1]?.trim() || '';

    const control = form.get(controlPath);
    if (!control) return EMPTY;

    return control.valueChanges.pipe(
      startWith(control.value),
      debounceTime(_debouceTime),
      distinctUntilChanged(),
      map((x) =>
        !controlValuePath ? x : getValueInObject(x, controlValuePath)
      )
    );
  }

  private _httpRequest$(
    config: OptionSource,
    controlValue?: any
  ): Observable<Object | null> {
    const { method, params, src } = config;
    let request$: Observable<Object> = EMPTY;
    let newSrc = src;

    if (!method) {
      console.warn(`Please specify HTTP method for ${src}`);
    }

    if (method === 'GET') {
      const urlParams = src.match(/:([^/:\s]+)/g) || ([] as string[]);
      const newParams = !params
        ? null
        : Object.keys(params).reduce((acc, key) => {
            const valuePath = `${params[key]}`.trim();
            acc[key] = getValueInObject(controlValue, valuePath);
            return acc;
          }, {} as any);

      const useUrlWithParamsReplaced = newParams && urlParams.length > 0;
      const useQueryString =
        newParams && Object.keys(newParams).length > 0 && !urlParams.length;

      if (useUrlWithParamsReplaced) {
        newSrc = Object.keys(newParams).reduce((acc, key) => {
          acc = acc.replace(`:${key}`, `${newParams[key]}`);
          return acc;
        }, src);
      }

      if (useQueryString) {
        newSrc = `${src}?${new URLSearchParams(newParams).toString()}`;
      }

      request$ = this._http.get(newSrc);
    }

    if (method === 'POST' && params) {
      request$ = this._http.post(newSrc, params);
    }

    return this._requestData$(newSrc, request$);
  }

  // TODO: Rename this function
  // TODO: Check data validity, reset the data if the request is canceled
  // TODO: The triggers not working correctly
  // TODO: Still have to use OptionItem[] ?
  private _requestData$(
    src: string,
    newRequest$: Observable<Object>
  ): Observable<Object | null> {
    const _newRequest$ = newRequest$.pipe(
      tap((x) => {
        const _cache = this._requests.find((x) => x.src === src);
        _cache?.data.next(x);
      }),
      finalize(() => {
        const _cache = this._requests.find((x) => x.src === src);
        _cache?.data.complete();
        _cache?.data.unsubscribe();
      })
    );

    const requested = this._requests.find((x) => x.src === src);

    if (!requested) {
      this._requests.push({
        src,
        data: new BehaviorSubject<any>(null),
      });

      return _newRequest$;
    }

    if (!requested.data.closed) {
      return requested.data;
    }

    requested.data = new BehaviorSubject<any>(null);
    return _newRequest$;
  }

  private _limitDataAmount(source: Observable<any>): Observable<any> {
    return source.pipe(
      map((x) => {
        if (x.length > 500) {
          console.warn(
            'Data amount too big, auto limit to 500 items.\n' +
              'Please consider using typeahead or other implementation to filter the data'
          );
        }

        return x.slice(0, 500);
      })
    );
  }
}
