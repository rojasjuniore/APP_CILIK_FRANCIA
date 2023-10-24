import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { InstallmentService } from 'src/app/services/dedicates/installment.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { QuickNotificationService } from 'src/app/services/quick-notification/quick-notification.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public uid!: string;
  public cart: any;

  public paymentOptions = [
    {
      label: 'general.creditOrDebitCard',
      slug: 'tucompra',
      type: 'navigation',
      icon: 'bi bi-credit-card',
      available: true
    },
    {
      label: 'general.bankTransfer',
      slug: 'bankTransfer',
      type: 'navigation',
      icon: 'bi bi-bank',
      available: true
    },
    {
      label: 'general.installmentsPayment',
      slug: 'installments',
      type: 'installments',
      icon: 'bi bi-calendar-check',
      available: false
    },
    {
      label: 'general.paypal',
      slug: 'paypal',
      type: 'navigation',
      icon: 'bi bi-paypal',
      available: true
    },
  ];
  public paymentOptionSelected: any;

  private sub$!: Subscription;

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private router: Router,
    private tuCompraSrv: TucompraService,
    private quickNotificationSrv: QuickNotificationService,
    private uploadFileSrv: UploadFileService,
    private translate: TranslateService,
    private installmentSrv: InstallmentService,

  ) { }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$
      .pipe(
        distinctUntilChanged(),
        switchMap((uid: string) => this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)),
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
      )
      .subscribe(cart => {
        // console.log('cart', cart);

        if (!cart) {
          this.router.navigate(['/pages/dashboard']);
          return;
        }

        this.cart = cart;
        this.uid = this.cart.uid;
      });
  }

  get totales() {
    if (!this.cart) return 0;
    if (!this.uid) return 0;

    const { product = [] } = this.cart;
    return product.map((item: any) => item.totales).reduce((a: number, b: number) => a + b, 0);
  }

  onClearPaymentOptionSelected() {
    this.paymentOptionSelected = null;
  }

  onSelectPaymentOption(item: any) {
    console.log('onSelectPaymentOption', item);
    if (item.type === 'navigation') {
      this.paymentOptionSelected = item;
    }

    if (item.type === 'installments') {
      // this.paymentOptionSelected = item;
      console.log('this.cart', this.cart);
      const snapshot = this.installmentSrv.getInstallmentByDate(moment().format('YYYY-MM-DD'));

      console.log('snapshot', snapshot);
      // const snapshot = this.installmentSrv.getInstallmentByDate('2023-11-09');
    }

  }

  async onPaypalCallback(event: any) {
    try {

      if (event.type === 'cancel') { return; }

      if (event.type === 'error') { return; }

      // console.log('onPaypalCallback', {
      //   paypalResponse: event,
      //   cart: this.cart,
      //   uid: this.uid,
      // });

      await this.spinner.show();

      const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);
      console.log('userDoc', userDoc);

      const purchase = {
        ...this.cart,
        paymentMethod: 'paypal',
        payload: event.data,
        status: 'completed',
        payedAt: moment().valueOf(),
        // orderId: this.cartSrv.generateId(),
        orderId: this.cart.cartId,
        totales: this.totales
      };
      console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseInformationNotification({
        email: userDoc.email,
        orderId: purchase.orderId,
        uid: this.cart.uid,
        name: userDoc.name,
      });

      /** Redireccionar */
      this.router.navigate(['/pages/dashboard']);

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onPaypalCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onTuCompraCallback(formData: any) {
    try {
      // console.log('onTuCompraCallback', formData);

      await this.spinner.show();

      const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);
      // console.log('userDoc', userDoc);


      // const campoExtra1 = JSON.parse(formData.campoExtra1);
      /** Actualizar referencia del ID de la orden de compra */
      const campoExtra1 = { ...formData.campoExtra1, orderId: this.cart.cartId };
      // console.log('campoExtra1', campoExtra1);

      /** Actualizar referencia de redirección */
      const campoExtra2 = formData.campoExtra2;
      campoExtra2[2] = this.cart.cartId;
      // console.log('campoExtra2', campoExtra2);

      const purchase = {
        ...this.cart,
        paymentMethod: 'tucompra',
        metadata: {
          ...formData,
          campoExtra1: JSON.stringify(campoExtra1),
          campoExtra2: campoExtra2.join(''),
        },
        status: 'pending',
        payedAt: null,
        orderId: campoExtra1.orderId,
        totales: this.totales
      };
      // console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseInformationNotification({
        email: userDoc.email,
        orderId: purchase.orderId,
        uid: this.cart.uid,
        name: userDoc.name,
      });

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

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

  // async onSelectBankTransferFile(file: any){
  //   try {

  //     /** Si se limpia el archivo */
  //     if(!file){ return; }


  //     const ask = await this.sweetAlert2Srv.askConfirm(
  //       this.translate.instant("alert.confirmAction")
  //     );
  //     if(!ask) { return; }

  //     // console.log('onSelectBankTransferFile', file);

  //     await this.spinner.show();

  //     const orderId = this.cart.cartId;

  //     const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);
  //     // console.log('userDoc', userDoc);

  //     const fileName = `${orderId}_${file.name}_${moment().valueOf()}`;

  //     const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${orderId}/${fileName}`;
  //     const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

  //     const purchase = {
  //       ...this.cart,
  //       paymentMethod: 'bankTransfer',
  //       voucher: {
  //         name: file.name,
  //         type: file.type,
  //         size: file.size,
  //         path: urlToSaveFile,
  //         url: fileRef,
  //         timeline: []
  //       },
  //       canEdit: false,
  //       status: 'pending',
  //       payedAt: null,
  //       orderId: orderId,
  //       totales: this.totales
  //     };
  //     // console.log('purchase', purchase);

  //     /** Almacenar orden de compra */
  //     await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

  //     /** Enviar notificación de compra realizada */
  //     await this.purchaseSrv.sendPurchaseInformationNotification({
  //       email: userDoc.email, 
  //       orderId: purchase.orderId,
  //       uid: this.cart.uid
  //     });

  //     /** Redireccionar */
  //     this.router.navigate(['/pages/dashboard']);

  //     /** Eliminar carrito de compra */
  //     await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

  //     this.sweetAlert2Srv.showToast(
  //       this.translate.instant("alert.purchaseMadeSatisfactorily"),
  //       'success'
  //     );
  //     return;

  //   } catch (err) {
  //     console.log('Error on CheckoutComponent.onSelectBankTransferFile()', err);
  //     return;
  //   } finally {
  //     this.spinner.hide();
  //   }
  // }

  async onSelectBankTransferOption(bankOption: any) {
    try {

      /** Si no se recibe ninguna opción */
      if (!bankOption) { return; }


      const ask = await this.sweetAlert2Srv.askConfirm(
        this.translate.instant("alert.confirmAction")
      );
      if (!ask) { return; }

      console.log('onSelectBankTransferOption', bankOption);

      await this.spinner.show();

      const orderId = this.cart.cartId;

      const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);
      // console.log('userDoc', userDoc);

      // const fileName = `${orderId}_${file.name}_${moment().valueOf()}`;

      // const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${orderId}/${fileName}`;
      // const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

      const purchase = {
        ...this.cart,
        paymentMethod: 'bankTransfer',
        bankOption: bankOption.slug,
        bankOptionData: bankOption,
        voucher: null,
        canEdit: true,
        status: 'pending',
        payedAt: null,
        orderId: orderId,
        totales: this.totales
      };
      console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseInformationNotification({
        email: userDoc.email,
        orderId: purchase.orderId,
        uid: this.cart.uid,
        name: userDoc.name,
      });

      /** Enviar datos de transferencia bancaria */
      await this.purchaseSrv.sendPurchaseBankTransferInformationNotification({
        email: userDoc.email,
        orderId: purchase.orderId,
        uid: this.cart.uid,
        bankOptionData: purchase.bankOptionData,
        totales: purchase.totales
      });

      /** Redireccionar */
      this.router.navigate(['/pages/dashboard']);

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onSelectBankTransferFile()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }



  /**
 * 
 * @param installmentsOption 
 */
  async onSelectInstallmentsOption(installmentsOption: any) {
    console.log(installmentsOption);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
