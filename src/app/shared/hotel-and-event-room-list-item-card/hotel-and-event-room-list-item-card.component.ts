import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hotel-and-event-room-list-item-card',
  templateUrl: './hotel-and-event-room-list-item-card.component.html',
  styleUrls: ['./hotel-and-event-room-list-item-card.component.css']
})
export class HotelAndEventRoomListItemCardComponent implements OnInit, OnChanges {

  @Input() item: any = {}
  @Input() dates: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dates } = changes;
    if(dates && dates.currentValue){ this.dates = dates.currentValue; }
  }

}
