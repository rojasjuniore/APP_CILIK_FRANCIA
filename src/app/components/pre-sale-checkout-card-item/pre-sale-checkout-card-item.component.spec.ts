import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCheckoutCardItemComponent } from './pre-sale-checkout-card-item.component';

describe('PreSaleCheckoutCardItemComponent', () => {
  let component: PreSaleCheckoutCardItemComponent;
  let fixture: ComponentFixture<PreSaleCheckoutCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCheckoutCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaleCheckoutCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
