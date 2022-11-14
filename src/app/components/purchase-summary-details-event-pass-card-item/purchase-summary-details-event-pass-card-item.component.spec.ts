import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryDetailsEventPassCardItemComponent } from './purchase-summary-details-event-pass-card-item.component';

describe('PurchaseSummaryDetailsEventPassCardItemComponent', () => {
  let component: PurchaseSummaryDetailsEventPassCardItemComponent;
  let fixture: ComponentFixture<PurchaseSummaryDetailsEventPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryDetailsEventPassCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSummaryDetailsEventPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
