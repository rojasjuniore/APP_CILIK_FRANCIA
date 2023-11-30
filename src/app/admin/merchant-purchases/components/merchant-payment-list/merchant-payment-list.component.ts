import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InstallmentsService } from 'src/app/services/installments.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchant-payment-list',
  templateUrl: './merchant-payment-list.component.html',
  styleUrls: ['./merchant-payment-list.component.css']
})
export class MerchantPaymentListComponent implements OnInit {
  @Input() orderDoc: any;
  adviserPaymentList: any;
  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;
  indexPayment: any;

  constructor(
    private translate: TranslateService,
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService,
    private sweetAlert2Srv: Sweetalert2Service,
    private installmentsSrv: InstallmentsService) { }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    if (changes.orderDoc && changes.orderDoc.currentValue) {
      this.adviserPaymentList = this.orderDoc.adviserPaymentList
    }
  }

  ngOnInit(): void {
    this.adviserPaymentList = this.orderDoc.adviserPaymentList
    // console.log('app-installments-timeline-admin', this.adviserPaymentList);
    // console.log('app-installments-timeline-admin', this.installments);
  }

  /**
   * 
   * @param event 
   * @returns 
   */
  async onCloseModalUpdateVoucherStatus(event: any) {
    const { status, data } = event;
    if (!status) { return; }

    console.log('indexPayment', this.indexPayment);
    console.log('orderDoc', this.orderDoc);
    console.log('data', data);
    const uid = localStorage.getItem('uid');

    const adviserPaymentList = this.orderDoc.adviserPaymentList
    adviserPaymentList[this.indexPayment.index].status = data.status;
    adviserPaymentList[this.indexPayment.index].paymentMethod = 'bankTransfer';
    adviserPaymentList[this.indexPayment.index].payload = {
      ...this.indexPayment.payload, ...data,
      admin: uid
    };
    adviserPaymentList[this.indexPayment.index].payedAt = moment().valueOf();
    console.log('adviserPaymentList', adviserPaymentList);


    const user = await this.authSrv.getByUIDPromise(this.orderDoc.uid);
    console.log('userDoc', user);

    /** Almacenar orden de compra */
    await this.purchaseSrv
      .updatedPurchaseAdviser(environment.dataEvent.keyDb, this.orderDoc.orderId, adviserPaymentList);


    /** Actualizar estado de la orden de compra */
    await this.purchaseSrv.updatePurchase(environment.dataEvent.keyDb, this.orderDoc.orderId,
      {
        admin: uid,
        updatedAt: moment().valueOf(),
        rejectedAt: null,
        totalResumen: {
          ...this.orderDoc.totalResumen,
          paidForPayment: Number(this.orderDoc.totalResumen.paidForPayment) + Number(this.indexPayment.totales),
        }
      },
    );



    // /** Enviar notificación de compra realizada */
    await this.purchaseSrv.sendPurchaseAdviserPaymentNotification({
      status: data.status,
      email: user.email,
      orderId: this.orderDoc.orderId,
      uid: this.orderDoc.uid,
      name: user.name,
      index: Number(this.indexPayment.index) + 1,
      adviserPaymentList: adviserPaymentList,
    });

    this.sweetAlert2Srv.showBasicAlert(
      this.translate.instant("alert.purchaseMadeSatisfactorily"),
      'success'
    );
  }

  /**
   * 
   * @param item 
   * @returns 
   */
  validatePayment(item, index) {
    if (item.paymentMethod != 'bankTransfer') {
      return this.sweetAlert2Srv.showInfo('Solo se puede validar  con transferencia bancaria');
    }


    this.indexPayment = {
      ...item,
      index: index
    };
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
