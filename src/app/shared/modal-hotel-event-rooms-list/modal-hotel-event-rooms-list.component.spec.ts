import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHotelEventRoomsListComponent } from './modal-hotel-event-rooms-list.component';

describe('ModalHotelEventRoomsListComponent', () => {
  let component: ModalHotelEventRoomsListComponent;
  let fixture: ComponentFixture<ModalHotelEventRoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHotelEventRoomsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHotelEventRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
