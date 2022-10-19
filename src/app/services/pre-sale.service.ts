import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import moment from 'moment';
import { distinctUntilChanged, from, interval, map, switchMap } from 'rxjs';
import { DataService } from './data.service';
import { HotelService } from './hotel.service';
import { PurchaseService } from './purchase.service';
import { Sweetalert2Service } from './sweetalert2.service';

@Injectable({
  providedIn: 'root'
})
export class PreSaleService {

  public packageCompleto= {
    numero_personas:0,
    categoria:"",
    una_persona :{
      habitaciones:0,
      camas:[]
    },
    dos_personas:{
      habitaciones:0,
      camas:[]
    },
    tres_personas:{
      habitaciones:0,
      camas:[]
    },
    categoria_solista:0,
    categoria_parejas:0,
    categorias_grupos:0
  };

  public DOCUMENT_KEY = "preSaleDocument";

  public coutasList = [
    {"from": "2022/09/10", "to": "2022/09/30"},
    {"from": "2022/10/01", "to": "2022/10/31"},
    {"from": "2022/11/01", "to": "2022/12/15"},
    {"from": "2022/12/16", "to": "2023/01/10"}
  ];

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private dataSrv: DataService,
    private sweetAlert2Srv: Sweetalert2Service,
    private purchaseSrv: PurchaseService,
    private hotelSrv: HotelService,
  ) { }

  generateDocId(){ return this.afs.createId(); }

  buildOrderDocument(params: any = {}){
    const currentDate = moment();
    return {
      orderId: this.generateDocId(),
      uid: window.localStorage.getItem('uid'),
      nroParticipants: params.nroParticipants || 0,
      nroEscorts: params.nroEscorts || 0,
      rooms: params.rooms || [],
      additionalCategoryPasses: [],
      paymentMethodType: params.paymentMethodType || null,
      installments: params.installments || [],
      installmentsPayed: 0,
      step: params.step || 1,
      completed: params.completed || false,
      payed: false,
      createdAt: currentDate.valueOf(),
      groupDiscount: 0,
      expiredAt: currentDate.add(30, 'minutes').valueOf(),
      orderType: params.orderType || 'fullPass', // 'fullPass' | 'categoryPass'
      setup: params.setup || null, // 'manual' | 'automatic'
    };
  }

  storeDocumentonLocalStorage(data: any){
    window.localStorage.setItem(this.DOCUMENT_KEY, JSON.stringify(data));
  }

  buildAndStore(params: any = {}, override: boolean = false){
    const find = this.getDocumentLocalStorage();

    if(Object.keys(find).length == 0 || override){
      const document = this.buildOrderDocument(params);
      // console.log(document)
      this.storeDocumentonLocalStorage(document);
    }
  }

  checkAndLoadDocumentLocalStorage(){
    let document = this.getDocumentLocalStorage();

    if(Object.keys(document).length == 0){
      this.buildAndStore({nroParticipants: 0});
      document = this.getDocumentLocalStorage();
    }

    return document;
  }

  getDocumentLocalStorage(){
    const document = window.localStorage.getItem('preSaleDocument');
    return JSON.parse(document || '{}');
  }

  /**
   * Obtener documento de pre orden de reserva desde el 
   * local storage como un observable
   * @returns 
   */
  getDocumentLocalStorageObservable(){
    return interval(1000)
      .pipe(
        switchMap( async() => this.getDocumentLocalStorage()),
        map( () => {
          const document = window.localStorage.getItem('preSaleDocument');
          return JSON.parse(document || '{}');
        }),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      );
  }

  updateDocumentLocalStorage(data: any){
    const document = this.getDocumentLocalStorage();
    const updatedDocument = { ...document, ...data };
    this.storeDocumentonLocalStorage(updatedDocument);
  }

  async cancelOrder(){
    const ask = await this.sweetAlert2Srv.askConfirm('¿Está seguro que desea cancelar la Transaccion?');
    if(!ask) { return; }
    //this.router.navigate(['pre-sale', 'step1']);

    window.localStorage.removeItem(this.DOCUMENT_KEY);
    // window.localStorage.removeItem('preSaleDoc');
    // window.localStorage.removeItem('package');
    // window.localStorage.clear();
    // localStorage.setItem('package', JSON.stringify(this.packageCompleto));
    // window.location.href = '/pre-sale/step1';

  }
 
  async nextStep(step: string){
    this.router.navigate(['pre-sale', step]);
  }

  /**
   * 
   * @returns 
   */
  getCuotas(){
    const currentDate = moment();
    return this.coutasList.map((row) => {
      const to = moment(row.to, 'YYYY/MM/DD').endOf('day');
      const isBetween = currentDate.isBefore(to);
      return (isBetween) ? row : null;
    })
    .filter((row) => row);
  }

  async processRoomData(room: any, orderId: string){
    /** Buscar habitación */
    const findRoom = await this.hotelSrv.getAvailableRoomByCodeType(room.roomCodePrefix);
    // console.log('room', room);
    // console.log('findRoom', findRoom);
    // return;

    /** Asignar orden de compra a la habitación */
    await this.hotelSrv.updateRoom(findRoom._id, { paymentOrderID: orderId, additionals: room.additionals, roomType: room.roomCode });

    /** TODO: actualizar contador de habitaciónes disponibles por tipo */
    await this.hotelSrv.updateRoomStockSupplyCounter(room.roomCodePrefix, -1);

    /** Actualizar registro de habitación */
    const roomData = Object.assign({}, room, {roomId: findRoom._id});

    return roomData;
  }

  /** TODO: pendiente por revisar */
  async processRoomData2(roomIdx: any, orderId: string, scope: any[] = []){

    if(roomIdx >= scope.length){
      return scope;
    }

    const room = scope[roomIdx];
    // console.log('room', room);

    /** Buscar habitación */
    const findRoom = await this.hotelSrv.getAvailableRoomByCodeType(room.roomCodePrefix);
    // console.log('findRoom', findRoom);

    /** Asignar orden de compra a la habitación */
    await this.hotelSrv.updateRoom(findRoom._id, { paymentOrderID: orderId, additionals: room.additionals, roomType: room.roomCode });

    /** TODO: actualizar contador de habitaciónes disponibles por tipo */
    await this.hotelSrv.updateRoomStockSupplyCounter(room.roomCodePrefix, -1);

    /** Actualizar registro de habitación */
    const roomData = Object.assign({}, room, {roomId: findRoom._id});

    scope[roomIdx] = roomData;

    return this.processRoomData2(++roomIdx, orderId, scope);
  }



  async completePreSaleOrder(metadata: any, params: any = {}){
    const preSaleDocument = this.getDocumentLocalStorage();

    const {
      payed = true,
      completed = true,
      status = 'completed',
    } = params;

    const url = `/purchase/summary/${preSaleDocument.orderId}/details`;

    /**
     * - Buscar habitaciones disponibles
     * - Asignar habitaciones en la orden
     */
    // const roomsToParse = await Promise.all(
    //   preSaleDocument.rooms.map(
    //     async (row: any, index: number) => this.processRoomData(Object.assign({index}, row), preSaleDocument.orderId)
    //     )
    // );

    const tempRooms = preSaleDocument.rooms.map((row: any, index: number) => Object.assign({index}, row));
    const roomsToParse = await this.processRoomData2(0, preSaleDocument.orderId, tempRooms);

    const rooms = roomsToParse.sort((a: any, b: any) => a.index - b.index);

    const document = Object.assign({}, preSaleDocument, {
      step: url,
      payed,
      completed,
      status,
      rooms,
    });

    // console.log('order', document);
    // return;

    /** Store Document */
    await this.purchaseSrv.storePurchase(document.orderId,document);

    /** Send Mail Summary */
    await this.purchaseSrv.sendPurchaseSummaryNotification(document.uid, document.orderId);

    if(preSaleDocument.paymentMethodType === 'bankTransfer'){
      await this.purchaseSrv.sendPurchaseTransferNotification(document.orderId);
    }

    this.removeDocumentLocalStorage();

    return url;
  }

  removeDocumentLocalStorage(){
    window.localStorage.removeItem(this.DOCUMENT_KEY);
  }


  /**
   * Obtener precio full de las habitaciones
   * @returns 
   */
  getRoomsAmountFullPrice(){
    const document = this.getDocumentLocalStorage();
    const rooms = document.rooms || [];
    return rooms.reduce((acc, row) => acc + row.fullPrice, 0);
  }

  /**
   * Obtener precio de las habitaciones
   * @returns 
   */
  getRoomsAmount(){
    const document = this.getDocumentLocalStorage();
    const rooms = document.rooms || [];
    const total = rooms.reduce((acc, row) => acc + row.price, 0);
    return total;
  }

  /**
   * Obtener nro de participantes a través de las habitaciones
   * @returns 
   */
  getNroParticipantsByRooms(){
    const document = this.getDocumentLocalStorage();
    const rooms = document.rooms || [];
    return rooms
      .map((row) => row.capacity)
      .reduce((acc, row) => acc + row.price, 0);
  }

  /**
   * Obtener precio full de las noches adicionales
   * @returns 
   */
  getAdditionalDaysAmountFullPrice(){
    const document = this.getDocumentLocalStorage();
    const additionalDays = document?.rooms || []
    return additionalDays.map((row) => row.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.fullPrice).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Obtener precio de las noches adicionales
   * @returns 
   */
  getAdditionalDaysAmount(){
    const document = this.getDocumentLocalStorage();
    const additionalDays = document?.rooms || []
    return additionalDays.map((row) => row.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Obtener precio full de las categorias adicionales
   * @returns 
   */
  getAdditionalCategoryPassesAmountFullPrice(){
    const document = this.getDocumentLocalStorage();
    const { additionalCategoryPasses = [] } = document;

    return additionalCategoryPasses
      .map((row) => {
        if(row.type == 'group'){
          return row.data.map((group) => group.quantity * group.fullPrice)
            .reduce((prev, curr) => prev + curr, 0)

        }else{
          return row.quantity * row.fullPrice;
        }
      })
      .reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Obtener precio de las categorias adicionales
   * @returns 
   */
  getAdditionalCategoryPassesAmount(){
    const document = this.getDocumentLocalStorage();
    const { additionalCategoryPasses = [] } = document;

    return additionalCategoryPasses
      .map((row) => {
        if(row.type == 'group'){
          return row.data.map((group) => group.quantity * group.price)
            .reduce((prev, curr) => prev + curr, 0)

        }else{
          return row.quantity * row.price;
        }
      })
      .reduce((prev, curr) => prev + curr, 0);
  }

  getSubTotalFullPrice(){
    const roomsFull = this.getRoomsAmountFullPrice();
    const additionalDaysFull = this.getAdditionalDaysAmountFullPrice();
    const additionalCategoryPassesFull = this.getAdditionalCategoryPassesAmountFullPrice();
    return [
      roomsFull,
      additionalDaysFull,
      additionalCategoryPassesFull,
    ].reduce((prev, curr) => prev + curr, 0);
  }

  getSubTotal(){
    const rooms = this.getRoomsAmount();
    const additionalDays = this.getAdditionalDaysAmount();
    const additionalCategoryPasses = this.getAdditionalCategoryPassesAmount();
    return [
      rooms,
      additionalDays,
      additionalCategoryPasses,
    ].reduce((prev, curr) => prev + curr, 0);
  }



  getGroupDiscountPercentaje(){
    const nroParticipants = this.getNroParticipantsByRooms();

    if(nroParticipants >= 20){
      return 0.10;
    }else if(nroParticipants >= 10){
      return 0.05;
    }else return 0;
  }

  getGroupDiscountAmount(subTotal: number){
    const discount = this.getGroupDiscountPercentaje();
    return subTotal * discount;
  }
}
