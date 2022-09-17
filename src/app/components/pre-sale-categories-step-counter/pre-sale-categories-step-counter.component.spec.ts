import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCategoriesStepCounterComponent } from './pre-sale-categories-step-counter.component';

describe('PreSaleCategoriesStepCounterComponent', () => {
  let component: PreSaleCategoriesStepCounterComponent;
  let fixture: ComponentFixture<PreSaleCategoriesStepCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCategoriesStepCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleCategoriesStepCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
