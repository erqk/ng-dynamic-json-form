import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicJsonFormComponent } from './ng-dynamic-json-form.component';

describe('NgDynamicJsonFormComponent', () => {
  let component: NgDynamicJsonFormComponent;
  let fixture: ComponentFixture<NgDynamicJsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDynamicJsonFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDynamicJsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
