import { TestBed } from '@angular/core/testing';
import { FormGeneratorService } from './form-generator.service';
import { FormValidationService } from './form-validation.service';

let service: FormGeneratorService;
beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [FormGeneratorService, FormValidationService],
  });

  service = TestBed.inject(FormGeneratorService);
});

describe('Set fallback value depends on type', () => {
  it('Should get false value if checkbox value is undefined', () => {
    const result = service['_fallbackValue']({
      formControlName: 'checkbox',
      type: 'checkbox',
    });

    expect(result).toBe(false);
  });

  it('Should get false value if switch value is undefined', () => {
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
