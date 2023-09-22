import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
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
      available: false
    },
    {
      label: 'Transferencia',
      slug: 'transfer',
      type: 'method',
      icon: 'bi bi-bank',
      available: false
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

      /** TODO: enviar notificación vía email de la compra realizada */

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

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
