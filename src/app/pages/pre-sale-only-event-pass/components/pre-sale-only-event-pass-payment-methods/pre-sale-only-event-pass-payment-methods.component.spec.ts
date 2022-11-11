import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyEventPassPaymentMethodsComponent } from './pre-sale-only-event-pass-payment-methods.component';

describe('PreSaleOnlyEventPassPaymentMethodsComponent', () => {
  let component: PreSaleOnlyEventPassPaymentMethodsComponent;
  let fixture: ComponentFixture<PreSaleOnlyEventPassPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyEventPassPaymentMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyEventPassPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
