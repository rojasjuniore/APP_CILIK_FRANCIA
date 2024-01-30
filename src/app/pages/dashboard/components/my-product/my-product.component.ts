import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {



  public product$!: Observable<any[]>;
  public allproduct$!: Observable<any[]>;
  option: any;


  constructor(
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService,
    private _clipboardService: ClipboardService,
    private sweetAlert2Srv: Sweetalert2Service,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // const uid = this.authSrv.getLocalUID()
    // console.log('uid', uid);
    // // this.product$ = this.purchaseSrv.claimPurchase(environment.dataEvent.keyDb, uid)

    // this.product$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, [{ field: 'uidList', condition: 'array-contains', value: uid },])
    this.loadData();
  }

  loadData(type = 1) {
    this.option = type;
    const uid = this.authSrv.getLocalUID()
    // this.product$ = of([]);
    // if (type == 1) {
    //   console.log('product', uid);
    // } else {
    //   console.log('all product', uid);
    // }
    this.allproduct$ = this.purchaseSrv.claimPurchase(environment.dataEvent.keyDb, uid)

    this.product$ = this.purchaseSrv.getDynamicClaim(environment.dataEvent.keyDb, [{ field: 'uidList', condition: 'array-contains', value: uid }])

  }

}
