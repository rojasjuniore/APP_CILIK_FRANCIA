import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-hotel-event-card-item',
  templateUrl: './cart-hotel-event-card-item.component.html',
  styleUrls: ['./cart-hotel-event-card-item.component.css']
})
export class CartHotelEventCardItemComponent implements OnInit {

  @Input() item: any;

  @Output() onRemoveItem = new Subject<any>();

  public loader = false;

  constructor() { }

  ngOnInit(): void { }

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
    return this.item.room.dates.length - 1;
  }

  remove(){ 
    this.loader = true;
    this.onRemoveItem.next(this.item);
  }

}
