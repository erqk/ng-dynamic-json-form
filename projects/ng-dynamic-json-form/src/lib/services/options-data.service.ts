import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  concatAll,
  concatMap,
  from,
  map,
  tap,
  toArray,
} from 'rxjs';
import {
  FormControlOptions,
  OptionItem,
  OptionSourceConfig,
} from '../models/form-control-options.interface';

@Injectable()
export class OptionsDataService {
  private _http = inject(HttpClient);
  private _requests: { src: string; data: BehaviorSubject<OptionItem[]> }[] =
    [];

  getOptions$(config: FormControlOptions): Observable<OptionItem[]> {
    const { sourceList } = config;
    if (!sourceList?.length) return EMPTY;

    return from(sourceList).pipe(
      concatMap((x) => this._fetchData$(x)),
      toArray(),
      concatAll()
    );
  }

  private _fetchData$(item: OptionSourceConfig): Observable<OptionItem[]> {
    const {
      data: { path, labelKey, valueKeys },
      postParams,
      src,
      slice,
    } = item;

    const request$ = !postParams
      ? this._http.get(src)
      : this._http.post(src, postParams);

    const sliceData = (
      source: Observable<OptionItem[]>
    ): Observable<OptionItem[]> => {
      return source.pipe(
        map((x) => x.slice(slice?.[0] ?? 0, slice?.[1] ?? x.length))
      );
    };

    const newData$ = request$.pipe(
      concatMap((x: any) => {
        const result = this._getValueFromPath(x, path);
        return !result || !Array.isArray(result) ? [] : result;
      }),
      map((x) => ({
        label: this._getValueFromPath(x, labelKey),
        value: valueKeys === 'ALL' ? x : this._getObjectFromKeys(x, valueKeys),
      })),
      toArray(),
      sliceData,
      tap((x: OptionItem[]) => {
        const _cache = this._requests.find((x) => x.src === src);
        _cache?.data.next(x);
        _cache?.data.complete();
        _cache?.data.unsubscribe();
      })
    );

    const requested = this._requests.find((x) => x.src === src);

    if (requested) {
      if (!requested.data.closed) {
        return requested.data.pipe(sliceData);
      }

      requested.data = new BehaviorSubject<OptionItem[]>([]);
      return newData$;
    }

    this._requests.push({
      src,
      data: new BehaviorSubject<OptionItem[]>([]),
    });

    return newData$;
  }

  private _getValueFromPath(obj: any, path: string): any {
    if (path === undefined) {
      throw `Path for the options data not found, please check!`;
    }

    try {
      return path.split('.').reduce((acc, key) => acc[key], obj);
    } catch (error) {
      throw error;
    }
  }

  private _getObjectFromKeys(obj: any, keys: string[]): void {
    return keys.reduce((acc, key) => {
      acc[key] = this._getValueFromPath(obj, key);
      return acc;
    }, {} as any);
  }
}
