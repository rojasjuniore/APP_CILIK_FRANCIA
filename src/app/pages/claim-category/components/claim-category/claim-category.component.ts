import { Component, OnDestroy, OnInit } from '@angular/core';
import { env } from 'process';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-claim-category',
  templateUrl: './claim-category.component.html',
  styleUrls: ['./claim-category.component.css']
})
export class ClaimCategoryComponent implements OnInit, OnDestroy {

  public uid: any;

  public filteredAndSortedProducts: any;

  private sub$!: Subscription

  constructor(
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$.subscribe((uid) => {
      if (!uid) { return; }
      this.uid = uid;
      this.combineQueries(uid);
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  combineQueries(uid: string) {
    this.purchaseSrv
      .combineQueries(environment.dataEvent.keyDb, uid)
      .subscribe((x: any) => {
        this.transformData(x);
      });
  }

  transformData(data: any) {
    // console.log('transformData', data);
    this.filteredAndSortedProducts = data
      .flatMap((x) =>
        x.product
          .map((p, index) => ({
            ...p,
            _id: x._id,
            _index: index,
          }))
          .filter(p => p.key == "categoryPass")
      )
      .sort((a, b) => {
        if (a.categoryType < b.categoryType) {
          return -1;
        }
        if (a.categoryType > b.categoryType) {
          return 1;
        }
        return 0;
      });
    // console.log('filteredProducts', this.filteredAndSortedProducts);
  }

}
