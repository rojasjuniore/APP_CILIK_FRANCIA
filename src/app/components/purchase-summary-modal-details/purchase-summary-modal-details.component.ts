import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, Subscription, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';
import { HotelService } from 'src/app/services/hotel.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-purchase-summary-modal-details',
  templateUrl: './purchase-summary-modal-details.component.html',
  styleUrls: ['./purchase-summary-modal-details.component.css']
})
export class PurchaseSummaryModalDetailsComponent implements OnInit, OnDestroy {

  auth = localStorage.getItem('auth');

  public mi: any;
  public order: any;
  
  public adminPayments$!: Observable<boolean>;

  private sub$!: Subscription;

  constructor(
    private generatePdf: GeneratePdfService,
    private bsModalSrv: BsModalService,
    private router: Router,
    private hotelService: HotelService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
    private authSrv: AuthenticationService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
  ) { }

  ngOnInit(): void {
    this.buildModal();

    this.sub$ = this.router.events
    .subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){ this.closeModal(); }

    });

    // Porfa mano esta funcion al colocar hizo que varias cosa que habia colocado no se reflejara como por ejemplo el input donde se edita la observacion de un comprobante
    this.adminPayments$ = this.authSrv.userDoc$
    .pipe(
      map((user: any) => user?.roles || []),
      map((roles: any) => roles.includes('admin-payments'))
    );
  }

  async buildModal() {
    this.mi = this.bsModalSrv.buildModal('modalMyPurhcaseDetail');
  }

  get rooms() {
    const rooms = this.order?.rooms || [];
    return rooms.map((room: any, index: number) => Object.assign({}, room, { index: index + 1 }));
  }

  async showModal(order: any) {
    this.order = order;
    this.mi.show();
  }

  async share() {
    console.log('share');
  }

  async download() {
    let DATA: any = document.getElementById('modalMyPurhcaseDetail');
    let alldata: any = document.getElementById('alldata');
    DATA.style.overflow = 'inherit';
    DATA.style.maxHeight = 'inherit';


    console.log(DATA);
    console.log('download');


    this.generatePdf.downloadPdf(DATA, alldata);
  }

  closeModal() {
    this.mi.hide();
  }

  async completedOrder(order: any){
    try {

      const ask = await this.sweetAlert2Srv.askConfirm('formValidations.ConfirmPaymentInfo');
      if(!ask) { return; }

      // console.log('confirm', order);

      await this.spinner.show();

      /**
       * 1. Cambiar el estado de la orden a 'completed'
       * 2. TODO: enviar email de notificación de orden de compra completada
       */
      await Promise.all([
        this.hotelService.updateOrder(order.orderId, { 
          status: 'completed',
          completed: true,
          payed: true
        }),
        this.purchaseSrv.sendPurchaseTransferApprovedNotification(order.orderId)
      ]);

      let message = this.translatePipe.transform('formValidations.dataSave');
      this.sweetAlert2Srv.showInfo(message);
      this.mi.hide();
      
    } catch (err) {
      console.log('Error on PurchaseSummaryModalDetailsComponent.completedOrder', err);
      return;
    }finally{
      this.spinner.hide();
    }

  }

  async cancelOrder(order: any){
    try {

      const ask = await this.sweetAlert2Srv.askConfirm('formValidations.RejectPaymentInfo');
      if(!ask) { return; }

      // console.log('cancelOrder', order);

      await this.spinner.show();

      /**
       * 1. Cambiar el estado de la orden a 'rejected'
       * 2. Cambiar el estado de la habitacion a 'available'
       * 3. TODO: enviar email de notificación de orden de compra rechazada
       */
      await Promise.all([
        this.hotelService.updateOrder(order.orderId, { status: 'rejected' }),
        this.hotelService.restoreRoomsOnReject(order.orderId),
        this.purchaseSrv.sendPurchaseTransferRejectedNotification(order.orderId)
      ]);

      let message = this.translatePipe.transform('formValidations.dataSave');
      this.sweetAlert2Srv.showInfo(message);
      this.mi.hide();
      
    } catch (err) {
      console.log('Error on PurchaseSummaryModalDetailsComponent.cancelOrder', err);
      return;
    }finally{
      this.spinner.hide();
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
