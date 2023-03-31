import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';

describe('FormWrapperComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
