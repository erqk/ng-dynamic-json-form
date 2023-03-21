import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonInputComponent } from './json-input.component';

describe('JsonInputComponent', () => {
  let component: JsonInputComponent;
  let fixture: ComponentFixture<JsonInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
