import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
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
      label: 'Paypal',
      slug: 'paypal',
      type: 'navigation',
      icon: 'bi bi-paypal',
      available: true
    },
    {
      label: 'Tarjeta de crédito o débito',
      slug: 'tucompra',
      type: 'navigation',
      icon: 'bi bi-credit-card',
      available: true
    },
    {
      label: 'Transferencia',
      slug: 'bankTransfer',
      type: 'navigation',
      icon: 'bi bi-bank',
      available: true
    },
    {
      label: 'Cuotas',
      slug: 'installments',
      type: 'method',
      icon: 'bi bi-calendar-check',
      available: false
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
  ) { }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$
    .pipe(
      distinctUntilChanged(),
      switchMap((uid: string) => this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
    )
    .subscribe(cart => {
      console.log('cart', cart);

      if(!cart) {
        this.router.navigate(['/pages/dashboard']);
        return;
      }
      
      this.cart = cart;
      this.uid = this.cart.uid;
    });
  }

  get totales() {
    if(!this.cart) return 0;
    if(!this.uid) return 0;

    const { product = [] } = this.cart;
    return product.map((item: any) => item.totales).reduce((a: number, b: number) => a + b, 0);
  }

  onSelectPaymentOption(item: any){
    console.log('onSelectPaymentOption', item);
    if(item.type === 'navigation'){
      this.paymentOptionSelected = item;
    }
  }

  async onPaypalCallback(event: any){
    try {

      if(event.type === 'cancel'){ return; }

      if(event.type === 'error'){ return; }

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
        orderId: this.cartSrv.generateId(),
        totales: this.totales
      };
      console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Enviar notificación de compra realizada */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInfo",
        email: userDoc.email,
        subject: `Purchase ${purchase.orderId} a WLDC Cartagena 2024 - ` + moment().format("DD/MM/YYYY HH:mm:ss"),
        greeting: `¡Hola!`,
        messageBody: [
          {type: "html", html: `<h1 style='text-align: center;'><strong>Compra #${purchase.orderId}</strong></h1>`},
          {type: 'line', text: `Estamos muy felices de contar con tu presencia en la edición WLDC 2024.`},
          {type: 'line', text: `A continuación encontrarás los detalles de tu compra:`},
          {type: 'action', action: 'Aquí', url: environment.dataEvent.appURL + '/pages/purchases/' + purchase.orderId + '/details'},
          {type: "line", text: "Si no reconoce esta actividad, no se requiere ninguna acción adicional."}
      ],
        salutation: '¡Saludos!'
      });

      /** Redireccionar */
      this.router.navigate(['/pages/dashboard']);

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      this.sweetAlert2Srv.showToast('Compra realizada satisfactoriamente', 'success');
      return;
      
    } catch (err) {
      console.log('Error on CheckoutComponent.onPaypalCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onTuCompraCallback(formData: any){
    try {
      // console.log('onTuCompraCallback', formData);

      await this.spinner.show();

      const campoExtra1 = JSON.parse(formData.campoExtra1);
      // console.log('campoExtra1', campoExtra1);

      const purchase = {
        ...this.cart,
        paymentMethod: 'tucompra',
        metadata: formData,
        status: 'pending',
        payedAt: moment().valueOf(),
        orderId: campoExtra1.orderId,
        totales: this.totales
      };
      // console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      /** Disparar formulario */
      this.tuCompraSrv.launchForm(formData);
      return;
      
    } catch (err) {
      console.log('Error on CheckoutComponent.onTuCompraCallback()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onSelectBankTransferFile(file: any){
    try {
      const ask = await this.sweetAlert2Srv.askConfirm('¿Está seguro de realizar esta acción?');
      if(!ask) { return; }

      console.log('onSelectBankTransferFile', file);

      await this.spinner.show();

      const orderId = this.cartSrv.generateId();

      const userDoc = await this.authSrv.getByUIDPromise(this.cart.uid);
      console.log('userDoc', userDoc);

      const fileName = `${orderId}_${file.name}_${moment().valueOf()}`;

      const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${orderId}/${fileName}`;
      const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

      const purchase = {
        ...this.cart,
        paymentMethod: 'bankTransfer',
        voucher: {
          name: file.name,
          type: file.type,
          size: file.size,
          path: urlToSaveFile,
          url: fileRef,
          timeline: []
        },
        canEdit: false,
        status: 'pending',
        payedAt: moment().valueOf(),
        orderId: orderId,
        totales: this.totales
      };
      console.log('purchase', purchase);

      /** Almacenar orden de compra */
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, purchase.orderId, purchase);

      /** Redireccionar */
      this.router.navigate(['/pages/dashboard']);

      /** Eliminar carrito de compra */
      await this.cartSrv.deleteCart(environment.dataEvent.keyDb, this.uid);

      this.sweetAlert2Srv.showToast('Compra realizada satisfactoriamente', 'success');
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
