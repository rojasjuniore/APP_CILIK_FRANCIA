import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFullPassPerDayCardItemComponent } from './purchase-full-pass-per-day-card-item.component';

describe('PurchaseFullPassPerDayCardItemComponent', () => {
  let component: PurchaseFullPassPerDayCardItemComponent;
  let fixture: ComponentFixture<PurchaseFullPassPerDayCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFullPassPerDayCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFullPassPerDayCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
