import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHotelEventCardItemComponent } from './cart-hotel-event-card-item.component';

describe('CartHotelEventCardItemComponent', () => {
  let component: CartHotelEventCardItemComponent;
  let fixture: ComponentFixture<CartHotelEventCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartHotelEventCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHotelEventCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
