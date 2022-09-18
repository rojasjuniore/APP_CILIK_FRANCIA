import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCheckoutOnlyCategoryCardItemComponent } from './pre-sale-checkout-only-category-card-item.component';

describe('PreSaleCheckoutOnlyCategoryCardItemComponent', () => {
  let component: PreSaleCheckoutOnlyCategoryCardItemComponent;
  let fixture: ComponentFixture<PreSaleCheckoutOnlyCategoryCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCheckoutOnlyCategoryCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleCheckoutOnlyCategoryCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
