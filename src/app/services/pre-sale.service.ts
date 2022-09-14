import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import moment from 'moment';
import { distinctUntilChanged, from, interval, map, switchMap } from 'rxjs';
import { DataService } from './data.service';
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
      expiredAt: currentDate.add(30, 'minutes').valueOf(),
    };
  }

  storeDocumentonLocalStorage(data: any){
    window.localStorage.setItem(this.DOCUMENT_KEY, JSON.stringify(data));
  }

  buildAndStore(params: any = {}, override: boolean = false){
    const find = this.getDocumentLocalStorage();

    if(Object.keys(find).length == 0 || override){
      const document = this.buildOrderDocument(params);
      this.storeDocumentonLocalStorage(document);
    }
  }

  checkAndLoadDocumentLocalStorage(){
    let document = this.getDocumentLocalStorage();

    if(Object.keys(document).length == 0){
      this.buildAndStore({nroParticipants: 1});
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

  async completePreSaleOrder(metadata: any){
    const preSaleDocument = this.getDocumentLocalStorage();

    const url = `/purchase/summary/${preSaleDocument.orderId}/details`;

    const document = Object.assign({}, preSaleDocument, {
      metadata,
      step: url,
      payed: true,
      completed: true,
    });

    /** Store Document */
    await this.purchaseSrv.storePurchase(document.orderId,document);

    /** Send Mail Summary */
    await this.purchaseSrv.sendPurchaseSummaryNotification(document.uid, document.orderId);

    this.removeDocumentLocalStorage();

    return url;

  }

  removeDocumentLocalStorage(){
    window.localStorage.removeItem(this.DOCUMENT_KEY);
  }
}
