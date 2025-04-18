import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { handlerObjectResult } from '../helpers/model.helper';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { CustomizationfileService } from './customizationfile/customizationfile.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public collection: string = 'hotel_event';

  constructor(
    private afs: AngularFirestore,
    public _cf: CustomizationfileService,
  ) { }

  /**
   * Generar un id para un documento
   * @returns 
   */
  generateId() { return this.afs.createId(); }

  /**
   * Crear estructura de documento para carrito de compras
   * @param params 
   * @returns 
   */
  buildCardDoc(params: any = {}) {
    return {
      cartId: params.cartId || this.generateId(),
      uid: params.uid || this._cf.getUid(),
      eventId: params.eventId || environment.dataEvent.keyDb,
      createdAt: params.createdAt || moment().valueOf(),
      product: params.product || [],
      coupons: params.coupons || [],
      status: 'draw' // draw, pending, completed, rejected
    };
  }

  /**
   * Crear un nuevo carrito de compras para un evento
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos del carrito
   * @returns 
   */
  async store(eventId: string, uid: string, data: any) {
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('cart').doc(uid).set(data);
  }

  /**
   * 
   * @param eventId 
   * @param uid 
   * @returns 
   */
  remove(eventId: string, uid: string) {
    return this.afs.collection(this.collection).doc(eventId).collection('cart').doc(uid).delete();
  }

  async buildAndStore(eventId: string) {
    const uid: any = this._cf.getUid();
    const data = this.buildCardDoc();
    /** Buscar, si no existe crear */
    const find = await this.getCartToPromise(eventId, uid);
    if (!find) { await this.store(eventId, uid, data); };
    return data;
  }

  /**
   * Añadir elementos al carrito de compras
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos a añadir
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async addOnCart(eventId: string, uid: string, data: any[], field: string = 'product') {
    await Promise.all(
      data.map(async (item: any) =>
        this.afs.collection(this.collection).doc(eventId).collection('cart').doc(uid).update({ [field]: arrayUnion(item) })
      )
    );
    return true;
    // return await this.afs.collection(this.collection)
    //   .doc(eventId).collection('list').doc(uid).update({[field]: arrayUnion(data)});
  }

  /**
   * Remover elementos del carrito de compras
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos a remover
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async removeOnCart(eventId: string, uid: string, data: any, field: string = 'product') {
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('cart').doc(uid).update({
        [field]: arrayRemove(data)
      });
  }

  /**
   * Obtener el carrito de compras de un usuario como promesa
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @returns 
   */
  async getCartToPromise(eventId: string, uid: string) {
    try {
      const snapshot = await this.afs.collection(this.collection)
        .doc(eventId).collection('cart').doc(uid).get().toPromise();
      return await handlerObjectResult(snapshot);

    } catch (err) {
      console.log('Error on CartService.getCartToPromise', err);
      return null;
    }
  }

  async getCartAllToPromise(eventId: string, uid: string) {
    try {
      const snapshot = await this.afs.collection(this.collection)
        .doc(eventId).collection('cart').doc(uid).get().toPromise();
      return snapshot;

    } catch (err) {
      console.log('Error on CartService.getCartToPromise', err);
      return null;
    }
  }

  /**
   * Obtener el carrito de compras de un usuario como observable
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @returns 
   */
  getCartObservable(eventId: string, uid: string) {
    return this.afs.collection(this.collection)
      .doc(eventId).collection('cart').doc(uid).valueChanges();
  }

  /**
   * Eliminar el carrito de compras de un usuario
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @returns 
   */
  async deleteCart(eventId: string, uid: string) {
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('cart').doc(uid).delete();
  }

}
