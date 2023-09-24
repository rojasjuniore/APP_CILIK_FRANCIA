import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-fullpass-card-item',
  templateUrl: './purchase-fullpass-card-item.component.html',
  styleUrls: ['./purchase-fullpass-card-item.component.css']
})
export class PurchaseFullpassCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.price) * Number(this.item.quantity);
  }

}
