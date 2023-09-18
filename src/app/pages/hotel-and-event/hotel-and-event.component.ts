import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-and-event',
  templateUrl: './hotel-and-event.component.html',
  styleUrls: ['./hotel-and-event.component.css']
})
export class HotelAndEventComponent implements OnInit {

  public rooms: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
