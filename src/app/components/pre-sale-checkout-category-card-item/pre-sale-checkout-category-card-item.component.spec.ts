import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCheckoutCategoryCardItemComponent } from './pre-sale-checkout-category-card-item.component';

describe('PreSaleCheckoutCategoryCardItemComponent', () => {
  let component: PreSaleCheckoutCategoryCardItemComponent;
  let fixture: ComponentFixture<PreSaleCheckoutCategoryCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCheckoutCategoryCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCheckoutCategoryCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
