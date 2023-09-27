import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucher-timeline-card',
  templateUrl: './voucher-timeline-card.component.html',
  styleUrls: ['./voucher-timeline-card.component.css']
})
export class VoucherTimelineCardComponent implements OnInit {

  @Input() voucher!: any;

  constructor() { }

  ngOnInit(): void {
  }

  get timeline(){
    if(!this.voucher) return [];
    return this.voucher.timeline
  }

}
