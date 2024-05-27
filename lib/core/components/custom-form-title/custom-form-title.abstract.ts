import { FormLayout } from 'lib/public-api';

export abstract class CustomFormTitle {
  label?: string;
  layout?: FormLayout;
  toggle?: (_: boolean) => void;
  collapsible = false;
  expand = false;
  props?: any;
}
