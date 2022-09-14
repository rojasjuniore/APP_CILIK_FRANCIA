import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCheckoutListComponent } from './pre-sale-checkout-list.component';

describe('PreSaleCheckoutListComponent', () => {
  let component: PreSaleCheckoutListComponent;
  let fixture: ComponentFixture<PreSaleCheckoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCheckoutListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCheckoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
