import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-purchase-pay-cuota',
  templateUrl: './purchase-pay-cuota.component.html',
  styleUrls: ['./purchase-pay-cuota.component.css']
})
export class PurchasePayCuotaComponent implements OnInit {

  public purchaseDocument$!: Observable<any>; 
  public orderId: any;
  public nroCuota: number;
  public cuota: any;
  public step: any = null;
  public paymentMethodType: any;
  public paymentMethods = [
    {
      label: 'paymentMethods.paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    },
    // {
    //   label: 'paymentMethods.transfer',
    //   value: 'transfer',
    //   icon: 'bi bi-bank',
    //   status: true,
    // },
    // {
    //   label: 'paymentMethods.creditCard',
    //   value: 'creditCard',
    //   icon: 'bi bi-credit-card',
    //   status: false,
    // },
    // {
    //   label: 'paymentMethods.crypto',
    //   value: 'crypto',
    //   icon: 'bi bi-coin',
    //   status: false,
    // },
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
  ) {
    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.nroCuota = Number(this.activeRoute.snapshot.paramMap.get('cuota'));
  }

  ngOnInit(): void {
    this.purchaseDocument$ = from(this.purchaseSrv.getPurchaseDocument(this.orderId));
  }

  async onSelectShowPayemtMethod(opts: any){
    console.log('opts', opts);
    if(opts.type){
      this.paymentMethodType = opts.type;
      this.cuota = opts.item;

    }else{
      this.step = 'showOpts'
    }
  }

  async selectPaymentMethod(type: any){
    const ask = await this.sweetAlert2Srv.askConfirm('Una vez seleccionado el metodo de pago no podra cambiarlo, desea continuar?');
    if(!ask){ return; }

    this.paymentMethodType = type;
    this.step = null;
  }


}
