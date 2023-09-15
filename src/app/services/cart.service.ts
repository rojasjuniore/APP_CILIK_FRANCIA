import { Injectable } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { handlerObjectResult } from '../helpers/model.helper';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { CustomizationfileService } from './customizationfile/customizationfile.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public collection: string = 'event_cart';

  constructor(
    private afs: AngularFirestore,
    public _cf: CustomizationfileService,
  ) { }

  /**
   * Crear estructura de documento para carrito de compras
   * @param params 
   * @returns 
   */
  buildCardDoc(params: any = {}){
    return {
      uid: params.uid || this._cf.getUid(),
      eventId: params.eventId || environment.dataEvent.keyDb,
      createdAt: params.createdAt || moment().valueOf(),
      product: params.product || [],
    };
  }

  /**
   * Crear un nuevo carrito de compras para un evento
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos del carrito
   * @returns 
   */
  async store(eventId: string, uid: string, data: any){
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('list').doc(uid).set(data);
  }

  /**
   * Añadir elementos al carrito de compras
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos a añadir
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async addOnCart(eventId: string, uid: string, data: any, field: string = 'product'){
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('list').doc(uid).update({
        [field]: arrayUnion(data)
      });
  }

  /**
   * Remover elementos del carrito de compras
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @param data              Datos a remover
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async removeOnCart(eventId: string, uid: string, data: any, field: string = 'product'){
    return await this.afs.collection(this.collection)
      .doc(eventId).collection('list').doc(uid).update({
        [field]: arrayRemove(data)
      });
  }

  /**
   * Obtener el carrito de compras de un usuario como promesa
   * @param eventId           Id del evento
   * @param uid               Id del usuario
   * @returns 
   */
  async getCartToPromise(eventId: string, uid: string){
    try {
      const snapshot = await this.afs.collection(this.collection)
        .doc(eventId).collection('list').doc(uid).get().toPromise();
      return await handlerObjectResult(snapshot);
      
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
  getCartObservable(eventId: string, uid: string){
    return this.afs.collection(this.collection)
      .doc(eventId).collection('list').doc(uid).valueChanges();
  }

}
