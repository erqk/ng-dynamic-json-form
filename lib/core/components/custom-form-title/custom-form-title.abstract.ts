import { FormLayout } from '../../models/form-layout.interface';

export abstract class CustomFormTitle {
  label?: string;
  layout?: FormLayout;
  toggle?: (_: boolean) => void;
  collapsible = false;
  expand = false;
  props?: any;
}
