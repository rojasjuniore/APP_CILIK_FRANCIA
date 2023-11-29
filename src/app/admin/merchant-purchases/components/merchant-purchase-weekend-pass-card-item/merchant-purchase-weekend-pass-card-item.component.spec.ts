import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseWeekendPassCardItemComponent } from './merchant-purchase-weekend-pass-card-item.component';

describe('MerchantPurchaseWeekendPassCardItemComponent', () => {
  let component: MerchantPurchaseWeekendPassCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseWeekendPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseWeekendPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseWeekendPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
