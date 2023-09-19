import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, map, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public uid!: string;
  public cart: any;

  private sub$!: Subscription;

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
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


  async onRemoveItem(item: any){
    try {

      await this.spinner.show();

      await this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.uid, item);

      this.sweetAlert2Srv.showToast('Artículo eliminado del carrito', 'success');
      return;
      
    } catch (err) {
      console.log('Error on CartComponent.onRemoveItem', err);
      return;

    } finally {
      this.spinner.hide();
    }
  }


  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
