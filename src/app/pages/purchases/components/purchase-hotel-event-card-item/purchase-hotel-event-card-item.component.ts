import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-hotel-event-card-item',
  templateUrl: './purchase-hotel-event-card-item.component.html',
  styleUrls: ['./purchase-hotel-event-card-item.component.css']
})
export class PurchaseHotelEventCardItemComponent implements OnInit {

  @Input() item: any;

  public loader = false;

  constructor() { }

  ngOnInit(): void {
  }

  get totales(){
    if(this.item.room.dates.length == 0) { return 0;}
    return this.item.room.dates.map((date: any) => date.price).reduce((a: any, b: any) => a + b);
  }

}
