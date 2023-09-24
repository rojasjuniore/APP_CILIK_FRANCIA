import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDayPassCardItemComponent } from './purchase-day-pass-card-item.component';

describe('PurchaseDayPassCardItemComponent', () => {
  let component: PurchaseDayPassCardItemComponent;
  let fixture: ComponentFixture<PurchaseDayPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDayPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDayPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
