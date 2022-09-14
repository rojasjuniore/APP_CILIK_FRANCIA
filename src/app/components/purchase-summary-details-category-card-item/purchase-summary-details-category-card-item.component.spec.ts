import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryDetailsCategoryCardItemComponent } from './purchase-summary-details-category-card-item.component';

describe('PurchaseSummaryDetailsCategoryCardItemComponent', () => {
  let component: PurchaseSummaryDetailsCategoryCardItemComponent;
  let fixture: ComponentFixture<PurchaseSummaryDetailsCategoryCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryDetailsCategoryCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSummaryDetailsCategoryCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
