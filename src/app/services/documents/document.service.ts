import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import moment from 'moment';
import { of } from 'rxjs';
import { handlerObjectResult } from 'src/app/helpers/model.helper';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public collection = "documents";

  constructor(
    public afs: AngularFirestore,
  ) {}

  /**
   * Actualizar
   * @param docId
   * @param data
   * @returns
   */
  async update(eventId: string, docId: string, data: any) {
    const fmt = { ...data, updated_At: moment().valueOf() };
    return await this.afs.collection(this.collection).doc(eventId).collection('list').doc(docId).update(fmt);
  }

  async set(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(eventId).collection('list').doc(docId).set(data);
  }

  async updateOrStore(eventId: string, docId: string, data: any) {
    const doc = await this.getById(eventId, docId);
    return (doc)
      ? await this.update(eventId, docId, data)
      : await this.set(eventId, docId, data);
  }

  /**
   * Obtener a través del identificador
   * @param docId
   * @returns
   */
  async getById(eventId: string,  docId: string) {
    const snapshot = await this.afs
      .collection(this.collection)
      .doc(eventId).collection('list')
      .doc(docId)
      .ref.get();
    return await handlerObjectResult(snapshot);
  }

  getByIdObservable(eventId: string, docId: string) {
    if(!eventId || !docId) return of(null);

    return this.afs
      .collection(this.collection)
      .doc(eventId).collection('list')
      .doc(docId).valueChanges();
  }

}
