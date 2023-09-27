import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucher-card-item',
  templateUrl: './voucher-card-item.component.html',
  styleUrls: ['./voucher-card-item.component.css']
})
export class VoucherCardItemComponent implements OnInit {

  @Input() order!: any;

  constructor() { }

  ngOnInit(): void {
  }

  openVoucherFileLink(){
    window.open(this.order.voucher.url, '_blank');
  }

}
