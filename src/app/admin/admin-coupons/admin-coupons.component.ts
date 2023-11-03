import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.css']
})
export class AdminCouponsComponent implements OnInit {

  public coupons$!: Observable<any[]>;
  public couponsAll$!: Observable<any[]>;

  public form: FormGroup = this.fb.group({ query: '' });

  constructor(
    private _clipboardService: ClipboardService,
    private sweetAlert2Srv: Sweetalert2Service,
    private fb: FormBuilder,
    private router: Router,
    private couponSrv: CouponService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.form.get('query')?.valueChanges
      .pipe(
        debounceTime(500),
        /// only email format with regex
        map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged(),
      )
      .subscribe((value: string) => {
        console.log('valueChanges', value);
        this.loadData(value);
      });
  }


  /**
   * 
   * @param query 
   */
  loadData(query = '') {

    // regex only works with strings and numbers
    const regex = new RegExp(query, 'i');

    // run regex validation
    const isValid = regex.test(query);
    console.log('isValid', isValid);


    if (isValid && query.length > 0) {
      console.log('valid query', query);
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb, [
        { field: 'status', condition: '==', value: false },
        { field: 'slug', condition: '>=', value: query },
        { field: 'slug', condition: '<=', value: query + '\uf8ff' },
      ], {
        orderBy: [{ field: 'slug', order: 'asc' }]
      });



    } else {
      console.log('no query');
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb,
        [
          { field: 'status', condition: '==', value: false },
        ],
        { orderBy: [{ field: 'slug', order: 'asc' }] });
    }


    this.couponsAll$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb,
      [{ field: 'status', condition: '==', value: true },
      ],
      { orderBy: [{ field: 'slug', order: 'asc' }] });

  }

  /**
   * @dev launchAddCouponForm
   * @returns 
   */
  async launchAddCouponForm() {
    console.log('launchAddCouponForm');
    return this.router.navigate(['/admin/coupons/store']);
  }


  /**
   * @dev goToEdit
   * @param coupon 
   * @returns 
   */
  goToEdit(coupon: any) {
    console.log('goToEdit', coupon);
    return this.router.navigate(['/admin/coupons-admin', coupon._id, 'edit']);
  }

  /**
   * @dev gotToLogs
   * @param coupon 
   * @returns 
   */
  gotToLogs(coupon: any) {
    console.log('gotToLogs', coupon);
    return this.router.navigate(['/admin/my-sales/dashboard/', coupon.ownerId]);
  }

  /**
   * @dev removeCoupon
   * @param coupon 
   * @returns 
   */
  async removeCoupon(coupon: any) {
    try {

      if (environment.production) {
        return this.sweetAlert2Srv.showBasicAlert('This action is not allowed in production', 'Please contact the administrator');
      }

      console.log('removeCoupon', coupon);
      const ask = await this.sweetAlert2Srv.askConfirm('Are you sure you want to remove this coupon?');
      if (!ask) { return; }



      await this.spinner.show();

      await this.couponSrv.remove(environment.dataEvent.keyDb, coupon._id)

      this.sweetAlert2Srv.showSuccess('Coupon removed successfully');
      return;

    } catch (err) {
      console.log('Error on CouponsComponent.removeCoupon', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  /**
   * 
   * @param item 
   */
  copy(item) {
    this._clipboardService.copy(environment.dataEvent.appURL + '?code=' + item.slug);
    this.sweetAlert2Srv.showSuccess('Copied to clipboard');
    return
  }

}
