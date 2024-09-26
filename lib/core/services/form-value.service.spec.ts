import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlConfig } from '../models';
import { FormValueService } from './form-value.service';

const formGroup = new FormGroup({
  name: new FormControl(),
  age: new FormControl(),
  checkbox: new FormControl(),
});

let service: FormValueService;
beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [FormValueService],
  });

  service = TestBed.inject(FormValueService);
});

it('Name should be "Andrew"', () => {
  service.patchForm(formGroup, { name: 'Andrew' });
  expect(formGroup.controls.name.value).toBe('Andrew');
});

it('Age should be 20', () => {
  service.patchForm(formGroup, { age: 20 });
  expect(formGroup.controls.age.value).toBe(20);
});

it('Checkbox should be false', () => {
  service.patchForm(formGroup, { checkbox: true });
  expect(formGroup.controls.checkbox.value).toBe(true);
});
