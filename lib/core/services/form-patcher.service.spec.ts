import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FormPatcherService } from './form-patcher.service';

const formGroup = new FormGroup({
  name: new FormControl(),
  age: new FormControl(),
  checkbox: new FormControl(),
});

let formPatcherService: FormPatcherService;
beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [FormPatcherService],
  });

  formPatcherService = TestBed.inject(FormPatcherService);
});

it('Name should be "Andrew"', () => {
  formPatcherService.patchForm(formGroup, { name: 'Andrew' });
  expect(formGroup.controls.name.value).toBe('Andrew');
});

it('Age should be 20', () => {
  formPatcherService.patchForm(formGroup, { age: 20 });
  expect(formGroup.controls.age.value).toBe(20);
});

it('Checkbox should be false', () => {
  formPatcherService.patchForm(formGroup, { checkbox: true });
  expect(formGroup.controls.checkbox.value).toBe(true);
});
