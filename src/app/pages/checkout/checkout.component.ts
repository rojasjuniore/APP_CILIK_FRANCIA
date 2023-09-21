import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { PaypalButtonComponent } from 'src/app/shared/paypal-button/paypal-button.component';
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
      slug: 'transfer',
      type: 'method',
      icon: 'bi bi-bank',
      available: true
    },
    {
      label: 'Cuotas',
      slug: 'installments',
      type: 'method',
      icon: 'bi bi-calendar-check',
      available: true
    },
  ];

  private sub$!: Subscription;

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
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
      this.cart = cart;
      this.uid = this.cart.uid;
    });
  }

  onSelectPaymentOption(item: any){
    console.log('onSelectPaymentOption', item);
  }

  onPaypalCallback(event: any){
    console.log('onPaypalCallback', event);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
