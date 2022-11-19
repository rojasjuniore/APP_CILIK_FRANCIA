import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PreSaleModalBankTransferDetailComponent } from 'src/app/components/pre-sale-modal-bank-transfer-detail/pre-sale-modal-bank-transfer-detail.component';
import { HotelService } from 'src/app/services/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-only-categories-installments-pay-couta',
  templateUrl: './pre-sale-only-categories-installments-pay-couta.component.html',
  styleUrls: ['./pre-sale-only-categories-installments-pay-couta.component.css']
})
export class PreSaleOnlyCategoriesInstallmentsPayCoutaComponent implements OnInit {
  
  @ViewChild(PreSaleModalBankTransferDetailComponent) modalBackTransfer!: PreSaleModalBankTransferDetailComponent;

  public preSaleDocument: any;
  public coutaToPay: number = 0;
  public paymentMethodType: any;
  public paymentMethods = [
    // {
    //   label: 'paymentMethods.transfer',
    //   value: 'transfer',
    //   icon: 'bi bi-bank',
    //   status: true,
    // },
    {
      label: 'paymentMethods.paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    },
    // {
    //   label: 'paymentMethods.creditCard',
    //   value: 'creditCard',
    //   icon: 'bi bi-credit-card',
    //   status: false,
    // },
    // {
    //   label: 'paymentMethods.crypto',
    //   value: 'crypto',
    //   icon: 'bi bi-coin',
    //   status: false,
    // },
  ];
  public formStatus = 1;
  loading = false;

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private hotelSrv: HotelService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) {
    this.preSaleDocument = this.preSaleSrv.getDocumentLocalStorage();
  }

  ngOnInit(): void {
  }

  get currentCoutaToPay(){
    return this.preSaleDocument.installments[0];
  }

  selectPaymentMethod(item: any){
    this.paymentMethodType = item.value;
    if(this.paymentMethodType === 'transfer'){
      this.modalBackTransfer.showModal();
    }
    this.preSaleDocument.installments[0].paymentMethod = item.value === 'transfer' ? 'bankTransfer' : item.value;
    this.preSaleSrv.updateDocumentLocalStorage({installments: this.preSaleDocument.installments});
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/installments-details'});
    this.router.navigate(['/pre-sale/installments-details']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

  async onPaypalResponse(params: any){
    const { type, data } = params;
    console.log({type, data});

    switch (type) {
      case 'cancel':
        console.log('Cancelado', data);
        break;
      case 'error':
        console.log('Error', data);
        break;
    
      default:
        return this.saveDocument(data);
    }
  }

  async processRoomData(params: any){
    const { room, orderId } = params;

    /** Buscar habitación */
    const findRoom = await this.hotelSrv.getAvailableRoomByCodeType(room.roomCodePrefix);
    // console.log('room', room);
    // console.log('findRoom', findRoom);
    // return;

    /** Asignar orden de compra a la habitación */
    await this.hotelSrv.updateRoom(findRoom._id, { paymentOrderID: orderId, additionals: room.additionals, roomType: room.roomCode });

    /** TODO: actualizar contador de habitaciónes disponibles por tipo */

    /** Actualizar registro de habitación */
    const roomData = Object.assign({}, room, {roomId: findRoom._id});

    return roomData;
  }

  async crearteOrderBankTransfer(status: any){
    if(!status){ return; }

    try {
      this.loading = true;
  
      await this.preSaleSrv.completePreSaleOrder('pago por transferencia', {
        completed: false,
        payed: false,
        status: 'pending',
      });
  
      const message = this.translatePipe.transform('general.successfulTransaction');
      this.sweetAlert2Srv.showInfo(message);
      this.router.navigateByUrl('pages/dashboard');
      return;
      
    } catch (err) {
      console.log('Error on PreSaleOnlyCategoriesInstallmentsPayCoutaComponent.crearteOrderBankTransfer()', err);
      return;
    }finally{
      this.loading = false;
    }

    // console.log(this.preSaleSrv.getDocumentLocalStorage())
    // if(status){
    //   this.loading = true;
    //   await this.preSaleSrv.completePreSaleOrder('pago por transferencia');
    //   let message = this.translatePipe.transform('general.successfulTransaction');
    //   this.sweetAlert2Srv.showInfo(message);
    //   this.router.navigateByUrl('pages/dashboard');
    //   this.loading = false;
    // }
  }


  async saveDocument(metadata: any){
    try {
      await this.spinner.show();

      const url = `/purchase/summary/${this.preSaleDocument.orderId}/details`;

      const coutaPayed = Object.assign({}, this.currentCoutaToPay, { metadata, payed: true, payedAt: moment().valueOf()});

      this.preSaleDocument.installments[0] = coutaPayed;

      /**
       * Administrar habitaciones
       */
      const roomsToParse = await Promise.all(
        this.preSaleDocument.rooms
        .map((row: any, index: number) => Object.assign({index}, row))
        .map(async (room: any) => this.processRoomData({room, orderId: this.preSaleDocument.orderId}))
      );
      const rooms = roomsToParse.sort((a: any, b: any) => a.index - b.index);

      const data = Object.assign({}, this.preSaleDocument, { 
        installmentsPayed: 1,
        step: url,
        rooms,
      });

      /** Actualizar orden de compra en local */
      this.preSaleSrv.updateDocumentLocalStorage(data);

      /** Store Document */
      await this.purchaseSrv.storePurchase(data.orderId, data);

      /** Send Mail Summary */
      await this.purchaseSrv.sendPurchaseSummaryNotification(data.uid, data.orderId);

      this.preSaleSrv.removeDocumentLocalStorage();

      // console.log('save document', metadata);

      this.router.navigate([url]);
      return;

    } catch (err) {
      console.log('Error on PreSaleInstallmentsPayCoutaComponent.saveDocument', err);
      return;
    }finally{
      await this.spinner.hide();
    }
  }
}

