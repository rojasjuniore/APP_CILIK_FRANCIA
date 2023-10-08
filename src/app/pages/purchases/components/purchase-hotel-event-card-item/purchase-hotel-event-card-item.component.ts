import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-hotel-event-card-item',
  templateUrl: './purchase-hotel-event-card-item.component.html',
  styleUrls: ['./purchase-hotel-event-card-item.component.css']
})
export class PurchaseHotelEventCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  get totales(){
    if(!this.item) { return 0;}
    return this.item.totales;
  }

  /**
   * Fecha de ingreso
   */
  get checkIn(){
    if(!this.item) { return null; }
    return this.item.room.dates[0].date;
  }

  /**
   * Fecha de salida
   */
  get checkOut(){
    if(!this.item) { return null; }
    return this.item.room.dates[this.item.room.dates.length - 1].date;
  }

  get nroNights() {
    if(!this.item) { return 0; }
    return this.item.room.dates.length;
  }

}
