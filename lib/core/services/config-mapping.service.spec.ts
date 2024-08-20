import { TestBed } from '@angular/core/testing';
import { ConfigMappingService } from './config-mapping.service';

let service: ConfigMappingService;

beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [ConfigMappingService],
  });

  service = TestBed.inject(ConfigMappingService);
});

describe('Set fallback value depends on type', () => {
  it('Checkbox value should becomes false when it is undefined', () => {
    const result = service['_getFallbackValue']({
      formControlName: 'test',
      type: 'checkbox',
    });
    expect(result).toBe(false);
  });

  it('Switch value should becomes false when it is undefined', () => {
    const result = service['_getFallbackValue']({
      formControlName: 'test',
      type: 'switch',
      value: null,
    });
    expect(result).toBe(false);
  });
});

describe('Remove unwanted characters in formControlName', () => {
  it('Should replace all spaces with "_"', () => {
    const result = service['_getFormControlName']('aaa bbb    ccc ');
    expect(result).toBe('aaa_bbb____ccc_');
  });

  it('Should remove all "." and "," characters', () => {
    const result = service['_getFormControlName']('aa,bbb..ccc');
    expect(result).toBe('aabbbccc');
  });
});
