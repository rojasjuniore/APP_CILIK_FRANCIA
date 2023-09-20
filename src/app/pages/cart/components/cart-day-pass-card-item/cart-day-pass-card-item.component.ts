import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-day-pass-card-item',
  templateUrl: './cart-day-pass-card-item.component.html',
  styleUrls: ['./cart-day-pass-card-item.component.css']
})
export class CartDayPassCardItemComponent implements OnInit {

  @Input() item: any;

  @Output() onRemoveItem = new Subject<any>();

  public loader = false;

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.totales);
  }

  remove(): void{ 
    this.loader = true;
    this.onRemoveItem.next(this.item); 
  }

}