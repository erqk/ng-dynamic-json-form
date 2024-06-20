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
