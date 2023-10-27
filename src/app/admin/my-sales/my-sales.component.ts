import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { CouponService } from 'src/app/services/coupon.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})
export class MySalesComponent implements OnInit {
  uid: string | null;
  couponsList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private sweetAlert2Srv: Sweetalert2Service,
    private couponsSrv: CouponService,
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.couponsSrv.myCuposPurchaseList(this.uid)
      .subscribe((data: any) => {
        this.couponsList = data;
      });
  }

  ngOnInit(): void { }

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
