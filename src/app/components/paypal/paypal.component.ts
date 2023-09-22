import { Component, Input, OnInit, Output } from '@angular/core';

import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import BN from 'bignumber.js'

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  @Input() amount: any = 1;
  @Output() onError = new Subject();
  @Output() onCancel = new Subject();
  @Output() onComplete = new Subject();

  public payPalConfig?: IPayPalConfig;
  showSuccess: any;
  showCancel: any;
  showError: any;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {

    const _clientId = environment.paypal.clientId;
    const _currency = environment.paypal.currency;
    const _amount = new BN(this.amount).toFixed(2)

    // console.log('production', environment.production);
    // console.log('clientId', _clientId);
    // console.log('currency', _currency);
    // console.log('this.amount', this.amount);
    // console.log('_amount', _amount);


    this.payPalConfig = {
      clientId: _clientId,
      currency: environment.paypal.currency,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: _currency,
            value: `${_amount}` // Can also reference a variable or function
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        this.onComplete.next(data);
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
        this.showCancel = true;
        this.onCancel.next(data);

      },
      onError: err => {
        // console.log('OnError', err);
        this.showError = true;
        this.onError.next(err);
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }


  resetStatus() {
    throw new Error('Method not implemented.');
  }

}
