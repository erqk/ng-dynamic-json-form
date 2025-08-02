import { signal } from '@angular/core';
import { FormLayout } from '../../models/form-layout.interface';

export abstract class CustomFormLabel {
  collapsible = signal<boolean>(false);
  expand = signal<boolean>(false);
  label = signal<string | undefined>(undefined);
  layout = signal<FormLayout | undefined>(undefined);
  props = signal<any | undefined>(undefined);
}
