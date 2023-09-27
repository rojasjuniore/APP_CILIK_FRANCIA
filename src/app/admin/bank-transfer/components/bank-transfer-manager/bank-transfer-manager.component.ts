import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-transfer-manager',
  templateUrl: './bank-transfer-manager.component.html',
  styleUrls: ['./bank-transfer-manager.component.css']
})
export class BankTransferManagerComponent implements OnInit, OnDestroy {

  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;

  public orderId!: string;
  public orderDoc: any;

  private sub$!: Subscription;
  
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
        return (order) ? {exist: true, ...order} : {exist: false};
      }),
      catchError((err) => of({exist: false}))
    )
    .subscribe((order) => {
      this.orderDoc = order;
    });
  }

  openVoucherFileLink(){
    window.open(this.orderDoc.voucher.url, '_blank');
  }

  openModalUpdateVoucherStatus(){
    this.modalUpdateVoucherStatus.showModal();
  }

  async onCloseModalUpdateVoucherStatus(event: any){
    const {status, data} = event;
    console.log('onCloseModalUpdateVoucherStatus', event);
    if(!status){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm(`¿Estás seguro de actualizar el estado del comprobante a "${data.status}"?`);
    if(!ask){ return; }

    try {

      await this.spinner.show();

      const uid = await this.authSrv.getUIDPromise();

      const timelineSnap = {
        ...data,
        updateBy: uid,
        updatedAt: moment().valueOf()
      };
      // console.log('timelineSnap', timelineSnap);

      /** Actualizar lista de cambios del documento */
      await this.purchaseSrv.addOnArray(environment.dataEvent.keyDb, this.orderId, [timelineSnap], 'voucher.timeline');

      /** Actualizar estado de la orden de compra */
      await this.purchaseSrv.updatePurchase(
        environment.dataEvent.keyDb,
        this.orderId,
        {
          status: data.status,
          payedAt: (data.status === 'completed') ?  timelineSnap.updatedAt : null,
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
