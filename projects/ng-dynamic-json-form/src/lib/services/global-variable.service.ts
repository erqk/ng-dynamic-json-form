import { Injectable, TemplateRef, Type } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormTitleComponent } from '../../public-api';
import { CustomComponents, UiComponents } from '../models';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../ng-dynamic-json-form.config';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableService {
  hideErrorMessage$ = new BehaviorSubject<boolean | undefined>(undefined);

  customValidators?: { [key: string]: ValidatorFn };

  uiComponents?: UiComponents;
  customComponents?: CustomComponents;
  labelComponents?: { [key: string]: Type<FormTitleComponent> };
  layoutComponents?: LayoutComponents;

  inputTemplates?: { [key: string]: TemplateRef<any> };
  labelTemplates?: { [key: string]: TemplateRef<any> };
  layoutTemplates?: LayoutTemplates;

  setup({
    customComponents,
    customValidators,
    labelComponents,
    layoutComponents,
    inputTemplates,
    labelTemplates,
    layoutTemplates,
  }: {
    customComponents: CustomComponents | undefined;
    customValidators: { [key: string]: ValidatorFn } | undefined;
    labelComponents: { [key: string]: Type<FormTitleComponent> } | undefined;
    layoutComponents: LayoutComponents | undefined;
    inputTemplates: { [key: string]: TemplateRef<any> } | undefined;
    labelTemplates: { [key: string]: TemplateRef<any> } | undefined;
    layoutTemplates: LayoutTemplates | undefined;
  }): void {
    this.customComponents = customComponents;
    this.customValidators = customValidators;
    this.labelComponents = labelComponents;
    this.layoutComponents = layoutComponents;
    this.inputTemplates = inputTemplates;
    this.labelTemplates = labelTemplates;
    this.layoutTemplates = layoutTemplates;
  }
}
