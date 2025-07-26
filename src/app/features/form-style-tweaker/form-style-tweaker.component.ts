import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { map } from 'rxjs';
import { CONFIG_BASIC_ADDRESS_EN } from 'src/app/example/configs/basic/address/config-basic-address_en';
import { CONFIG_BASIC_ADDRESS_ZHTW } from 'src/app/example/configs/basic/address/config-basic-address_zh-TW';
import { CONFIG_BASIC_AGE_EN } from 'src/app/example/configs/basic/age/config-basic-age_en';
import { CONFIG_BASIC_AGE_ZHTW } from 'src/app/example/configs/basic/age/config-basic-age_zh-TW';
import { CONFIG_BASIC_CARDS_EN } from 'src/app/example/configs/basic/cards/config-basic-cards_en';
import { CONFIG_BASIC_CARDS_ZHTW } from 'src/app/example/configs/basic/cards/config-basic-cards_zh-TW';
import { CONFIG_BASIC_GENDER_EN } from 'src/app/example/configs/basic/gender/config-basic-gender_en';
import { CONFIG_BASIC_GENDER_ZHTW } from 'src/app/example/configs/basic/gender/config-basic-gender_zh-TW';
import { LanguageService } from '../language/language-data.service';

interface StyleOption {
  key: string;
  value: string;
  type: 'color' | 'range';
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
}

@Component({
    selector: 'app-form-style-tweaker',
    imports: [CommonModule, NgDynamicJsonFormComponent],
    templateUrl: './form-style-tweaker.component.html',
    styleUrls: ['./form-style-tweaker.component.scss']
})
export class FormStyleTweakerComponent {
  private langService = inject(LanguageService);
  private configEn = [
    CONFIG_BASIC_AGE_EN,
    CONFIG_BASIC_ADDRESS_EN(),
    CONFIG_BASIC_CARDS_EN,
    CONFIG_BASIC_GENDER_EN,
  ];

  private configZhTW = [
    CONFIG_BASIC_AGE_ZHTW,
    CONFIG_BASIC_ADDRESS_ZHTW,
    CONFIG_BASIC_CARDS_ZHTW,
    CONFIG_BASIC_GENDER_ZHTW,
  ];

  configs$ = this.langService.language$.pipe(
    map((x) => (x === 'en' ? this.configEn : this.configZhTW))
  );

  styleOptions: StyleOption[] = [
    {
      key: '--color-primary',
      type: 'color',
      value: '#3b82f6',
    },
    {
      key: '--color-primary-lighter',
      type: 'color',
      value: '#8BADE4',
    },
    {
      key: '--color-description',
      type: 'color',
      value: '#808080',
    },
    {
      key: '--color-error',
      type: 'color',
      value: '#ff4747',
    },
    {
      key: '--color-border',
      type: 'color',
      value: '#808080',
    },
    {
      key: '--font-size-title',
      type: 'range',
      value: '1.2',
      unit: 'em',
      min: 0.4,
      max: 4,
      step: 0.01,
    },
    {
      key: '--font-size-label',
      type: 'range',
      value: '1',
      unit: 'em',
      min: 0.4,
      max: 3,
      step: 0.01,
    },
    {
      key: '--font-size-description',
      type: 'range',
      value: '0.925',
      unit: 'em',
      min: 0.4,
      max: 2.4,
      step: 0.01,
    },
    {
      key: '--font-size-error',
      type: 'range',
      value: '0.925',
      unit: 'em',
      min: 0.4,
      max: 2.4,
      step: 0.01,
    },
    {
      key: '--font-weight-title',
      type: 'range',
      value: '70',
      min: 10,
      max: 90,
      step: 10,
    },
    {
      key: '--font-weight-label',
      type: 'range',
      value: '50',
      min: 10,
      max: 90,
      step: 10,
    },
    {
      key: '--input-border-width',
      type: 'range',
      value: '1',
      unit: 'px',
      min: 1,
      max: 5,
      step: 1,
    },
    {
      key: '--row-gap',
      type: 'range',
      value: '1.5',
      unit: 'em',
      min: 0,
      max: 5,
      step: 0.1,
    },
    {
      key: '--column-gap',
      type: 'range',
      value: '1',
      unit: 'em',
      min: 0,
      max: 5,
      step: 0.1,
    },
    {
      key: '--options-column-gap',
      type: 'range',
      value: '1.85',
      unit: 'em',
      min: 0,
      max: 5,
      step: 0.01
    },
    {
      key: '--options-row-gap',
      type: 'range',
      value: '0.25',
      unit: 'em',
      min: 0,
      max: 5,
      step: 0.01
    },
  ];

  styles: any = {};
  reseting = false;

  ngOnInit(): void {
    this.resetStyles();
  }

  updateStyle(item: StyleOption, e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.styles[item.key] = this.getStyleValue(item, value);
  }

  resetStyles(): void {
    this.reseting = true;
    this.styles = [...this.styleOptions].reduce((acc, curr) => {
      acc[curr.key] = this.getStyleValue(curr);
      return acc;
    }, {} as any);

    window.setTimeout(() => {
      this.reseting = false;
    });
  }

  private getStyleValue(item: StyleOption, value?: string): string {
    const multiplier = (item.step ?? 1) >= 1 ? item.step : 1;
    const _value = value ?? `${item.value}`;

    return item.type === 'range'
      ? `${parseFloat(_value) * (multiplier ?? 1)}${item.unit ?? ''}`
      : _value;
  }
}
