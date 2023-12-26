export interface OptionItem {
  label: string;
  value?: any;
}

export interface OptionSourceConfig {
  src: string;
  data: {
    path: string;
    labelKey: string;
    valueKeys: 'ALL' | string[];
  };
  postParams?: any;
  slice?: [number, number];
}

export interface FormControlOptions {
  data?: OptionItem[];
  sourceList?: OptionSourceConfig[];
  sourceAppendPosition?: 'after' | 'before';
  layout?: 'row' | 'column';
  labelPosition?: 'before' | 'after';
}
