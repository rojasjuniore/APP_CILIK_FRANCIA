import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CouponService } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  uid: string | null;
  couponsList: any[] = [];
  userCoupon: any;
  constructor(
    private authSrv: AuthenticationService,
    private route: ActivatedRoute,
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.getProfile(this.uid)

  }

  ngOnInit(): void { }


  async getProfile(uid) {
    const userDoc = await this.authSrv.getByUIDPromise(uid);
    this.userCoupon = userDoc;
    console.log('userDoc', userDoc);
  }


}
