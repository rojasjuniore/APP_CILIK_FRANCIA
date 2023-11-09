import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, distinctUntilChanged, map, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { CodeStorageService } from 'src/app/services/code-storage.service';
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
  public couponObj: unknown;
  public totales: any = 0
  constructor(
    private codeStorageSrv: CodeStorageService,
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.sub$ = this.authSrv.uid$
      .pipe(
        distinctUntilChanged(),
        switchMap((uid: string) => this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)),
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
      )
      .subscribe(async cart => {


        /// @dev check code coupon
        this.couponObj = await this.codeStorageSrv.checkCode();
        // console.log('code', this.couponObj);
        // console.log('cart', cart);


        this.cart = cart;
        this.uid = this.cart.uid;
      });


  }


  /**
   * @dev Remove coupon
   * @param item 
   */
  onRemoveCupon(item: any) {
    // console.log('removeCupon', item);
    this.couponObj = null;
  }


  async onSetCupon(item: any) {
    /// @dev check code coupon
    // console.log('setCupon', item);
    this.couponObj = await this.codeStorageSrv.checkCode();

  }


  /**
   * @dev Get total
   * @param item 
   */
  onCartTotal(item) {
    this.totales = item.globalTotal.globalTotalToPay || 0;
  }


  async onRemoveItem(item: any) {
    try {
      await this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.uid, item);

      this.sweetAlert2Srv.showToast(
        this.translate.instant('alert.itemRemovedFromCart'),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on CartComponent.onRemoveItem', err);
      return;
    }
  }


  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
