import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit, OnDestroy {

  public orderId!: string;
  public orderDoc: any;

  private sub$!: Subscription;

  constructor(
    private router: ActivatedRoute,
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService
  ) {
    const orderId = this.router.snapshot.paramMap.get('orderId');
    // console.log('orderId', orderId);
    this.orderId = orderId || '';
  }

  ngOnInit(): void {

    this.sub$ = this.authSrv.uid$
    .pipe(
      switchMap((uid) => this.purchaseSrv.getByEventAndId(environment.dataEvent.keyDb, this.orderId)),
      map((order) => {
        return (order) ? {exist: true, ...order} : {exist: false};
      }),
      catchError((err) => of({exist: false}))
    )
    .subscribe((order) => {
      this.orderDoc = order;
    });
  }

  get totales() {
    if(!this.orderDoc) { return 0; }
    if(!this.orderDoc.exist) { return 0; }
    return this.orderDoc.totales;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
