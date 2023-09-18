import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-category-pass-card-item',
  templateUrl: './cart-category-pass-card-item.component.html',
  styleUrls: ['./cart-category-pass-card-item.component.css']
})
export class CartCategoryPassCardItemComponent implements OnInit {

  @Input() item: any;

  @Output() onRemoveItem = new Subject<any>();

  constructor() { }

  ngOnInit(): void { }

  remove(): void{ this.onRemoveItem.next(this.item); }

}
