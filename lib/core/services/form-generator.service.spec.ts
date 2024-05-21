import { TestBed } from '@angular/core/testing';
import { FormGeneratorService } from './form-generator.service';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';

let service: FormGeneratorService;
beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [
      FormGeneratorService,
      FormValidationService,
      GlobalVariableService,
    ],
  });

  service = TestBed.inject(FormGeneratorService);
});

describe('Set fallback value depends on type', () => {
  it('Checkbox value should becomes false when it is undefined', () => {
    const result = service['_fallbackValue']({
      formControlName: 'checkbox',
      type: 'checkbox',
    });

    expect(result).toBe(false);
  });

  it('Switch value should becomes false when it is undefined', () => {
    const result = service['_fallbackValue']({
      formControlName: 'switch',
      type: 'switch',
    });

    expect(result).toBe(false);
  });
});

describe('Remove unwanted characters in formControlName', () => {
  it('Should replace all spaces with "_"', () => {
    const result = service['_formControlName']({
      formControlName: 'aaa bbb    ccc ',
    });

    expect(result).toBe('aaa_bbb____ccc_');
  });

  it('Should remove all "." and "," characters', () => {
    const result = service['_formControlName']({
      formControlName: 'aa,bbb..ccc',
    });

    expect(result).toBe('aabbbccc');
  });
});