import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHotelEventCardItemComponent } from './purchase-hotel-event-card-item.component';

describe('PurchaseHotelEventCardItemComponent', () => {
  let component: PurchaseHotelEventCardItemComponent;
  let fixture: ComponentFixture<PurchaseHotelEventCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHotelEventCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseHotelEventCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
