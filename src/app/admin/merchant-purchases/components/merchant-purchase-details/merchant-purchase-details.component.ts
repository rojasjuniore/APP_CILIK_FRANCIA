import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { MerchantModalEditAmountComponent } from '../merchant-modal-edit-amount/merchant-modal-edit-amount.component';

@Component({
  selector: 'app-merchant-purchase-details',
  templateUrl: './merchant-purchase-details.component.html',
  styleUrls: ['./merchant-purchase-details.component.css']
})
export class MerchantPurchaseDetailsComponent implements OnInit {
  @ViewChild('modalAmountEditOwner') modalAmountEditOwner!: MerchantModalEditAmountComponent;
  public orderId!: string;
  public orderDoc: any;
  public showUpdateVoucherForm = false;
  private sub$!: Subscription;



  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translate: TranslateService,
    private uploadFileSrv: UploadFileService,
    private spinner: NgxSpinnerService,
  ) {
    const orderId = this.router.snapshot.paramMap.get('orderId');
    console.log('app-merchant-purchase-details', orderId);
    this.orderId = orderId || '';
  }

  ngOnInit(): void {

    this.sub$ = this.authSrv.uid$
      .pipe(
        switchMap((uid) => this.purchaseSrv.getByEventAndId(environment.dataEvent.keyDb, this.orderId)),
        map((order) => {
          return (order) ? { exist: true, ...order } : { exist: false };
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe(async (order: any) => {
        this.orderDoc = order;
        console.log('order', this.orderDoc);
        return
      });
  }


  onRenderUpdateVoucher(event: any) {
    // console.log('event', event);
    this.showUpdateVoucherForm = true;
  }



  launchModalEditAmount(item, index) {
    console.log(index, item);
    this.modalAmountEditOwner.showModal({
      ...item,
      index: index,
    });
  }

  async onEditAmount(response) {
    const { status, data } = response;
    if (!status) {
      console.error('Error: No status in response');
      return;
    }

    console.log('onEditAmount', data);
    const { index, newTotal, oldTotal, description } = data;
    if (!this.orderDoc?.product?.[index]) {
      console.error('Error: Invalid product index');
      return;
    }

    const uid = await this.authSrv.getUID();
    const productToUpdate = this.orderDoc.product[index];

    // Actualizar detalles del producto
    Object.assign(productToUpdate, {
      totales: newTotal,
      oldTotal: oldTotal,
      description: description,
      updatedBy: Date.now(),
      updatedByUid: uid
    });

    // Actualizar el resumen total del pedido
    const totalResumen = this.orderDoc.totalResumen;
    totalResumen.globalTotalToPayOld = totalResumen.globalTotalToPay;
    totalResumen.globalTotalToPay += newTotal - oldTotal;
    this.orderDoc.totales += newTotal - oldTotal;
    totalResumen.paidForPayment = 0;

  }



  savePayment() {
    console.log('savePayment', this.orderDoc)
  }



  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
