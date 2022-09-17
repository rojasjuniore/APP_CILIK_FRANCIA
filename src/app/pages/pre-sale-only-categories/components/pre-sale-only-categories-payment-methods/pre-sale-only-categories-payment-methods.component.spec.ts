import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesPaymentMethodsComponent } from './pre-sale-only-categories-payment-methods.component';

describe('PreSaleOnlyCategoriesPaymentMethodsComponent', () => {
  let component: PreSaleOnlyCategoriesPaymentMethodsComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesPaymentMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
