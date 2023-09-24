import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-category-pass-card-item',
  templateUrl: './purchase-category-pass-card-item.component.html',
  styleUrls: ['./purchase-category-pass-card-item.component.css']
})
export class PurchaseCategoryPassCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales(){
    if(!this.item) return 0;
    return Number(this.item.totales);
  }
}
