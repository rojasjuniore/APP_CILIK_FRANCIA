import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseCategoryPassCardItemComponent } from './merchant-purchase-category-pass-card-item.component';

describe('MerchantPurchaseCategoryPassCardItemComponent', () => {
  let component: MerchantPurchaseCategoryPassCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseCategoryPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseCategoryPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseCategoryPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
