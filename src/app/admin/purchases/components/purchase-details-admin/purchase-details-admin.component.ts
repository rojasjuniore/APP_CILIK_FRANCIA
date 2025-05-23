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
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-details-admin',
  templateUrl: './purchase-details-admin.component.html',
  styleUrls: ['./purchase-details-admin.component.css']
})
export class PurchaseDetailsAdminComponent implements OnInit {

  public orderId!: string;
  public orderDoc: any;
  public showUpdateVoucherForm = false;
  private sub$!: Subscription;
  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;


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
    // console.log('app-purchase-details', orderId);
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
        console.log('order', order);
        return
      });
  }


  openModalUpdateVoucherStatus() {
    this.modalUpdateVoucherStatus.showModal();
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

  onRenderUpdateVoucher(event: any) {
    console.log('event', event);
    this.showUpdateVoucherForm = true;
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


  async onCloseModalUpdateVoucherStatus(event: any) {
    const { status, data } = event;
    console.log('onCloseModalUpdateVoucherStatus', event);
    if (!status) { return; }

    // console.log('orderDoc', this.orderDoc);
    // return;

    const ask = await this.sweetAlert2Srv.askConfirm(`¿Estás seguro de actualizar el estado del comprobante a "${data.status}"?`);
    if (!ask) { return; }

    try {

      await this.spinner.show();

      const uid = await this.authSrv.getUIDPromise();

      /** Actualizar estado de la orden de compra */
      await this.purchaseSrv.updatePurchase(
        environment.dataEvent.keyDb,
        this.orderId,
        {
          admin: uid,
          status: data.status,
          payedAt: moment().valueOf(),
          updatedAt: moment().valueOf()
        }
      );

      this.sweetAlert2Srv.showSuccess('Comprobante actualizado correctamente');
      return;

    } catch (err) {
      console.log('Error on onCloseModalUpdateVoucherStatus', err);
      return;
    } finally {
      this.spinner.hide();
    }

  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
