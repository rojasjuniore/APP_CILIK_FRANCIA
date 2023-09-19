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

  ngOnInit(): void {
  }

  get totales(){
    if(this.item.room.dates.length == 0) { return 0;}
    return this.item.room.dates.map((date: any) => date.price).reduce((a: any, b: any) => a + b);
  }

  remove(){ 
    this.loader = true;
    this.onRemoveItem.next(this.item);
  }

}
