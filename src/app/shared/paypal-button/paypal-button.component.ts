import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import BN from 'bignumber.js'

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit, OnChanges {

  @ViewChild('paypalWidget') paypalWidget!: NgxPaypalComponent; 

  @Input() amount: number = 1;

  @Output() onCallback = new Subject<OnPaypalCallback>();

  public payPalConfig?: IPayPalConfig;

  constructor() { }

  ngOnInit(): void {
    this.buildPaypalConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { amount } = changes;

    if(amount && amount.currentValue) {
      this.amount = amount.currentValue;
      this.buildPaypalConfig();
    }
  }

  buildPaypalConfig() {

    const _clientId = environment.production ?
      environment.paypal.payPalEnvironmentProduction :
      environment.paypal.payPalEnvironmentSandbox
    const _currency = environment.paypal.currency;
    const _fee = new BN(this.amount).multipliedBy(0.056).toFixed(2)
    const _amount = new BN(this.amount).plus(_fee).toFixed(2)

    // console.log({
    //   _clientId,
    //   _currency,
    //   _fee,
    //   _amount
    // });


    this.payPalConfig = {
      clientId: _clientId,
      currency: environment.paypal.currency,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: `${_amount}` // Can also reference a variable or function
          }
        }]
      },
      advanced: { commit: 'true' },
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
        this.onCallback.next({ type: 'success', data });
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
        this.onCallback.next({ type: 'cancel', data });

      },
      onError: (err) => {
        // console.log('OnError', err);
        this.onCallback.next({ type: 'error', data: err });
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }

}

export interface OnPaypalCallback {
  type: string;
  data: any;
}
