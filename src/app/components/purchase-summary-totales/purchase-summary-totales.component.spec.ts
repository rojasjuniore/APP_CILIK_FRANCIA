import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSummaryTotalesComponent } from './purchase-summary-totales.component';

describe('PurchaseSummaryTotalesComponent', () => {
  let component: PurchaseSummaryTotalesComponent;
  let fixture: ComponentFixture<PurchaseSummaryTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSummaryTotalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSummaryTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
