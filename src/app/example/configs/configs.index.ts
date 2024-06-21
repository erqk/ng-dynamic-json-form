import { CONFIG_CHECKBOX } from './checkbox';
import { CONFIG_CONDITIONS } from './conditions';
import { CONFIG_DATE } from './date';
import { CONFIG_NUMBER } from './number';
import { CONFIG_PASSWORD } from './password';
import { CONFIG_RADIO } from './radio';
import { CONFIG_RANGE } from './range';
import { CONFIG_SELECT } from './select';
import { CONFIG_SWITCH } from './switch';
import { CONFIG_TEXT } from './text';
import { CONFIG_TEXTAREA } from './textarea';

export const CONFIGS_INDEX = {
  ...CONFIG_CHECKBOX,
  ...CONFIG_CONDITIONS,
  ...CONFIG_DATE,
  ...CONFIG_PASSWORD,
  ...CONFIG_NUMBER,
  ...CONFIG_RADIO,
  ...CONFIG_RANGE,
  ...CONFIG_SELECT,
  ...CONFIG_SWITCH,
  ...CONFIG_TEXT,
  ...CONFIG_TEXTAREA,
} as const;
