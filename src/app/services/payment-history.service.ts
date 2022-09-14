import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  public collection = 'paymentHistory';


  constructor(
    private afs: AngularFirestore
  ) { }

  generateDocId(){ return this.afs.createId(); }


  /**
   * Registrar
   * @param params
   * @returns
   */
  async save(params: any) {
    const { orderId, ...data } = params;
    return await this.afs.collection(this.collection).doc(orderId).set(data);
  }

  async store(data: any) {
    return await this.afs.collection(this.collection).add(data);
  }

  async update(docId: string, data: any): Promise<any>{
    return await this.afs.collection(this.collection).doc(docId).update(data);
  }

  async remove(docId: string){
    return await this.afs.collection(this.collection).doc(docId).delete();
  }


  /**
   * Consultar documento a través del identificador
   * @param docId 
   * @returns 
   */
  getById(docId: string){
    return this.afs.collection(this.collection).doc(docId).valueChanges();
  }


  /**
   * Obtener listado de pagos del usuario
   * a través del identificador del usuario
   * @param uid       Identificador del usuario
   * @returns
   */
  getList(uid: string) {
    return this.afs
      .collection(this.collection,
        (ref) => ref.where('uid', '==', uid)
      ).valueChanges({ idField: '_id' });
  }


  /**
   * Obtener listado dinamico
   * @param where 
   * @param where.field 
   * @param where.condition
   * @param where.value
   * @param opts 
   * @param opts.orderBy
   * @param opts.orderBy.field
   * @param opts.orderBy.order
   * 
   * @returns 
   */
   getDynamic(where: any[] = [], opts: any = {}): Observable<any[]>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.collection,
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }
}
