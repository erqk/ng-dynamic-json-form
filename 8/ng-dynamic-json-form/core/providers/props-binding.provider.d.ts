import { InjectionToken, Provider, ProviderToken } from '@angular/core';
interface PropsBindingItem {
    key: string;
    token: ProviderToken<any>;
}
export declare const PROPS_BINDING_INJECTORS: InjectionToken<PropsBindingItem[]>;
export declare function providePropsBinding(value: PropsBindingItem[]): Provider;
export {};
