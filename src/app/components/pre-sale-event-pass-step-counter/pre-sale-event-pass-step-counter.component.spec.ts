import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleEventPassStepCounterComponent } from './pre-sale-event-pass-step-counter.component';

describe('PreSaleEventPassStepCounterComponent', () => {
  let component: PreSaleEventPassStepCounterComponent;
  let fixture: ComponentFixture<PreSaleEventPassStepCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleEventPassStepCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleEventPassStepCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
