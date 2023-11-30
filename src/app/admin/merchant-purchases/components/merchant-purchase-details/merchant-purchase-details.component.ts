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


  /// Actualizar el monto de un producto
  async onEditAmount(response) {
    const { status, data } = response;
    if (!status) {
      console.error('Error: No status in response');
      return;
    }
    const { index, newTotal, oldTotal, description } = data;
    if (!this.orderDoc?.product?.[index]) {
      console.error('Error: Invalid product index');
      return;
    }

    const uid = this.authSrv.getLocalUID();
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
    totalResumen.paidForPayment = 0;


    this.orderDoc.totales += newTotal - oldTotal;
    this.orderDoc.status = 'preApproved';
    this.orderDoc.updatedBy = Date.now();
    this.orderDoc.updatedByUid = uid;


    console.log('this.orderDoc', this.orderId, this.orderDoc);

    this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, this.orderId, this.orderDoc)

    this.sweetAlert2Srv.showBasicAlert('Success', 'The amount has been updated successfully');

  }




  async savePayment() {
    const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to save this payment?`);
    if (!ask) { return; }

    console.log('savePayment', this.orderDoc)
  }



  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
