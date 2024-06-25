import { InjectionToken, Provider, ProviderToken } from '@angular/core';

interface PropsBindingItem {
  key: string;
  token: ProviderToken<any>;
}

export const PROPS_BINDING_INJECTORS = new InjectionToken<PropsBindingItem[]>(
  'property-binding-injector'
);

export function providePropsBinding(value: PropsBindingItem[]): Provider {
  return {
    provide: PROPS_BINDING_INJECTORS,
    useValue: value,
  };
}
