import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, debounceTime, map, distinctUntilChanged } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchant-purchases',
  templateUrl: './merchant-purchases.component.html',
  styleUrls: ['./merchant-purchases.component.css']
})
export class MerchantPurchasesComponent implements OnInit {
  public coupons$!: Observable<any[]>;

  public form: FormGroup = this.fb.group({ query: '' });

  constructor(
    private _clipboardService: ClipboardService,
    private sweetAlert2Srv: Sweetalert2Service,
    private fb: FormBuilder,
    private router: Router,
    private purchaseSrv: PurchaseService,
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

    const uid = localStorage.getItem("uid");

    if (isValid && query.length > 0) {
      console.log('valid query', query);
      this.coupons$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, [
        { field: 'status', condition: '==', value: true },
        { field: 'createdBy', condition: '==', value: uid },
        { field: 'slug', condition: '>=', value: query },
        { field: 'slug', condition: '<=', value: query + '\uf8ff' },
      ], {
        orderBy: [{ field: 'slug', order: 'asc' }]
      });
    } else {
      console.log('no query');
      this.coupons$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb,
        [
          { field: 'status', condition: '==', value: true },
          { field: 'createdBy', condition: '==', value: uid }
        ],
        { orderBy: [{ field: 'slug', order: 'asc' }] });
    }
  }

  async launchAddCouponForm() {
    console.log('launchAddCouponForm');
    return this.router.navigate(['/admin/coupons/store']);
  }

  goToEdit(coupon: any) {
    console.log('goToEdit', coupon);
    return this.router.navigate(['/admin/coupons', coupon._id, 'edit']);
  }


  gotToLogs(coupon: any) {
    console.log('gotToLogs', coupon);
    return this.router.navigate(['/admin/my-sales/dashboard/', coupon.ownerId]);
  }




}
