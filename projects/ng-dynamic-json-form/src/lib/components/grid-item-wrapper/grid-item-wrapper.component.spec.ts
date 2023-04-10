import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemWrapperComponent } from './grid-item-wrapper.component';

describe('GridItemWrapperComponent', () => {
  let component: GridItemWrapperComponent;
  let fixture: ComponentFixture<GridItemWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridItemWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
