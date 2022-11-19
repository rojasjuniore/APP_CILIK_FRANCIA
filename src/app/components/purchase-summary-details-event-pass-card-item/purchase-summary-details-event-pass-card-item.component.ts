import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary-details-event-pass-card-item',
  templateUrl: './purchase-summary-details-event-pass-card-item.component.html',
  styleUrls: ['./purchase-summary-details-event-pass-card-item.component.css']
})
export class PurchaseSummaryDetailsEventPassCardItemComponent implements OnInit {

  @Input() order: any;

  constructor() { }

  ngOnInit(): void {
    // console.log('order', this.order);
  }

  get nroEventPasses(){
    if(!this.order) { return 0; }

    const { eventPasses } = this.order;
    const row = eventPasses[0];
    return row?.quantity || 0;
  }

  get eventPassAmountFullPrice(){
    if(!this.order) { return 0; }
    const { eventPasses } = this.order;
    const row = eventPasses[0];
    const fullPrice = row?.fullPrice || 0;

    return this.nroEventPasses * fullPrice;
  }

  get eventPassAmount(){
    if(!this.order) { return 0; }
    const { eventPasses } = this.order;
    const row = eventPasses[0];
    const price = row?.price || 0;

    return this.nroEventPasses * price;
  }

  get discount(){
    return this.eventPassAmountFullPrice - this.eventPassAmount;
  }

  get subTotal(){
    return this.eventPassAmount;
  }
}
