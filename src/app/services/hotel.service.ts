import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { finalize, lastValueFrom, Observable } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { getStorage, ref, deleteObject } from "firebase/storage";

import { pick } from 'underscore';
import moment from 'moment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  public purchases = environment.production ? 'purchases' : 'purchases-dev';
  public roomTypesCollection = environment.production ? 'room__types' : 'room__types-dev';
  public additionalsCollection = environment.production ? 'room__additionals' : 'room__additionals-dev';
  public categoryPassesCollection = environment.production ? 'categoryPasses' : 'categoryPasses-dev';
  public roomStock = environment.production ? 'room__stock' : 'room__stock-dev';
  public roomsCollection = environment.production ? 'rooms' : 'rooms-dev';

  loading = false;

  /**
   * Tipos de ubicación
   */
  public roomLocations: any = {
    1: 'Casa de playa',
    2: 'Torre del mar',
  };

  /**
   * Tipos de Habitación
   */
  public roomTypes = {
    HAB1: {
      code: 'HAB1',
      label: 'HABITACION SUPERIOS SENCILLA EN CASA DE PLAYA',
      location: 1,
    },
    HAB2: {
      code: 'HAB2',
      label: 'HABITACION JUNIOR O DUPLEX EN CASA DE PLAYA',
      location: 1,
    },
    HAB3: {
      code: 'HAB3',
      label: 'HABITACION SUPERIOS SENCILLA EN TORRE DEL MAR',
      location: 2,
    },
    HAB4: {
      code: 'HAB4',
      label: 'HABITACION JUNIOR SUITE EN TORRE DEL MAR',
      location: 2,
    },
  };

  public subRoomTypes = {
    HAB101: {
      code: 'HAB1',
      subcode: 'HAB101',
      label: 'UNA PERSONA EN LA HABITACION'
    },
    HAB102: {
      code: 'HAB1',
      subcode: 'HAB102',
      label: 'DOS PERSONAS EN LA HABITACION'
    },
    HAB103: {
      code: 'HAB1',
      subcode: 'HAB103',
      label: 'TRES PERSONAS EN LA HABITACION'
    },
    HAB201: {
      code: 'HAB2',
      subcode: 'HAB201',
      label: 'UNA PERSONA EN LA HABITACION'
    },
    HAB202: {
      code: 'HAB2',
      subcode: 'HAB202',
      label: 'DOS PERSONAS EN LA HABITACION'
    },
    HAB203: {
      code: 'HAB2',
      subcode: 'HAB203',
      label: 'TRES PERSONAS EN LA HABITACION'
    },
    HAB301: {
      code: 'HAB3',
      subcode: 'HAB301',
      label: 'UNA PERSONA EN LA HABITACION'
    },
    HAB302: {
      code: 'HAB3',
      subcode: 'HAB302',
      label: 'DOS PERSONAS EN LA HABITACION'
    },
    HAB303: {
      code: 'HAB3',
      subcode: 'HAB303',
      label: 'TRES PERSONAS EN LA HABITACION'
    },
    HAB401: {
      code: 'HAB4',
      subcode: 'HAB401',
      label: 'UNA PERSONA EN LA HABITACION'
    },
    HAB402: {
      code: 'HAB4',
      subcode: 'HAB402',
      label: 'DOS PERSONAS EN LA HABITACION'
    },
    HAB403: {
      code: 'HAB4',
      subcode: 'HAB403',
      label: 'TRES PERSONAS EN LA HABITACION'
    },
  }

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }




















  /**
   * TODO: revisar todo de aqui hacia abajo para eliminar
   */

  buildRoomDoc(params: any = {}) {
    return {
      roomId: params.roomId || null,
      nroParticipants: params.nroParticipants || 1,
      ubicationType: params.ubicationType || 1,
      price: params.price || 0,
      additionals: params.additionals || [],
    }
  }

  parseRoomDefaultByCapacityDocument(doc: any) {
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

  parseRoomPrice(room: any, type = 'fullPass') {
    const currentDate = moment();
    let price = room?.fullPrice;
    let indexPrice = room.priceList.length - 1;

    for (let index = 0; index < room.priceList.length; index++) {
      const row = room.priceList[index];
      const from = moment(row.from, 'YYYY/MM/DD').startOf('day');
      const to = moment(row.to, 'YYYY/MM/DD').endOf('day');
      const isBetween = currentDate.isBetween(from, to);
      const rowType = row.type || type;

      // console.log({
      //   currentDate: currentDate.format('DD/MM/YYYY'),
      //   from: from.format('DD/MM/YYYY'),
      //   to: to.format('DD/MM/YYYY'),
      // });

      if (isBetween && rowType === type) {
        indexPrice = index;
        break;
      }
    }

    // console.log('room.priceList[indexPrice]', room.priceList[indexPrice]);

    return Object.assign({}, room, room.priceList[indexPrice]);
  }

  /** ===============================================
   *                  ROOM STOCK
  ================================================== */
  async storeRoomStock(docId: string, data: any) {
    return this.afs.collection(this.roomStock).doc(docId).set(data);
  }

  async updateRoomStock(docId: string, data: any) {
    return this.afs.collection(this.roomStock).doc(docId).update(data);
  }

  async updateRoomStockSupplyCounter(docId: string, data = 1) {
    const ref = this.afs.collection(this.roomStock).doc(docId);
    await ref.update({ supply: increment(data) });
  }

  getDynamicRoomCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

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


  async getRoomDefaultByCapacity(capacity: number, type = 'fullPass') {
    const snapshot = await lastValueFrom(
      this.afs.collection(
        this.roomTypesCollection,
        (ref) => ref.where('capacity', '==', capacity).where('priority', '==', 0)
      ).get()
    );

    const result = await handlerArrayResult(snapshot);
    return this.parseRoomPrice(result.shift(), type);
  }

  getDynamicRoomTypeCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

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

  async getDynamicRoomTypesCollectionPromise(where: any[] = [], opts: any = {}): Promise<any> {
    const { idField = "_id", orderBy = [] } = opts;

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

  /**
   * Restaurar habitaciones a su estado original a través del identificador de la orden de compra
   * @param orderId 
   * @returns 
   */
  async restoreRoomsOnReject(orderId: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.roomsCollection, (ref) => ref.where('paymentOrderID', '==', orderId)).get()
    );

    const result = await handlerArrayResult(snapshot);
    const promises = result.map(async (row: any) => {
      return this.afs.collection(this.roomsCollection).doc(row._id).update({ paymentOrderID: null, additionals: [] });
    });

    await Promise.all(promises);
    return true;
  }

  async getAvailableRoomByCodeType(code: string) {
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

  getDynamicAdditionalsCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

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

  async getAdditonalDaysByRoomCode(roomCode: string) {
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

  async getCategoriesPasses() {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection, (ref) => ref.orderBy('order', 'asc')).get()
    );
    const result = await handlerArrayResult(snapshot);
    return result.map((row) => this.parseRoomPrice(row));
  }

  async getCategoryPassesByCode(code: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection).doc(code).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  // Subida de img comprobantes

  async uploadComprobantes(img, idOrden, order) {
    // if(imgTempCapture !== ''){
    //   console.log(imgTempCapture)
    //   this.deleteImgComprobante(idOrden);
    // }
    let filePath = `upload_comprobantes/img_comprobante_idOrden_${idOrden}_${Math.random()}`;
    let fileRef = this.storage.ref(filePath);
    let observe = this.storage.upload(filePath, img);
    return observe.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => {
            console.log(url)
            order.metadata.captureBank.push({
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

  async updateCaptureImgComprobante(idOrden, order) {
    const ref = this.afs.collection(this.purchases).doc(idOrden)
    await ref.update({ metadata: order.metadata });
  }

  // async deleteImgComprobante(imgTemp){
  //   const storage = getStorage();

  //     // Create a reference to the file to delete
  //     const desertRef = ref(storage, `upload_comprobantes/img_comprobante_idOrden_${imgTemp}`);

  //     // Delete the file
  //     deleteObject(desertRef).then(() => {
  //       console.log('ELiminado la imagen');
  //     }).catch((error) => {
  //       console.log('Ocurrio un error', error);
  //     });

  // }


  getOrderPending() {
    // , ref =>   ref.where('status', '==', 'pending')
    return this.afs.collection(this.purchases).valueChanges()
  }



  async updateOrder(docId: string, data: any) {
    if (data.status === 'rejected') {
      this.afs.collection(this.roomsCollection, ref => ref.where('paymentOrderID', '==', docId)).valueChanges().subscribe({
        next: (resp: any) => {
          console.log(resp)
          if (resp && resp.length > 0) {
            this.afs.collection(this.roomsCollection).doc(resp[0].roomCode).update({ paymentOrderID: '', additionals: [] });
          }
        }
      })
    }
    return this.afs.collection(this.purchases).doc(docId).update(data);
  }




}
