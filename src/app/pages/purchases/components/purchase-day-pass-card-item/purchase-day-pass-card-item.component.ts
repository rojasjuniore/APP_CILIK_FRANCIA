import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-day-pass-card-item',
  templateUrl: './purchase-day-pass-card-item.component.html',
  styleUrls: ['./purchase-day-pass-card-item.component.css']
})
export class PurchaseDayPassCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.totales);
  }

}