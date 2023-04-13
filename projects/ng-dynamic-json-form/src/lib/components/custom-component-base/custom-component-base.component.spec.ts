import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicJsonFormCustomComponent } from './custom-component-base.component';

describe('DynamicComponentBaseComponent', () => {
  let component: NgDynamicJsonFormCustomComponent;
  let fixture: ComponentFixture<NgDynamicJsonFormCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDynamicJsonFormCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDynamicJsonFormCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
