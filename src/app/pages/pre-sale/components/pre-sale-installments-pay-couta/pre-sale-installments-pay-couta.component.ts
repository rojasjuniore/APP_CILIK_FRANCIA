import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotelService } from 'src/app/services/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-pre-sale-installments-pay-couta',
  templateUrl: './pre-sale-installments-pay-couta.component.html',
  styleUrls: ['./pre-sale-installments-pay-couta.component.css']
})
export class PreSaleInstallmentsPayCoutaComponent implements OnInit {

  public preSaleDocument: any;
  public coutaToPay: number = 0;
  public paymentMethodType: any;
  public paymentMethods = [
    {
      label: 'Tarjeta de crédito',
      value: 'creditCard',
      icon: 'bi bi-credit-card',
      status: false,
    },
    {
      label: 'Criptomonedas',
      value: 'crypto',
      icon: 'bi bi-coin',
      status: false,
    },
    {
      label: 'Paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    }
  ];
  public formStatus = 1;

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private hotelSrv: HotelService,
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
    // console.log('item', item);
    this.preSaleDocument.installments[0].paymentMethod = item.value;
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

    const findRoom = await this.hotelSrv.getAvailableRoomByCodeType(room._id);

    /** Asignar orden de compra a la habitación */
    await this.hotelSrv.updateRoom(findRoom._id, { paymentOrderID: orderId, additionals: room.additionals });

    /** Actualizar registro de habitación */
    const roomData = Object.assign({}, room, {roomId: findRoom._id, roomCodeType: room._id});

    return roomData;
  }


  async saveDocument(metadata: any){
    try {
      await this.spinner.show();

      const url = `/purchase/summary/${this.preSaleDocument.orderId}/details`;

      const coutaPayed = Object.assign({}, this.currentCoutaToPay, { metadata, payed: true});

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
