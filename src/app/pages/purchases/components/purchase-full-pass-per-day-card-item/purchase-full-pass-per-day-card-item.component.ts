import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-full-pass-per-day-card-item',
  templateUrl: './purchase-full-pass-per-day-card-item.component.html',
  styleUrls: ['./purchase-full-pass-per-day-card-item.component.css']
})
export class PurchaseFullPassPerDayCardItemComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales(){
    if(!this.item) return 0;
    return Number(this.item.totales);
  }

}
