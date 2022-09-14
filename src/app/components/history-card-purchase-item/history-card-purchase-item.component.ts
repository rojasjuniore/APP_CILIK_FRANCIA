import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-card-purchase-item',
  templateUrl: './history-card-purchase-item.component.html',
  styleUrls: ['./history-card-purchase-item.component.css']
})
export class HistoryCardPurchaseItemComponent implements OnInit {

  @Input() order: any;

  constructor() { }

  ngOnInit(): void {
  }

}
