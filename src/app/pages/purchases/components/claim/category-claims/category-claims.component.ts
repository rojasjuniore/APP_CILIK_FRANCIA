import { Component, Input, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-claims',
  templateUrl: './category-claims.component.html',
  styleUrls: ['./category-claims.component.css']
})
export class CategoryClaimsComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  item: any
  constructor(
    private purchaseSrv: PurchaseService,
  ) { }

  ngOnInit(): void {
    // console.log('this.division', this.division);
    if (this.division.accreditation) {
      this.purchaseSrv.getCategoryClaims(environment.dataEvent.keyDb,
        this.division.accreditation.division, this.division.accreditation.accreditationID)
        .subscribe((res: any) => {
          this.item = res;
        });
    } else {
      this.purchaseSrv.getCategoryClaims(environment.dataEvent.keyDb,
        this.division.division, this.division.accreditationID)
        .subscribe((res: any) => {
          // console.log('res', res);
          this.item = res;
        });
    }

  }

}
