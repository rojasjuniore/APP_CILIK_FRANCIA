import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.nroCuota = Number(this.activeRoute.snapshot.paramMap.get('cuota'));
  }

  ngOnInit(): void {
    this.purchaseDocument$ = from(this.purchaseSrv.getPurchaseDocument(this.orderId));
  }

  async onSelectShowPayemtMethod(opts: any){
    // console.log('opts', opts);
    if(opts.type){
      this.paymentMethodType = opts.type;
      this.cuota = opts.item;

    }else{
      this.step = 'showOpts';
      this.cuota = opts.item;
    }
  }

  async selectPaymentMethod(type: any){
    const ask = await this.sweetAlert2Srv.askConfirm('Una vez seleccionado el metodo de pago no podra cambiarlo, desea continuar?');
    if(!ask){ return; }

    try {
      await this.spinner.show();
      await this.purchaseSrv.updatePurchaseInstallmentCouta(this.orderId, this.nroCuota, {paymentMethod: type.value});
      this.paymentMethodType = type.value;
      this.step = null;
      return;

    } catch (err) {
      console.log('Error on PurchasePayCuotaComponent.selectPaymentMethod', err);
      return;

    }finally{
      this.spinner.hide();
    }
  }

  async onPaypalResponse(params: any){
    const { type, data } = params;
    // console.log({type, data});

    switch (type) {
      case 'cancel':
        console.log('Cancelado', data);
        break;
      case 'error':
        console.log('Error', data);
        break;
    
      default:
        // console.log('success', data);
        await this.spinner.show();

        /**
         * - Actualizar cuota pagada
         * - Actualizar contador de cuotas pagadas
         * - Enviar mail de notificación de cuota pagada
         */
        await Promise.all([
          this.purchaseSrv.updatePurchaseInstallmentCouta(this.orderId, this.nroCuota, {
            metadata: data,
            payed: true,
            payedAt: moment().valueOf(),
          }),
          this.purchaseSrv.updatePurchaseCounter(this.orderId, 'installmentsPayed', 1),
          this.purchaseSrv.sendPurchaseTransferApprovedNotification(this.orderId, {cuota: this.nroCuota})
        ]);

        /**
         * Validar si ya se cancelaron todas las cuotas pendientes
         */
        await this.checkInstallments();

        this.step = null;
        this.paymentMethodType = null;
        this.cuota.payed = true;

        this.spinner.hide();
        break;
    }
  }

  async checkInstallments(){
    try {
      const { installments, installmentsPayed } = await this.purchaseSrv.getPurchaseDocument(this.orderId);
      if(installments.length === installmentsPayed){
        await this.purchaseSrv.updatePurchase(this.orderId, {
          status: 'completed',
          payed: true,
          completed: true,
        });
      }
      
    } catch (err) {
      console.log('Error on PurchasePayCuotaComponent.checkInstallments', err);
      return;
    }
  }


  onBack(){
    this.router.navigate(['/pages/dashboard']);
  }

}
