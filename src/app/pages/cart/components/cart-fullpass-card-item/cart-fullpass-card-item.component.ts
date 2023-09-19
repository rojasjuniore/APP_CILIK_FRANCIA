import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-fullpass-card-item',
  templateUrl: './cart-fullpass-card-item.component.html',
  styleUrls: ['./cart-fullpass-card-item.component.css']
})
export class CartFullpassCardItemComponent implements OnInit {

  @Input() item: any;

  @Output() onRemoveItem = new Subject<any>();

  public loader = false;

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.price) * Number(this.item.quantity);
  }

  remove(): void{ 
    this.loader = true;
    this.onRemoveItem.next(this.item); 
  }

}
