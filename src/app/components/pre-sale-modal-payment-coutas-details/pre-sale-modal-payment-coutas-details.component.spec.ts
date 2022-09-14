import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleModalPaymentCoutasDetailsComponent } from './pre-sale-modal-payment-coutas-details.component';

describe('PreSaleModalPaymentCoutasDetailsComponent', () => {
  let component: PreSaleModalPaymentCoutasDetailsComponent;
  let fixture: ComponentFixture<PreSaleModalPaymentCoutasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleModalPaymentCoutasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleModalPaymentCoutasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
