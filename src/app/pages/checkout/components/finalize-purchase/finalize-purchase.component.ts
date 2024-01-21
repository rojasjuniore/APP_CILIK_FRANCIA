import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OnPaypalCallback } from '../paypal-button/paypal-button.component';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';

@Component({
  selector: 'app-finalize-purchase',
  templateUrl: './finalize-purchase.component.html',
  styleUrls: ['./finalize-purchase.component.css'],
})
export class FinalizePurchaseComponent implements OnInit {
  @Output() onSelectOption = new Subject<any>();

  constructor(
    private sweetalert2Srv: Sweetalert2Service,
    private translateSrv: CustomTranslateService
  ) {}

  ngOnInit(): void {}

  async confirmOption() {
    let message = await this.translateSrv.translate('alert.finalizePurchase');
    const ask = await this.sweetalert2Srv.askConfirm(message);
    console.log('ask', ask);
    if (!ask) return;

    const obj = {
      type: 'success',
      date: Date.now(),
    };

    console.log('obj', obj);
    return this.onSelectOption.next({ type: 'success', data: obj });
  }
}
