import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public purchaseCollection = 'purchases';

  constructor(
    private afs: AngularFirestore,
  ) { }

  async storePurchase(docId: string, data: any) {
    return this.afs.collection(this.purchaseCollection).doc(docId).set(data);
  }

  async updatePurchase(docId: string, data: any) {
    return this.afs.collection(this.purchaseCollection).doc(docId).update(data);
  }

  userPurchaseList(uid: string){
    return this.getDynamic([
      { field: "uid", condition: "==", value: uid }
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
