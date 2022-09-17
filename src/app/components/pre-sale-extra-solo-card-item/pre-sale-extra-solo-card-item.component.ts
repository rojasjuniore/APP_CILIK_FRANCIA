import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pre-sale-extra-solo-card-item',
  templateUrl: './pre-sale-extra-solo-card-item.component.html',
  styleUrls: ['./pre-sale-extra-solo-card-item.component.css']
})
export class PreSaleExtraSoloCardItemComponent implements OnInit {

  @Input() price = 55;
  @Input() min = 0;
  @Input() max = 99;
  @Input() quantity = 0;

  @Output() onUpdateQuantity = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  updateQuantity(quantity: any) {
    this.quantity = quantity;
    this.onUpdateQuantity.next({type: 'solo', quantity});
  }

}
