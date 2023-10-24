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
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public coupons$!: Observable<any[]>;

  public form: FormGroup = this.fb.group({ query: '' });

  constructor(
    private _clipboardService: ClipboardService,
    private fb: FormBuilder,
    private router: Router,
    private couponSrv: CouponService,
    private sweetAlert2Srv: Sweetalert2Service,
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

  loadData(query = '') {

    // regex only works with strings and numbers
    const regex = new RegExp(query, 'i');

    // run regex validation
    const isValid = regex.test(query);
    console.log('isValid', isValid);

    if (isValid && query.length > 0) {
      console.log('valid query', query);
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb, [
        { field: 'slug', condition: '>=', value: query },
        { field: 'slug', condition: '<=', value: query + '\uf8ff' },
      ], {
        orderBy: [{ field: 'slug', order: 'asc' }]
      });
    } else {
      console.log('no query');
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb, [], { orderBy: [{ field: 'slug', order: 'asc' }] });
    }
  }

  async launchAddCouponForm() {
    console.log('launchAddCouponForm');
    this.router.navigate(['/admin/coupons/store']);
  }

  goToEdit(coupon: any) {
    console.log('goToEdit', coupon);
    this.router.navigate(['/admin/coupons', coupon._id, 'edit']);
  }

  async removeCoupon(coupon: any) {
    try {
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
