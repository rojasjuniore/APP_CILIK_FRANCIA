import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, switchMap, map, catchError, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-installments-view-admin',
  templateUrl: './installments-view-admin.component.html',
  styleUrls: ['./installments-view-admin.component.css']
})
export class InstallmentsViewAdminComponent implements OnInit {

  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;

  public orderId!: string;
  public orderDoc: any;

  private sub$!: Subscription;
  userObj: any;
  installments: any;
  constructor(
    private router: ActivatedRoute,
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service
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
          return (order) ? { exist: true, ...order } : { exist: false };
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe(async (order) => {
        this.orderDoc = order;
        console.log('orderDoc', this.orderDoc);

        if (this.userObj) return
        this.userObj = await this.authSrv.getByUIDPromise(this.orderDoc.uid);
        console.log('userDoc', this.userObj);
      });
  }

  openVoucherFileLink() {
    window.open(this.orderDoc.voucher.url, '_blank');
  }

  openModalUpdateVoucherStatus() {
    this.modalUpdateVoucherStatus.showModal();
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

      // const timelineSnap = {
      //   ...data,
      //   // path: this.orderDoc.voucher.path,
      //   // name: this.orderDoc.voucher.name,
      //   // url: this.orderDoc.voucher.url,
      //   // type: this.orderDoc.voucher.type,
      //   // reference: this.orderDoc.voucher.reference,
      //   updateBy: uid,
      //   updatedAt: moment().valueOf()
      // };
      // // console.log('timelineSnap', timelineSnap);

      // /** Actualizar lista de cambios del documento */
      // await this.purchaseSrv.addOnArray(
      //   environment.dataEvent.keyDb,
      //   this.orderId,
      //   [timelineSnap],
      //   'voucher.timeline'
      // );

      let status = data.status;
      let payedAt: any = null;
      let rejectedAt: any = null;

      const allCompleted = this.orderDoc.installments.every(transaccion => transaccion.status === "completed");
      if (status == 'completed' && allCompleted) {
        status = 'completed';
        payedAt = moment().valueOf();
      } else {
        this.sweetAlert2Srv.showError('No se puede completar la orden de compra, aún hay cuotas pendientes de pago');
        status = 'pending';
        rejectedAt = moment().valueOf();
      }


      /** Actualizar estado de la orden de compra */
      await this.purchaseSrv.updatePurchase(
        environment.dataEvent.keyDb,
        this.orderId,
        {
          status,
          payedAt,
          rejectedAt
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
