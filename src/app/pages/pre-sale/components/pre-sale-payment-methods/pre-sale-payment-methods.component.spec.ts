import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSalePaymentMethodsComponent } from './pre-sale-payment-methods.component';

describe('PreSalePaymentMethodsComponent', () => {
  let component: PreSalePaymentMethodsComponent;
  let fixture: ComponentFixture<PreSalePaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSalePaymentMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSalePaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
