import { Component, OnInit } from '@angular/core';

import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  showSuccess: any;
  showCancel: any;
  showError: any;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {

    const _clientId = environment.production ? environment.paypal.payPalEnvironmentProduction : environment.paypal.payPalEnvironmentSandbox
    const _currency = environment.paypal.currency;
    console.log('clientId', _clientId);
    console.log('currency', _currency);


    this.payPalConfig = {
      currency: environment.paypal.currency,
      clientId: _clientId,

      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            value: '1' // Can also reference a variable or function
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
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      }
    };
  }


  resetStatus() {
    throw new Error('Method not implemented.');
  }

}
