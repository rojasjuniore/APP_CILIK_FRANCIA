import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCheckoutOnlyEventPassCardItemComponent } from './pre-sale-checkout-only-event-pass-card-item.component';

describe('PreSaleCheckoutOnlyEventPassCardItemComponent', () => {
  let component: PreSaleCheckoutOnlyEventPassCardItemComponent;
  let fixture: ComponentFixture<PreSaleCheckoutOnlyEventPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCheckoutOnlyEventPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleCheckoutOnlyEventPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
