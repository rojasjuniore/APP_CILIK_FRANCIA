import { Component, Input, OnInit } from '@angular/core';
import { formatBytes } from 'src/app/helpers/formatBytes.helper';

@Component({
  selector: 'app-voucher-card-item',
  templateUrl: './voucher-card-item.component.html',
  styleUrls: ['./voucher-card-item.component.css']
})
export class VoucherCardItemComponent implements OnInit {

  @Input() voucher!: any;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.voucher);
  }

  get sizeParsed(): string | null {
    return (this.voucher && this.voucher) ? formatBytes(this.voucher.size) : null;
  }

  get observations(): string {
    if(!this.voucher) {return '';}

    const timeline: any[] = this.voucher.timeline;
    if(!timeline || timeline.length === 0) {return '';}

    const lastEvent = timeline[timeline.length - 1];
    return lastEvent.observation;
  }

  openVoucherFileLink(){
    window.open(this.voucher.url, '_blank');
  }

}
