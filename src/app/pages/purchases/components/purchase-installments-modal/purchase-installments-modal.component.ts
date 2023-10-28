import { InstallmentsComponent } from './../../../checkout/components/installments/installments.component';
import { BsModalService } from './../../../../services/bs-modal.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-purchase-installments-modal',
  templateUrl: './purchase-installments-modal.component.html',
  styleUrls: ['./purchase-installments-modal.component.css']
})
export class PurchaseInstallmentsModalComponent implements OnInit {

  public mi: any;
  @Input() item: any;
  @Input() orderDoc: any;
  @Output() onCloseModal = new Subject<any>();
  private sub$!: Subscription;
  amount: any;

  constructor(
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private tuCompraSrv: TucompraService,
    private authSrv: AuthenticationService,
    private translate: TranslateService,
    private commonSrv: CommonService,
    private router: Router,
    private bsModalSrv: BsModalService,) { }

  ngOnInit(): void {
    this.buildModal();
    console.log('this.item', this.item);
    console.log('this.orderDoc', this.orderDoc);
    this.amount = this.item.amount;

  }



  /**
   * @dev paypal callback
   * @param event 
   * @returns 
   */
  async onPaypalCallback(event) {
    try {

      if (event.type === 'cancel') { return; }

      if (event.type === 'error') { return; }

      console.log('onPaypalCallback', {
        paypalResponse: event,

      });

      await this.spinner.show();

      const installments = this.orderDoc.installments
      installments[this.item.index].status = 'completed';
      installments[this.item.index].paymentMethod = 'paypal';
      installments[this.item.index].payload = event.data;
      installments[this.item.index].payedAt = moment().valueOf();
      installments[this.item.index].totales = this.amount;


      console.log('installments', installments);

      const user = await this.authSrv.getByUIDPromise(this.orderDoc.uid);
      console.log('userDoc', user);

      // /** Almacenar orden de compra */
      await this.purchaseSrv.updatedPurchaseInstallment(environment.dataEvent.keyDb, this.orderDoc.orderId, installments);

      // /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseInstallmentCuotaNotification({
        email: user.email,
        orderId: this.orderDoc.orderId,
        uid: this.orderDoc.uid,
        name: user.name,
        index: Number(this.item.index) + 1,
        installments: installments,
      });

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );


      this.closeModal()

      /** Redireccionar */
      this.router.navigate([`/pages/purchases/${this.orderDoc.orderId}/details`]);
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onPaypalCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  /**
   * @dev callback de tucompra
   * @param $formData 
   * @returns 
   */
  async onTuCompraCallback(formData: any) {
    console.log('onTuCompraCallback', formData);
    try {
      // console.log('onTuCompraCallback', formData);

      await this.spinner.show();

      const userDoc = await this.authSrv.getByUIDPromise(this.orderDoc.uid);



      // const campoExtra1 = JSON.parse(formData.campoExtra1);
      /** Actualizar referencia del ID de la orden de compra */
      const campoExtra1 = { ...formData.campoExtra1, orderId: this.orderDoc.orderId, cuota: this.item.index };
      // console.log('campoExtra1', campoExtra1);

      /** Actualizar referencia de redirección */
      const campoExtra2 = formData.campoExtra2;
      campoExtra2[2] = this.orderDoc.orderId;
      // console.log('campoExtra2', campoExtra2);

      const purchase = {
        metadata: {
          ...formData,
          campoExtra1: JSON.stringify(campoExtra1),
          campoExtra2: campoExtra2.join(''),
        }
      };
      console.log('purchase', purchase);



      /** Disparar formulario */
      this.tuCompraSrv.launchForm(purchase.metadata);


      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onTuCompraCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }



  onSelectBankTransferOption($event) {
    console.log('onSelectBankTransferOption', $event);
  }




  async showModal(item: any) {
    this.item = item;
    this.mi.show({ id: 1, class: 'modal-lg' });
  }


  async closeModal() {
    this.mi.hide();
  }




  buildModal() {
    this.mi = this.bsModalSrv.buildModal("purchaseInstallmentsModal");
    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }


}
