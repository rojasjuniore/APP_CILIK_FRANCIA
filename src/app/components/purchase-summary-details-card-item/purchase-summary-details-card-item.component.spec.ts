import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryDetailsCardItemComponent } from './purchase-summary-details-card-item.component';

describe('PurchaseSummaryDetailsCardItemComponent', () => {
  let component: PurchaseSummaryDetailsCardItemComponent;
  let fixture: ComponentFixture<PurchaseSummaryDetailsCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryDetailsCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSummaryDetailsCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
