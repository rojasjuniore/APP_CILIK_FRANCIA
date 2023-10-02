import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
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

  public query = '';

  constructor(
    private router: Router,
    private couponSrv: CouponService,
    private sweetAlert2Srv: Sweetalert2Service,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){

    // regex only works with strings and numbers
    const regex = new RegExp(this.query, 'i');

    // run regex validation
    const isValid = regex.test(this.query);
    console.log('isValid', isValid);

    if(isValid && this.query.length > 0){
      console.log('valid query', this.query);
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb, [
        {field: 'slug', condition: '==', value: this.query},
      ], {
        orderBy: [{field: 'slug', order: 'asc'}]
      });
    } else {
      console.log('invalid query');
      this.coupons$ = this.couponSrv.getDynamic(environment.dataEvent.keyDb, [], {orderBy: [{field: 'slug', order: 'asc'}]});
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

}
