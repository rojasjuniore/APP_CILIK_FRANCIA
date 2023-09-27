import { Component, Input, OnInit } from '@angular/core';
import { formatBytes } from 'src/app/helpers/formatBytes.helper';

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

  get sizeParsed(): string | null {
    return (this.order && this.order.voucher) ? formatBytes(this.order.voucher.size) : null;
  }

  openVoucherFileLink(){
    window.open(this.order.voucher.url, '_blank');
  }

}
