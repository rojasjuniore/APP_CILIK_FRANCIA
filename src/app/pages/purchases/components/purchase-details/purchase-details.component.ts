import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit, OnDestroy {

  public orderId!: string;
  public orderDoc: any;

  public showUpdateVoucherForm = false;
  private sub$!: Subscription;

  constructor(
    private _clipboardService: ClipboardService,
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
    console.log('PurchaseDetailsComponent', orderId);
    this.orderId = orderId || '';
  }


  async ngOnInit(): Promise<void> {
    this.sub$ = this.authSrv.uid$
      .pipe(
        switchMap((uid) => this.purchaseSrv.getByEventAndId(environment.dataEvent.keyDb, this.orderId)),
        map((order) => {
          return (order) ? { exist: true, ...order } : { exist: false };
        }),
        map((order: any) => {
          if(!order.exist){ return order; }

          return {
            ...order,
            product: order.product.map((product: any, index: number) => ({...product, _index: index + 1}))
          }
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe(async (order: any) => {
        const uid = await this.authSrv.getUIDPromise();
        if (uid != order.uid) {
          return this.route.navigate([`/pages/dashboard`]);
        }
        this.orderDoc = order;
        const valueTotalResumen = order.totalResumen;
        if (this.orderDoc.status !== 'completed') {
          await this.purchaseSrv.updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId,
            {
              status: (valueTotalResumen?.globalTotalToPay - valueTotalResumen?.paidForPayment == 0 ? 'completed' : 'pendingApproval')
            },
          );
        }


        console.log('order test Jorge', this.orderDoc);
        return
      });
  }


  


  onRenderUpdateVoucher(event: any) {
    // console.log('event', event);
    this.showUpdateVoucherForm = true;
  }



  async onLoadAdviser(data: any) {
    console.log('onLoadAdviser', data);
    this.ngOnInit();
  }

  async onLoadVoucher(formData: any) {
    try {
      const ask = await this.sweetAlert2Srv.askConfirm(
        this.translate.instant("alert.confirmAction")
      );
      if (!ask) { return; }

      await this.spinner.show();

      console.log('formData', formData);
      console.log('order', this.orderDoc);

      const { bankTransferFile: file, reference } = formData;

      const uploadAt = moment().valueOf();

      /** Construir nombre del archivo */
      const fileName = `${this.orderDoc.orderId}_${file.name}_${uploadAt}`;

      /** Crear Referencia al documento */
      const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${this.orderDoc.orderId}/${fileName}`;

      /** Cargar archivo ene l bucket */
      const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

      /** Construir objeto con valores a actualizar */
      const purchase = {
        voucher: {
          reference: reference,
          name: file.name,
          type: file.type,
          size: file.size,
          path: urlToSaveFile,
          url: fileRef,
          timeline: [],
          uploadAt: uploadAt,
          canEdit: false,
        },
      };

      /** Actualizar orden de compra */
      await this.purchaseSrv.updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId, purchase);
      return;

    } catch (err) {
      console.log('Error on PurchaseDetailsComponent.onLoadVoucher', err);
      return;

    } finally {
      this.spinner.hide();
    }
  }


  async onUpdateVoucher(formData: any) {
    try {
      const ask = await this.sweetAlert2Srv.askConfirm(
        this.translate.instant("alert.confirmAction")
      );
      if (!ask) { return; }

      await this.spinner.show();

      console.log('formData', formData);
      console.log('order', this.orderDoc);

      const { bankTransferFile: file, reference } = formData;

      const uploadAt = moment().valueOf();

      /** Construir nombre del archivo */
      const fileName = `${this.orderDoc.orderId}_${file.name}_${uploadAt}`;

      /** Crear Referencia al documento */
      const urlToSaveFile = `purchases/${environment.dataEvent.keyDb}/${this.orderDoc.orderId}/${fileName}`;

      /** Cargar archivo ene l bucket */
      const fileRef = await this.uploadFileSrv.uploadFileDocumentIntoRoute(urlToSaveFile, file);

      /** Construir objeto con valores a actualizar */
      const purchase = {
        "voucher.reference": reference,
        "voucher.name": file.name,
        "voucher.type": file.type,
        "voucher.size": file.size,
        "voucher.path": urlToSaveFile,
        "voucher.url": fileRef,
        "voucher.uploadAt": uploadAt,
        "voucher.canEdit": false,
        status: 'pending'
      };

      /** Actualizar orden de compra */
      await this.purchaseSrv.updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId, purchase);

      this.showUpdateVoucherForm = false;
      console.log('voucher updated');
      return;

    } catch (err) {
      console.log('Error on PurchaseDetailsComponent.onUpdateVoucher', err);
      return;

    } finally {
      this.spinner.hide();
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  copy() {
    this._clipboardService.copy(this.orderId);
    this.sweetAlert2Srv.showSuccess('Copied to clipboard');
    return
  }

}
