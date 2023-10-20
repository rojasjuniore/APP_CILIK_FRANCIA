import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { formatBytes } from 'src/app/helpers/formatBytes.helper';

@Component({
  selector: 'app-voucher-card-item',
  templateUrl: './voucher-card-item.component.html',
  styleUrls: ['./voucher-card-item.component.css']
})
export class VoucherCardItemComponent implements OnInit, OnChanges {

  @Input() voucher!: any;
  @Input() showUpdateButton = false;

  constructor() { }

  ngOnInit(): void {
    // console.log('voucher', this.voucher);
    // console.log('showUpdateButton', this.showUpdateButton);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {voucher, showUpdateButton} = changes;
    // console.log('changes', changes);

    if(voucher && voucher.currentValue){
      this.voucher = voucher.currentValue;
    }

    if(showUpdateButton){
      // console.log('showUpdateButton', showUpdateButton.currentValue);
      this.showUpdateButton = showUpdateButton.currentValue;
    }
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
