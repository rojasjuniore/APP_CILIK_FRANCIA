import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesCheckoutListComponent } from './pre-sale-only-categories-checkout-list.component';

describe('PreSaleOnlyCategoriesCheckoutListComponent', () => {
  let component: PreSaleOnlyCategoriesCheckoutListComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesCheckoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesCheckoutListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesCheckoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
