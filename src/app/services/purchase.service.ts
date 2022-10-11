import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handlerObjectResult } from '../helpers/model.helper';

const URL_ROOT: any = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public purchaseCollection = 'purchases';

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }

  async storePurchase(docId: string, data: any) {
    return this.afs.collection(this.purchaseCollection).doc(docId).set(data);
  }

  async updatePurchase(docId: string, data: any) {
    return this.afs.collection(this.purchaseCollection).doc(docId).update(data);
  }

  async sendPurchaseSummaryNotification(uid: string, orderId: string){
    try {
      const result = await lastValueFrom( 
        this.http.post(`${URL_ROOT}email-notification/purchase-summary`, {uid, orderId})
      );

      return result;
      
    } catch (err) {
      console.log('Error on PurchaseService.sendPurchaseSummaryNotification', err);
      throw err;
    }
  }

  async getPurchaseDocument(docId: string): Promise<any>{
    const snapshot = await this.afs.collection(this.purchaseCollection).doc(docId).get().toPromise();
    return await handlerObjectResult(snapshot);
  }

  userPurchaseList(uid: string){
    return this.getDynamic([
      { field: "uid", condition: "==", value: uid }
    ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }


  userPurchaseListPending(uid: string){
    return this.getDynamic([
      { field: "uid", condition: "==", value: uid },
      { field: "completed", condition: "==", value: false },
      { field: "status", condition: "==", value: 'pending' },
    ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }

  userPurchaseListCompleted(uid: string){
    return this.getDynamic([
      { field: "uid", condition: "==", value: uid },
      { field: "completed", condition: "==", value: true },
    ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }

  getDynamic(where: any[] = [], opts: any = {}): Observable<any[]>{
    const {idField = "_id", orderBy = []} = opts;

    return this.afs.collection(
      this.purchaseCollection,
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }
}
