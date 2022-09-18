import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleOnlyCategoriesPaypalComponent } from './pre-sale-only-categories-paypal.component';

describe('PreSaleOnlyCategoriesPaypalComponent', () => {
  let component: PreSaleOnlyCategoriesPaypalComponent;
  let fixture: ComponentFixture<PreSaleOnlyCategoriesPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleOnlyCategoriesPaypalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleOnlyCategoriesPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
