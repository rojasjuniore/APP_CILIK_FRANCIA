import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { increment } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  public collection = environment.production ? "coupons" : "coupons-dev";

  constructor(
    public afs: AngularFirestore,
  ) { }


  async store(docId: string, data: any) {
    return this.afs.collection(this.collection).doc(docId).set(data);
  }

  async update(docId: string, data: any) {
    return this.afs.collection(this.collection).doc(docId).update(data);
  }

  async delete(docId: string) {
    return this.afs.collection(this.collection).doc(docId).delete();
  }

  async getById(docId: string) {
    const snapshot = await this.afs.collection(this.collection).doc(docId).get().toPromise();
    return handlerObjectResult(snapshot);
  }

  async updateCounter(docId: string, field: string, value = 1) {
    const ref = this.afs.collection(this.collection).doc(docId);
    await ref.update({ [field]: increment(value) });
  }


  getDynamic(where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

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

/**
 * Validat si usuario registrado a través de un email
 *
 * @param service 
 * @returns 
 */
export function checkCouponCodeExist(service: CouponsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.afs.collection('coupons', (ref) => ref.where('code', '==', `${control.value}`.trim()).limit(1)).get()
      .pipe(
        // tap((result) => console.log(result) ),
        map((data) => {
          // console.log({data});
          return (data.empty) ? null : { codeStored: true };
        })
      );
  }
}
