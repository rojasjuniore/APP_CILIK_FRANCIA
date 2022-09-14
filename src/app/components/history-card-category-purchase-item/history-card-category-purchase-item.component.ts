import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-card-category-purchase-item',
  templateUrl: './history-card-category-purchase-item.component.html',
  styleUrls: ['./history-card-category-purchase-item.component.css']
})
export class HistoryCardCategoryPurchaseItemComponent implements OnInit {

  @Input() order: any;

  constructor() { }

  ngOnInit(): void {
  }

}
