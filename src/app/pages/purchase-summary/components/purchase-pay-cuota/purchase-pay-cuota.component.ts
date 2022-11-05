import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-pay-cuota',
  templateUrl: './purchase-pay-cuota.component.html',
  styleUrls: ['./purchase-pay-cuota.component.css']
})
export class PurchasePayCuotaComponent implements OnInit {

  public purchaseDocument$!: Observable<any>; 
  public orderId: any;
  public cuota: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private purchaseSrv: PurchaseService,
  ) {
    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.cuota = Number(this.activeRoute.snapshot.paramMap.get('cuota'));
  }

  ngOnInit(): void {
    this.purchaseDocument$ = from(this.purchaseSrv.getPurchaseDocument(this.orderId));
  }

  async onSelectPayemtMethod(opts: any){
    console.log('opts', opts);
  }

}
