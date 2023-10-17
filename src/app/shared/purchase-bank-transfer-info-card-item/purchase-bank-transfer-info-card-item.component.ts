import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-bank-transfer-info-card-item',
  templateUrl: './purchase-bank-transfer-info-card-item.component.html',
  styleUrls: ['./purchase-bank-transfer-info-card-item.component.css']
})
export class PurchaseBankTransferInfoCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
    // console.log('item', this.item);
  }

}
