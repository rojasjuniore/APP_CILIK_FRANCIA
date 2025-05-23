import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-adviser-modal',
  templateUrl: './purchase-adviser-modal.component.html',
  styleUrls: ['./purchase-adviser-modal.component.css']
})
export class PurchaseAdviserModalComponent implements OnInit, OnChanges {
  public mi: any;
  @Input() item: any;
  @Input() amount: any;
  @Input() orderDoc: any;
  @Output() onCloseModal = new Subject<any>();
  private sub$!: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private tuCompraSrv: TucompraService,
    private authSrv: AuthenticationService,
    private translate: TranslateService,
    private router: Router,
    private bsModalSrv: BsModalService,
    private uploadFileSrv: UploadFileService,

  ) { }


  ngOnInit(): void {
    this.buildModal();
    // this.amount = this.amount;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { amount, orderDoc } = changes;
    if (amount && amount.currentValue) {
      this.amount = amount.currentValue;
      this.orderDoc = orderDoc.currentValue;
    }
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal("purchaseAdviserModal");
    this.sub$ = this.router.events.subscribe((event) => {
      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }
    });
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

      console.log('onPaypalCallback', { paypalResponse: event });

      await this.spinner.show();


      let adviserPaymentList = this.orderDoc.adviserPaymentList || [];
      adviserPaymentList.push({
        status: 'completed',
        paymentMethod: 'paypal',
        payload: event.data,
        payedAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
        totales: this.amount,
      });

      console.log('adviserPaymentList', adviserPaymentList);
      const user = await this.authSrv.getByUIDPromise(this.orderDoc.uid);
      console.log('userDoc', user);

      // /** Almacenar orden de compra */
      await this.purchaseSrv.updatedPurchaseAdviser(environment.dataEvent.keyDb, this.orderDoc.orderId, adviserPaymentList);

      // /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseAdviserPaymentNotification({
        email: user.email,
        orderId: this.orderDoc.orderId,
        uid: this.orderDoc.uid,
        name: user.name,
        updatedAt: moment().valueOf(),
        adviserPaymentList: adviserPaymentList,
      });

      // /** Actualizar estado de la orden de compra */
      await this.purchaseSrv
        .updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId,
          {
            updatedAt: moment().valueOf(),
            rejectedAt: null,
            totalResumen: {
              ...this.orderDoc.totalResumen,
              paidForPayment: Number(this.orderDoc.totalResumen.paidForPayment) + Number(this.amount),
            }
          },
        );

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );


      this.closeModal()

      /** Redireccionar */
      // this.router.navigate([`/pages/purchases/${this.orderDoc.orderId}/details`]);
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onPaypalCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  /// @dev callback de voucher 
  async onVoucherCallback(event) {
    console.log('onVoucherCallback', event);
    try {
      const ask = await this.sweetAlert2Srv
        .askConfirm(this.translate.instant("alert.confirmAction"));
      if (!ask) { return; }

      await this.spinner.show();
      const { formData, optionSelected } = event;
      console.log('formData', formData);
      console.log('order', this.orderDoc);
      const { bankTransferFile: file, reference } = formData;
      const uploadAt = moment().valueOf();

      /** Construir nombre del archivo */
      const fileName = `${this.orderDoc.orderId}_${file.name}_${uploadAt}`;

      /** Crear Referencia al documento */
      const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${this.orderDoc.orderId}/${fileName}`;

      /** Cargar archivo ene l bucket */
      const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

      /** Construir objeto con valores a actualizar */
      const purchase = {
        voucher: {
          reference: reference,
          name: file.name,
          type: file.type,
          size: file.size,
          path: urlToSaveFile,
          url: fileRef,
          timeline: [],
          uploadAt: uploadAt,
          canEdit: false,
        },
      };


      let adviserPaymentList = this.orderDoc.adviserPaymentList || [];
      adviserPaymentList.push({
        status: 'pending',
        paymentMethod: 'bankTransfer',
        payload: {
          purchase: purchase,
          optionSelected: optionSelected
        },
        amount: this.amount,
        payedAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
        totales: this.amount,
      });



      await this.purchaseSrv
        .updatedPurchaseAdviser(environment.dataEvent.keyDb, this.orderDoc.orderId, adviserPaymentList);

      this.closeModal()

      /** Redireccionar */
      // this.router.navigate([`/pages/purchases/${this.orderDoc.orderId}/details`]);
      return;
    } catch (err) {
      console.log('Error on PurchaseDetailsComponent.onLoadVoucher', err);
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


      const adviserPaymentList = this.orderDoc.adviserPaymentList || [];
      const adviserPaymentListlength = adviserPaymentList.length;


      // const campoExtra1 = JSON.parse(formData.campoExtra1);
      /** Actualizar referencia del ID de la orden de compra */
      const campoExtra1 = {
        ...formData.campoExtra1,
        orderId: this.orderDoc.orderId,
        cuota: adviserPaymentListlength
      };
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








  async showModal(item: any) {
    this.item = item;
    this.mi.show({ id: 1, class: 'modal-lg' });
  }


  async closeModal() {
    this.mi.hide();
  }


  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
