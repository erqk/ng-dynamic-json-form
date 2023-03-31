import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormGeneratorComponent } from './dynamic-form-generator.component';

describe('DynamicFormGeneratorComponent', () => {
  let component: DynamicFormGeneratorComponent;
  let fixture: ComponentFixture<DynamicFormGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
