import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hotel-and-event-room-list-item-card',
  templateUrl: './hotel-and-event-room-list-item-card.component.html',
  styleUrls: ['./hotel-and-event-room-list-item-card.component.css']
})
export class HotelAndEventRoomListItemCardComponent implements OnInit, OnChanges {

  @Input() item: any = {}
  @Input() dates: any[] = [];

  @Output() onSelectRoom = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dates } = changes;
    if(dates && dates.currentValue){
      this.dates = dates.currentValue;
      console.log('this.dates', this.dates);
    }
  }

  selectRoom(){
    this.onSelectRoom.next({...this.item, dates: this.dates});
  }

}
