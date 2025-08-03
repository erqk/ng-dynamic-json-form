import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_DYNAMIC_CUSTOM_OBSERVABLE = (translation?: {
  titleColdObservable: string;
  titleHotObservable: string;
}): FormControlConfig[] => [
  {
    label: translation?.titleColdObservable ?? 'Options (COLD Observable)',
    formControlName: 'options-cold-observable',
    description: `
products$ = this.http.get('https://dummyjson.com/products').pipe(
  map((x) => (x as any).products),
  concatAll(),
  map((x: any) => ({ label: x.title, value: x.title })),
  toArray(),
);
    `,
    type: 'checkbox',
    options: {
      src: 'products$',
    },
  },
  {
    label: translation?.titleHotObservable ?? 'Options (HOT Observable)',
    formControlName: 'options-hot-observable',
    description: `
'products-hot-observable$' = new Subject<string>().pipe(
  startWith('https://dummyjson.com/products'),
  switchMap((x) => this.http.get(x)),
  map((x) =>
    (x as any).products.map((item: any) => ({
      label: item.title,
      value: item.title,
    })),
  ),
);
    `,
    type: 'checkbox',
    options: {
      src: 'products-hot-observable$',
    },
  },
];

export const CONFIG_DYNAMIC_CUSTOM_OBSERVABLE_EN =
  CONFIG_DYNAMIC_CUSTOM_OBSERVABLE();
