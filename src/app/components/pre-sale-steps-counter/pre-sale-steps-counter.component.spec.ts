import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleStepsCounterComponent } from './pre-sale-steps-counter.component';

describe('PreSaleStepsCounterComponent', () => {
  let component: PreSaleStepsCounterComponent;
  let fixture: ComponentFixture<PreSaleStepsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleStepsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleStepsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
