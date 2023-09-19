import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAndEventRoomListItemCardComponent } from './hotel-and-event-room-list-item-card.component';

describe('HotelAndEventRoomListItemCardComponent', () => {
  let component: HotelAndEventRoomListItemCardComponent;
  let fixture: ComponentFixture<HotelAndEventRoomListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAndEventRoomListItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAndEventRoomListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
