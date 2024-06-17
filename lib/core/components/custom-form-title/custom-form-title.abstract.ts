import { FormLayout } from '../../models/form-layout.interface';

export abstract class CustomFormTitle {
  collapsible = false;
  expand = false;
  label?: string;
  layout?: FormLayout;
  props?: any;
}
