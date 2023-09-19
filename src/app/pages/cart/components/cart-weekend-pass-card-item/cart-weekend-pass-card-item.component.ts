import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-weekend-pass-card-item',
  templateUrl: './cart-weekend-pass-card-item.component.html',
  styleUrls: ['./cart-weekend-pass-card-item.component.css']
})
export class CartWeekendPassCardItemComponent implements OnInit {

  @Input() item: any;

  @Output() onRemoveItem = new Subject<any>();

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.price) * Number(this.item.quantity);
  }

  remove(): void{ this.onRemoveItem.next(this.item); }

}

