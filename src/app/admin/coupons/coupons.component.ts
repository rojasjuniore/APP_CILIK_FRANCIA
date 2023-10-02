import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';
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
    private couponSrv: CouponService
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

}
