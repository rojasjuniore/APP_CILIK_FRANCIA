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

  ngOnInit(): void {
  }

  remove(): void{ this.onRemoveItem.next(this.item); }

}

