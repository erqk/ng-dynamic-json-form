export interface OptionItem {
  label: string;
  value?: any;
}

export interface OptionSource {
  src: string;
  method: 'GET' | 'POST';
  data: {
    labelKey: string;
    path?: string;
    valueKeys?: string[];
  };
  params?: { [key: string]: any };
  slice?: [number, number];
}

export interface OptionTrigger extends OptionSource {
  action: 'FILTER' | 'REQUEST';
  triggerValuePath: string;
  filterMatchPath?: string;
  debounceTime?: number;
}

export interface FormControlOptions {
  data?: OptionItem[];
  sourceList?: OptionSource[];
  sourceAppendPosition?: 'after' | 'before';
  trigger?: OptionTrigger;
  layout?: 'row' | 'column';
  labelPosition?: 'before' | 'after';
  containerClass?: string;
  containerStyles?: string;
}
