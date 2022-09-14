import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryDetailsComponent } from './purchase-summary-details.component';

describe('PurchaseSummaryDetailsComponent', () => {
  let component: PurchaseSummaryDetailsComponent;
  let fixture: ComponentFixture<PurchaseSummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
