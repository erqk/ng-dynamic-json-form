export interface OptionItem {
  label: string;
  value?: any;
}

export interface OptionSource {
  src: string;
  method: 'GET' | 'POST';
  
  /**Parameters from the current control's value */
  params?: { [key: string]: any };

  /**Parameters from the other controls' value */
  paramsFromControls?: { [key: string]: any };
  data: {
    labelKey: string;
    path?: string;
    valueKeys?: string[];
  };
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
  autoSelectFirst?: boolean;
  layout?: 'row' | 'column';
  labelPosition?: 'before' | 'after';
  containerClass?: string;
  containerStyles?: string;
}
