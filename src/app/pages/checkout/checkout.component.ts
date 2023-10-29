import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartTotalService } from 'src/app/services/cart-total.service';
import { CartService } from 'src/app/services/cart.service';
import { CodeStorageService } from 'src/app/services/code-storage.service';
import { CouponService } from 'src/app/services/coupon.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { InstallmentService } from 'src/app/services/dedicates/installment.service';
import { PurchaseService } from 'src/app/services/purchase.service';
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
      label: 'general.installmentsPayment',
      slug: 'installments',
      type: 'installments',
      icon: 'bi bi-calendar-check',
      available: true
    },
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
      label: 'general.paypal',
      slug: 'paypal',
      type: 'navigation',
      icon: 'bi bi-paypal',
      available: true
    },
  ];
  public paymentOptionSelected: any;

  private sub$!: Subscription;
  public totales: any;
  public purchaseDetailsWithCoupon: any
  public couponObj: any;
  public globalTotal: any
  public installments: any

  constructor(
    private couponsSrv: CouponService,
    private codeStorageSrv: CodeStorageService,
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private router: Router,
    private tuCompraSrv: TucompraService,
    private translate: TranslateService,
    private cartTotalSrv: CartTotalService,
    private installmentSrv: InstallmentService,

  ) { }

  async ngOnInit(): Promise<void> {

    this.couponObj = await this.codeStorageSrv.checkCode();
    console.log('couponObj', this.couponObj);

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


    this.cartTotalSrv.myCartTotal$.subscribe(async (gTotal: any) => {
      // console.log('gTotal', gTotal);
      if (!gTotal) return
      this.totales = gTotal.globalTotal;
      // console.log('this.totales', this.totales);
      // this.purchaseDetailsWithCoupon = gTotal.updatedGroupedData;
      // console.log('this.totales', this.purchaseDetailsWithCoupon);


    });




  }


  onClearPaymentOptionSelected() {
    this.paymentOptionSelected = null;
  }


  /**
   * @dev callback de paymentOptionSelected
   * @param item 
   */
  onSelectPaymentOption(item: any) {
    console.log('onSelectPaymentOption');
    if (item.type === 'navigation') {
      this.paymentOptionSelected = item;
    }

    if (item.type === 'installments') {
      this.paymentOptionSelected = item;
      const installments = this.installmentSrv.calculateQuotas(moment().format('YYYY-MM-DD'));
      console.log('installments', installments);
      const installmentAmount = (this.totales.globalTotalToPay / installments.length).toFixed(3);
      /// @dev agregar monto a cada cuota
      this.installments = installments.map((item: any) => {
        return {
          ...item,
          amount: installmentAmount,
        }
      });


      console.log('totales', this.totales);
      console.log('installments', this.installments);
    }

  }


  /**
   * @dev callback de paypal
   * @param event 
   * @returns 
   */
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
        merchantIdentification: this.couponObj ? this.couponObj.createdBy : null,
        coupons: this.couponObj ? this.couponObj.coupons : [],
        codeCoupon: this.couponObj.code ? this.couponObj.code : null,
        referred_by: this.couponObj.ownerId ? this.couponObj.ownerId : null,
        discount_with_coupon: this.totales ? this.totales : 0,
        paymentMethod: 'paypal',
        payload: event.data,
        installments: null,
        status: 'completed',
        payedAt: moment().valueOf(),
        // orderId: this.cartSrv.generateId(),
        orderId: this.cart.cartId,
        totalResumen: this.totales,
        totales: this.totales.globalTotalToPay
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


      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);



      /**  Resta un valor a un contador */
      await this.couponsSrv.subtractCounter(environment.dataEvent.keyDb, this.couponObj.code, 'userLimit', 1);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );

      /// @dev eliminar carrito de compra
      this.cartTotalSrv.removeItem()



      /** Redireccionar */
      this.router.navigate([`/pages/purchases/${purchase.orderId}/details`]);
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
   * @param formData 
   * @returns 
   */
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
        merchantIdentification: this.couponObj ? this.couponObj.createdBy : null,
        coupons: this.couponObj ? this.couponObj.coupons : [],
        codeCoupon: this.couponObj.code ? this.couponObj.code : null,
        referred_by: this.couponObj.ownerId ? this.couponObj.ownerId : null,
        discount_with_coupon: this.totales ? this.totales : 0,
        metadata: {
          ...formData,
          campoExtra1: JSON.stringify(campoExtra1),
          campoExtra2: campoExtra2.join(''),
        },
        status: 'pending',
        payedAt: null,
        installments: null,
        orderId: campoExtra1.orderId,
        totales: this.totales.globalTotalToPay,
        totalResumen: this.totales,
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

      /**  Resta un valor a un contador */
      await this.couponsSrv.subtractCounter(environment.dataEvent.keyDb, this.couponObj.code, 'userLimit', 1);


      /** Disparar formulario */
      this.tuCompraSrv.launchForm(purchase.metadata);

      /// @dev eliminar carrito de compra
      this.cartTotalSrv.removeItem()
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onTuCompraCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  /**
  * @dev callback de BankTransfer
  * @param bankOption 
  * @returns 
  */
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
        merchantIdentification: this.couponObj ? this.couponObj.createdBy : null,
        codeCoupon: this.couponObj.code ? this.couponObj.code : null,
        coupons: this.couponObj ? this.couponObj.coupons : [],
        referred_by: this.couponObj.ownerId ? this.couponObj.ownerId : null,
        discount_with_coupon: this.totales ? this.totales : 0,
        paymentMethod: 'bankTransfer',
        bankOption: bankOption.slug,
        bankOptionData: bankOption,
        voucher: null,
        canEdit: true,
        status: 'pending',
        payedAt: null,
        installments: null,
        orderId: orderId,
        totales: this.totales.globalTotalToPay,
        totalResumen: this.totales,
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



      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      /**  Resta un valor a un contador */
      await this.couponsSrv.subtractCounter(environment.dataEvent.keyDb, this.couponObj.code, 'userLimit', 1);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );

      /// @dev eliminar carrito de compra
      this.cartTotalSrv.removeItem()

      /** Redireccionar */
      this.router.navigate([`/pages/purchases/${orderId}/details`]);
      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onSelectBankTransferFile()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  /**
  * @dev callback de Installments
  * @param installmentsOption 
  */
  async onSelectInstallmentsOption(installmentsOption: any) {
    console.log("installmentsOption", installmentsOption);
    try {

      /** Si no se recibe ninguna opción */
      if (!installmentsOption) { return; }


      const ask = await this.sweetAlert2Srv.askConfirm(
        this.translate.instant("alert.confirmAction")
      );
      if (!ask) { return; }

      console.log('onSelectBankTransferOption', installmentsOption);

      await this.spinner.show();

      const orderId = this.cart.cartId;

      const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);


      const purchase = {
        ...this.cart,
        merchantIdentification: this.couponObj ? this.couponObj.createdBy : null,
        codeCoupon: this.couponObj.code ? this.couponObj.code : null,
        coupons: this.couponObj ? this.couponObj.coupons : [],
        referred_by: this.couponObj.ownerId ? this.couponObj.ownerId : null,
        discount_with_coupon: this.totales ? this.totales : 0,
        voucher: null,
        canEdit: true,
        status: 'pending',
        payedAt: null,
        paymentMethod: 'installments',
        installments: installmentsOption,
        orderId: orderId,
        totales: this.totales.globalTotalToPay,
        totalResumen: this.totales,
      };
      console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Enviar notificación de compra realizada */
      await this.purchaseSrv.sendPurchaseInstallmentNotification({
        email: userDoc.email,
        orderId: purchase.orderId,
        uid: this.cart.uid,
        installments: purchase.installments,
        name: userDoc.name,
      });



      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      /**  Resta un valor a un contador */
      await this.couponsSrv.subtractCounter(environment.dataEvent.keyDb, this.couponObj.code, 'userLimit', 1);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.purchaseMadeSatisfactorily"),
        'success'
      );


      /// @dev eliminar carrito de compra
      this.cartTotalSrv.removeItem()


      /** Redireccionar */
      this.router.navigate([`/pages/purchases/${orderId}/details`]);

      return;

    } catch (err) {
      console.log('Error on CheckoutComponent.onSelectBankTransferFile()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }



  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
