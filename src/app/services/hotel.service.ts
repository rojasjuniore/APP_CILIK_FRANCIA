import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { finalize, lastValueFrom, Observable } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { getStorage, ref, deleteObject } from "firebase/storage";

import { pick } from 'underscore';
import moment from 'moment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  public purchases = 'purchases';
  public roomTypesCollection = 'room__types';
  public additionalsCollection = 'room__additionals';
  public categoryPassesCollection = 'categoryPasses';
  public roomStock = 'room__stock';
  public roomsCollection = 'rooms';

  loading = false;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
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
      'roomCode',
      'roomCodePrefix',
      '_id'
    ]);
  }

  parseRoomPrice(room: any){
    const currentDate = moment();
    let price = room?.fullPrice;
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

  /** ===============================================
   *                  ROOM STOCK
  ================================================== */
  async storeRoomStock(docId: string, data: any){
    return this.afs.collection(this.roomStock).doc(docId).set(data);
  }

  async updateRoomStock(docId: string, data: any) {
    return this.afs.collection(this.roomStock).doc(docId).update(data);
  }

  async updateRoomStockSupplyCounter(docId: string, data = 1){
    const ref = this.afs.collection(this.roomStock).doc(docId);
    await ref.update({ supply: increment(data) });
  }

  getDynamicRoomCollection(where: any[] = [], opts: any = {}): Observable<any>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.roomStock,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  /** ===============================================
   *                   ROOM TYPES
  ================================================== */
  async storeRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).set(data);
  }

  async updateRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).update(data);
  }


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

  /** ===============================================
   *                 ROOMS COLLECTION
  ================================================== */

  async updateRoom(docId: string, data: any) {
    return this.afs.collection(this.roomsCollection).doc(docId).update(data);
  }

  async storeRoom(docId: string, data: any) {
    return this.afs.collection(this.roomsCollection).doc(docId).set(data);
  }

  async getAvailableRoomByCodeType(code: string){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.roomsCollection, 
        (ref) => ref.where('code', '==', code)
          .where('paymentOrderID', '==', null)
          .orderBy('roomCode', 'asc')
          .limit(1)
        ).get()
      );

    const result = await handlerArrayResult(snapshot);
    return (result.length > 0) ? result.shift() : null;
  }

  /** ===============================================
   *               ROOM ADDITIONALS
  ================================================== */
  async storeAdditionals(docId: string, data: any) {
    return this.afs.collection(this.additionalsCollection).doc(docId).set(data);
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

  async getAdditonalDaysByRoomCode(roomCode: string){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.additionalsCollection).doc(roomCode).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  /** ===============================================
   *               CATEGORY PASSES
  ================================================== */
  async storeCategoriesPasses(docId: string, data: any) {
    return this.afs.collection(this.categoryPassesCollection).doc(docId).set(data);
  }

  async getCategoriesPasses(){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection, (ref) => ref.orderBy('order', 'asc')).get()
    );
    const result = await handlerArrayResult(snapshot);
    return result.map((row) => this.parseRoomPrice(row));
  }

  async getCategoryPassesByCode(code: string){
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection).doc(code).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  // Subida de img comprobantes

  async uploadComprobantes(img, idOrden, order){
    // if(imgTempCapture !== ''){
    //   console.log(imgTempCapture)
    //   this.deleteImgComprobante(idOrden);
    // }
    let filePath = `upload_comprobantes/img_comprobante_idOrden_${idOrden}_${Math.random()}`;
    let fileRef = this.storage.ref(filePath);
    let observe = this.storage.upload(filePath, img);
    return observe.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => {
            console.log(url)
            order.captureBank.push({
              nota: '',
              url
            });
            this.loading = false;
            return this.updateCaptureImgComprobante(idOrden, order)
          }
        })
      })
    ).subscribe()

  }

  async updateCaptureImgComprobante(idOrden, order){
    const ref =  this.afs.collection(this.purchases).doc(idOrden)
    await ref.update({ captureBank: order.captureBank });
  }

  async deleteImgComprobante(imgTemp){
    const storage = getStorage();

      // Create a reference to the file to delete
      const desertRef = ref(storage, `upload_comprobantes/img_comprobante_idOrden_${imgTemp}`);

      // Delete the file
      deleteObject(desertRef).then(() => {
        console.log('ELiminado la imagen');
      }).catch((error) => {
        console.log('Ocurrio un error', error);
      });

  }


}
