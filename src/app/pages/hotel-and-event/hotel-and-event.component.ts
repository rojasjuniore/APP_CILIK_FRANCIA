import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHotelEventRoomsListComponent } from 'src/app/shared/modal-hotel-event-rooms-list/modal-hotel-event-rooms-list.component';

@Component({
  selector: 'app-hotel-and-event',
  templateUrl: './hotel-and-event.component.html',
  styleUrls: ['./hotel-and-event.component.css']
})
export class HotelAndEventComponent implements OnInit {

  @ViewChild('modalRoomsList') modalRoomsList!: ModalHotelEventRoomsListComponent;

  public rooms: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  openModalRoomsList(){
    this.modalRoomsList.showModal({});
  }

  resetRooms(){
    this.rooms = [];
  }

}
