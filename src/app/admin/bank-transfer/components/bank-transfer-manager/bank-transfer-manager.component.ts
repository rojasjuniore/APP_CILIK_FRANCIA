import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-transfer-manager',
  templateUrl: './bank-transfer-manager.component.html',
  styleUrls: ['./bank-transfer-manager.component.css'],
})
export class BankTransferManagerComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Title';
  @Input() query: any[] = [];
  @Input() opts: any = {};
  @Input() sort: string = '';
  @Input() redirectTo: string = `/pages/purchases/$/details`;
  @Input() fieldToRedirect: string = '_id';

  @ViewChild('modalUpdateVoucherStatus')
  modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;

  public orderId!: string;
  public orderDoc: any;
  private sub$!: Subscription;
  userObj: any;

  constructor(
    private router: ActivatedRoute,
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translateSrv: CustomTranslateService
  ) {
    const orderId = this.router.snapshot.paramMap.get('orderId');
    // console.log('orderId', orderId);
    this.orderId = orderId || '';
  }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$
      .pipe(
        switchMap((uid) =>
          this.purchaseSrv.getByEventAndId(
            environment.dataEvent.keyDb,
            this.orderId
          )
        ),
        map((order) => {
          return order ? { exist: true, ...order } : { exist: false };
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe(async (order) => {
        this.orderDoc = order;

        if (this.userObj) return;
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
    if (!status) {
      return;
    }

    // console.log('orderDoc', this.orderDoc);
    // return;

    let message = await this.translateSrv.translate('general.areUpdateVoucher');
    // console.log(message);

    let statusTranslate = await this.translateSrv.translate(
      `general.${data.status}`
    );

    const ask = await this.sweetAlert2Srv.askConfirm(
      `${message} "${statusTranslate}"?`
    );
    if (!ask) {
      return;
    }

    try {
      await this.spinner.show();

      const uid = await this.authSrv.getUIDPromise();

      // const timelineSnap = {
      //   ...data,
      //   path: this.orderDoc.voucher.path,
      //   name: this.orderDoc.voucher.name,
      //   url: this.orderDoc.voucher.url,
      //   type: this.orderDoc.voucher.type,
      //   reference: this.orderDoc.voucher.reference,
      //   updateBy: uid,
      //   updatedAt: moment().valueOf()
      // };
      // console.log('timelineSnap', timelineSnap);

      /** Actualizar lista de cambios del documento */
      // await this.purchaseSrv.addOnArray(
      //   environment.dataEvent.keyDb,
      //   this.orderId,
      //   [timelineSnap],
      //   'voucher.timeline'
      // );

      /** Actualizar estado de la orden de compra */
      await this.purchaseSrv.updatePurchase(
        environment.dataEvent.keyDb,
        this.orderId,
        {
          admin: uid,
          status: data.status,
          payedAt: data.status === 'completed' ? moment().valueOf() : null,
          'voucher.canEdit': data.status === 'rejected' ? true : false,
        }
      );

      let message = await this.translateSrv.translate(
        'general.properlyUpdatedVoucher'
      );
      // console.log(message);

      this.sweetAlert2Srv.showSuccess(`${message}`);
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
