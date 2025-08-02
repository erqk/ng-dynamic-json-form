import { TestBed } from '@angular/core/testing';
import { ConfigMappingService } from './config-mapping.service';

describe('ConfigMappingService', () => {
  let service: ConfigMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigMappingService],
    });

    service = TestBed.inject(ConfigMappingService);
  });

  describe('Set fallback value depends on type', () => {
    it('Checkbox default value should be `false` when binary=true', () => {
      const result = service['getFallbackValue']({
        formControlName: 'test',
        type: 'checkbox',
        options: {
          data: [{ label: 'This is a binary checkbox' }],
        },
      });
      expect(result).toEqual(false);
    });

    it('Checkbox default value should be `[]` when binary=false', () => {
      const result = service['getFallbackValue']({
        formControlName: 'test',
        type: 'checkbox',
      });
      expect(result).toEqual([]);
    });

    it('Switch value should becomes false when it is undefined', () => {
      const result = service['getFallbackValue']({
        formControlName: 'test',
        type: 'switch',
        value: null,
      });
      expect(result).toEqual(false);
    });
  });

  describe('Remove unwanted characters in formControlName', () => {
    it('Should replace all spaces with "_"', () => {
      const result = service['getFormControlName']('aaa bbb    ccc ');
      expect(result).toEqual('aaa_bbb____ccc_');
    });

    it('Should remove all "." and "," characters', () => {
      const result = service['getFormControlName']('aa,bbb..ccc');
      expect(result).toEqual('aabbbccc');
    });
  });
});
