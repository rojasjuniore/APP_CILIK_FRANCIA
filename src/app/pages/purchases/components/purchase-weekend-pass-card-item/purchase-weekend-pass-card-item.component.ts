import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-weekend-pass-card-item',
  templateUrl: './purchase-weekend-pass-card-item.component.html',
  styleUrls: ['./purchase-weekend-pass-card-item.component.css']
})
export class PurchaseWeekendPassCardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales() {
    if(!this.item) return 0;
    return Number(this.item.price) * Number(this.item.quantity);
  }

  get checkIn() {
    if(!this.item) return '';
    return this.item.dates[0].date;
  }

  get checkOut() {
    if(!this.item) return '';
    return this.item.dates[this.item.dates.length - 1].date;
  }

}