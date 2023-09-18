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

  constructor() { }

  ngOnInit(): void {
  }

  remove(): void{
    this.onRemoveItem.next(this.item);
  }

}
