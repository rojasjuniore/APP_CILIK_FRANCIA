import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryModalDetailsComponent } from './purchase-summary-modal-details.component';

describe('PurchaseSummaryModalDetailsComponent', () => {
  let component: PurchaseSummaryModalDetailsComponent;
  let fixture: ComponentFixture<PurchaseSummaryModalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryModalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSummaryModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
