import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  of,
  onErrorResumeNextWith,
  startWith,
  switchMap,
  takeUntil,
  tap,
  toArray
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
  private readonly _http = inject(HttpClient);
  private readonly _cancelAll$ = new Subject<void>();
  private _requests: { src: string; data: Subject<any> }[] = [];

  getOptions$(config: FormControlOptions): Observable<OptionItem[]> {
    const { sourceList } = config;
    if (!sourceList?.length) return EMPTY;

    return from(sourceList).pipe(
      concatMap((x) => this._fetchData$(x)),
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

  onDestroy(): void {
    this.cancelAllRequest();
    this._cancelAll$.complete();
  }

  private _fetchData$(
    config: OptionSource,
    controlValue?: any
  ): Observable<OptionItem[]> {
    const {
      data: { path, labelKey, valueKeys = [] },
      slice,
    } = config;

    const _valueKeys = [...new Set(valueKeys)].filter((x) => x.length > 0);
    const result$ = this._httpRequest$(config, controlValue).pipe(
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

    if (method === 'POST') {
      request$ = this._http.post(newSrc, params ?? {});
    }

    return this._newRequest$(newSrc, request$);
  }

  // TODO: Check data validity, reset the data if the request is canceled
  private _newRequest$(
    src: string,
    req$: Observable<Object>
  ): Observable<Object | null> {
    // This cannot be a constant because the cache is available once the first request is made.
    // Then, we update the cache after the response is get.
    const getCache = () => this._requests.find((x) => x.src === src);

    const onComplete = (obj?: Object) => {
      const cache = getCache();
      if (!cache) return;

      cache.data.next(obj ?? null);
      cache.data.complete();
      cache.data.unsubscribe();
      _req$.next(obj ?? null);
      _req$.complete();
      _req$.unsubscribe();
    };

    const _req$ = new Subject<Object | null>();
    const cache = getCache();

    if (cache && !cache.data.closed) {
      return cache.data;
    }

    if (cache && cache.data.closed) {
      cache.data = new Subject<any>();
    }

    this._requests.push({
      src,
      data: new Subject<any>(),
    });

    req$
      .pipe(
        tap((x) => onComplete(x)),
        catchError(() => {
          onComplete();
          return of(null);
        })
      )
      .subscribe();

    // We don't return the http request directly, instead return a Subject. This is because
    // if we're using Angular proxy.conf.json, there will be "Connection: keep-alive" in the
    // request headers, and "Connection: close" in the response headers.
    // That will prevent all the complete events in rxjs operator to work. (Ex: finalize(), toArray(), ...)
    return _req$;
  }
}
