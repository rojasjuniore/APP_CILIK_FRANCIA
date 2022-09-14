import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { distinctUntilChanged, interval, lastValueFrom, map, Observable, pluck, Subject } from 'rxjs';

import { environment } from "src/environments/environment";
import { generateHashSHA256 } from '../helpers/hashGeneratorSHA256';
import { handlerArrayResult } from '../helpers/model.helper';

const URL_ROOT = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public MAX_BUY_TICKETS = 3;
  public MAX_BUY_EVENTS_TICKETS = 10;

  private modalId = 'modalTicketDetails';
  public modalTicketDetails: any;

  public ticketData$ = new Subject();
  public txHash$ = new Subject();

  public checkTicketData$!: Observable<any>;
  public checkTxHash$!: Observable<any>;
  public fullData$!: Observable<any>;


  constructor(
    private _http: HttpClient,
    private afs: AngularFirestore,
  ) {
    /** Cargar observables */
    this.buildObservables();
  }


  /**
   * Cargar funcionalidades de observables
   */
  buildObservables(){

    /** Obtener información del ticket del localStorage */
    this.checkTicketData$ = interval(1000).pipe(
      map((timer) => {
        const data = this.getTicketData();
        return data;
      }),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
    );

    /** Obtener txHash del ticket */
    this.checkTxHash$ = interval(1000).pipe(
      map((timer) => {
        const data = this.getTxHash();
        return data;
      })
    );

  }


  /**
   * Segmentar monto a renderizar en decimales y valores a partir de la coma
   * @param amount 
   * @returns 
   */
  amountToRender(amount){
    const toParse = parseFloat(`${amount}`).toFixed(2);
    const toArray = toParse.split('.');

    return {
      base: amount,
      amount: toArray[0],
      decimals: toArray[1] || '00',
    }
  }


  /**
   * Registrar valor en el localStorage con su respectivo txHash
   * @param params
   * @param params.data
   * @param params.chain
   * @param params.field
   * @param params.txHashField
   * @returns 
   */
  async storeTicketDataOnLocalStorage(params: any = {}){
    const {
      data = {},
      chain = [],
      field = 'ticketData',
      txHashField = 'txHash'
    } = params;

    const txHash = await this.generateHash(chain);

    window.localStorage.setItem(field, JSON.stringify(data));
    window.localStorage.setItem(txHashField, txHash);
    return;
  }


  /**
   * Actualizar valor en el localStorage con su respectivo txHash
   * @param params
   * @param params.data
   * @param params.chain
   * @param params.field
   * @param params.txHashField
   * @returns 
   */
  async updateTicketDataOnLocalStorage(params: any = {}){
    const {
      data = {},
      chain = [],
      field = 'ticketData',
      txHashField = 'txHash'
    } = params;

    const toParse = window.localStorage.getItem(field);

    const fromLocalStorage = (toParse) ? JSON.parse(toParse) : {};

    const newData = Object.assign({}, fromLocalStorage, data);

    const txHash = await this.generateHash(chain);

    window.localStorage.setItem(field, JSON.stringify(newData));
    window.localStorage.setItem(txHashField, txHash);
    return;
  }


  /**
   * Obtener información de ticket seleccionado
   * @returns 
   */
  getTicketData(){
    const ticketDataString = window.localStorage.getItem('ticketData');
    return (ticketDataString) ? JSON.parse(ticketDataString) : null;
  }


  /**
   * Obtener txHash del ticket
   * @returns 
   */
  getTxHash(){
    return window.localStorage.getItem('txHash') || null;;
  }


  /**
   * Obtener documento de pre orden de venta
   * @returns 
   */
  getPreOrderData(){
    const ticketDataString = window.localStorage.getItem('preOrder');
    return (ticketDataString) ? JSON.parse(ticketDataString) : null;
  }


  removeTicketData(){
    window.localStorage.removeItem('ticketData');
    window.localStorage.removeItem('txHash');
  }


  /**
   * Método para generar tx hash a partir de una cadena
   * @param chain 
   * @returns 
   */
  async generateHash(chain: any[]){
    return await generateHashSHA256(chain);
  }

  // @dev - get all tickets
  listTicket(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._http.get(`${URL_ROOT}/ticket/list`)
        .subscribe((data: any) => {
          if (data.error) {
            return;
          }
          resolve(data.message);
        })
    })
  }


  /**
   * Obtener información de ticket a través del tipo
   * @param type 
   * @returns 
   */
  getTicket(type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._http.get<any>(`${URL_ROOT}/ticket/${type}`)
          .pipe( pluck('results') )
          .subscribe((res: any) => {
            resolve(res);
          })
      } catch (err) {
        reject(err);
      }
    })
  }


  /**
   * Obtener listado de eventos disponibles
   * @returns 
   */
  getEventsList(){
    return this.afs.collection(
      'events',
      (ref) => ref.orderBy('order', 'asc')
    ).valueChanges({idField: 'id'});
  }


  /**
   * Realizar consulta dinamica como promesa
   * @param collection 
   * @param where 
   * @param opts 
   * @returns 
   */
  async getDynamicPromise(collection: string, where: any[] = [], opts: any = {}): Promise<any[]>{
    const {
      idField = "_id", 
      orderBy = [],
      startAt = null,
      endAt = null,
      limit = null,
    } = opts;

    const snapshot = await this.afs.collection(
      collection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }

        if(startAt){ query = query.startAt(startAt); }

        if(endAt){ query = query.endAt(endAt); }

        if(limit){ query = query.limit(limit); }

        return query;
      }
    ).get().toPromise();
    
    return await handlerArrayResult(snapshot, { idField });
  }
}
