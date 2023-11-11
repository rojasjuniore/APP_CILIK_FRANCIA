import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InstallmentsService } from 'src/app/services/installments.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-installments-timeline-admin',
  templateUrl: './installments-timeline-admin.component.html',
  styleUrls: ['./installments-timeline-admin.component.css']
})
export class InstallmentsTimelineAdminComponent implements OnInit, OnChanges {
  @Input() orderDoc: any;
  installments: any;
  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;
  indexPayment: any;

  constructor(
    private translate: TranslateService,
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService,
    private sweetAlert2Srv: Sweetalert2Service,
    private installmentsSrv: InstallmentsService,) { }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    if (changes.orderDoc && changes.orderDoc.currentValue) {
      this.installments = this.installmentsSrv.installmentsList(this.orderDoc.installments);
    }
  }

  ngOnInit(): void {
    this.installments = this.installmentsSrv.installmentsList(this.orderDoc.installments);
    // console.log('app-installments-timeline-admin', this.orderDoc);
    // console.log('app-installments-timeline-admin', this.installments);
  }

  /**
   * 
   * @param event 
   * @returns 
   */
  async onCloseModalUpdateVoucherStatus(event: any) {
    const { status, data } = event;
    console.log('onCloseModalUpdateVoucherStatus', event);
    if (!status) { return; }

    // console.log('indexPayment', this.indexPayment);
    // console.log('orderDoc', this.orderDoc);
    // console.log('data', data);

    const uid = localStorage.getItem('uid');

    const installments = this.orderDoc.installments
    installments[this.indexPayment.index].status = data.status;
    installments[this.indexPayment.index].paymentMethod = 'bankTransfer';
    installments[this.indexPayment.index].payload = {
      ...this.indexPayment.payload, ...data,
      admin: uid
    };
    installments[this.indexPayment.index].payedAt = moment().valueOf();
    console.log('installments', installments);
    const user = await this.authSrv.getByUIDPromise(this.orderDoc.uid);
    console.log('userDoc', user);

    // /** Almacenar orden de compra */

    await this.purchaseSrv
      .updatedPurchaseInstallment(environment.dataEvent.keyDb, this.orderDoc.orderId, installments);


    /** Actualizar estado de la orden de compra */
    await this.purchaseSrv.updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId,
      {
        admin: uid,
        status: "paymentProcess",
        updatedAt: moment().valueOf(),
        rejectedAt: null
      },
    );



    // /** Enviar notificación de compra realizada */
    await this.purchaseSrv.sendPurchaseInstallmentCuotaNotification({
      status: data.status,
      email: user.email,
      orderId: this.orderDoc.orderId,
      uid: this.orderDoc.uid,
      name: user.name,
      index: Number(this.indexPayment.index) + 1,
      installments: installments,
    });

    this.sweetAlert2Srv.showToast(
      this.translate.instant("alert.purchaseMadeSatisfactorily"),
      'success'
    );
  }

  /**
   * 
   * @param item 
   * @returns 
   */
  validatePayment(item) {
    if (item.paymentMethod != 'bankTransfer') {
      return this.sweetAlert2Srv.showInfo('Solo se puede validar  con transferencia bancaria');
    }


    this.indexPayment = item;
    console.log('item', item);

    return this.modalUpdateVoucherStatus.showModal();
  }

  /**
   * 
   * @param item 
   */
  gotoLink(item: any) {
    const url = item.payload.purchase.voucher.url;
    window.open(url, "_blank");
  }

}
