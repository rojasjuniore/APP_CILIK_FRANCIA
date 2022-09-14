import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { lastValueFrom, Observable } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';

import { pick } from 'underscore';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  public roomTypesCollection = 'roomTypes';
  public additionalsCollection = 'additionals';
  public categoryPassesCollection = 'categoryPasses';
  public roomCollection = 'rooms';

  constructor(
    private afs: AngularFirestore,
  ) { }

  buildRoomDoc(params: any = {}){
    return {
      roomId: params.roomId || null,
      nroParticipants: params.nroParticipants || 1,
      ubicationType: params.ubicationType || 1,
      price: params.price || 0,
      additionals: params.additionals || [],
    }
  }

  async storeRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).set(data);
  }

  async updateRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).update(data);
  }

  async updateRoomTypeSupply(docId: string, data = 1){
    const ref = this.afs.collection(this.roomTypesCollection).doc(docId);
    await ref.update({ supply: increment(data) });
  }

  async storeRoom(docId: string, data: any) {
    return this.afs.collection(this.roomCollection).doc(docId).set(data);
  }

  async storeAdditionals(docId: string, data: any) {
    return this.afs.collection(this.additionalsCollection).doc(docId).set(data);
  }

  async storeCategoriesPasses(docId: string, data: any) {
    return this.afs.collection(this.categoryPassesCollection).doc(docId).set(data);
  }


  /**
   * Obtener habitación por default 
   * @param capacity 
   * @returns 
   */
  async getRoomDefaultByCapacity(capacity: number){
    const snapshot = await lastValueFrom(
      this.afs.collection(
        this.roomTypesCollection,
        (ref) => ref.where('capacity', '==', capacity).where('priority', '==', 0)
      ).get()
    );

    const result = await handlerArrayResult(snapshot);
    return this.parseRoomPrice(result.shift());
  }

  parseRoomDefaultByCapacityDocument(doc: any){
    return pick(doc, [
      'capacity',
      'price',
      'ubicationType',
      'ubicationTypeDescription',
      'description',
      'percentage',
      'fullPrice',
      'pricePerPeople',
      'discount',
      'discountPerPeople',
      '_id'
    ]);
  }

  parseRoomPrice(room: any){
    const currentDate = moment();
    let price = room.fullPrice;
    let indexPrice = room.priceList.length - 1;

    for (let index = 0; index < room.priceList.length; index++) {
      const row = room.priceList[index];
      const from = moment(row.from, 'DD/MM/YYYY').startOf('day');
      const to = moment(row.to, 'DD/MM/YYYY').endOf('day');
      const isBetween = currentDate.isBetween(from, to);

      if(isBetween){
        indexPrice = index;
        break;
      }
    }

    return Object.assign({}, room, room.priceList[indexPrice]);
  }

  // async getRoomDefaultByCapacity(capacity: number, max = 3){

  //   if(max > 3){ return null; }

  //   const snapshot = await lastValueFrom(
  //     this.afs.collection(
  //       this.roomTypesCollection,
  //       (ref) => ref.where('capacity', '==', capacity).where('supply', '>', 0)
  //     ).get()
  //   );

  //   const toParse = await handlerArrayResult(snapshot);

  //   if(toParse.length == 0){ return this.getRoomDefaultByCapacity(capacity + 1); }

  //   const result = toParse.sort((a: any, b: any) => a.priority - b.priority).shift();
  //   return result;
  // }

  /**
   * Obtener listado dinamico
   * @param where 
   * @param where.field 
   * @param where.condition
   * @param where.value
   * @param opts
   * @param opts.idField
   * @param opts.orderBy
   * @param opts.orderBy.field
   * @param opts.orderBy.order
   * 
   * @returns 
   */
  getDynamicRoomCollection(where: any[] = [], opts: any = {}): Observable<any>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.roomCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  getDynamicRoomTypeCollection(where: any[] = [], opts: any = {}): Observable<any>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.roomTypesCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  getDynamicAdditionalsCollection(where: any[] = [], opts: any = {}): Observable<any>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.additionalsCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async getDynamicRoomTypesCollectionPromise(where: any[] = [], opts: any = {}): Promise<any>{
    const {idField = "_id", orderBy = []} = opts;

    const snapshot = await lastValueFrom(
      this.afs.collection(
        this.roomTypesCollection,
        (ref) => {
          let query: Query = ref;
          for (const row of where) { query = query.where(row.field, row.condition, row.value); }
  
          for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
          return query;
        }
      ).get()
    );

    return handlerArrayResult(snapshot, idField);
  }

  async getAdditonalDaysByRoomCode(roomCode: string){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.additionalsCollection).doc(roomCode).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  async getCategoriesPasses(){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection, (ref) => ref.orderBy('order', 'asc')).get()
    );
    const result = await handlerArrayResult(snapshot);
    return result.map((row) => this.parseRoomPrice(row));
  }

}
