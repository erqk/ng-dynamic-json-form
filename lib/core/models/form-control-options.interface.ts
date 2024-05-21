import { OptionItem } from './option-item.interface';
import { OptionSourceConfig } from './option-source-config.interface';

export interface FormControlOptions {
  data?: OptionItem[];
  src?: OptionSourceConfig;
  srcAppendPosition?: 'after' | 'before';
  autoSelectFirst?: boolean;
  layout?: 'row' | 'column';
  labelPosition?: 'before' | 'after';
  containerClass?: string;
  containerStyles?: string;
}
