import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, lastValueFrom, map } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public collection = 'hotel_event';
  public subCollection = 'coupons';

  constructor(
    private afs: AngularFirestore
  ) { }

  async storePurchase(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).set(data);
  }

  async updatePurchase(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).update(data);
  }

  getByEventAndId(eventId: string, docId: string) {
    return this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).valueChanges();
  }

  async getByEventAndIdPromise(eventId: string, docId: string) {
    try {
      const snapshot = await lastValueFrom(
        this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).get()
      );
      return await handlerObjectResult(snapshot);
      
    } catch (err) {
      console.log('Error on CouponService.getByEventAndIdPromise', err);
      return null;
    }
  }

  getDynamic(eventId: string, where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(this.collection).doc(eventId).collection(
      this.subCollection,
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async getDynamicPromise(eventId: string, where: any[] = [], opts: any = {}): Promise<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    const snapshot = await lastValueFrom(
      this.afs.collection(this.collection).doc(eventId).collection(
        this.subCollection,
        (ref) => {
          let query: any = ref;
          for (const row of where) { query = query.where(row.field, row.condition, row.value); }

          for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
          return query;
        }
      ).get()
    );

    return await handlerArrayResult(snapshot, { idField });
  }
}

export function checkCouponCodeExist(service: CouponService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getDynamic(environment.dataEvent.keyDb, [
      {field: 'code', condition: '==', value: `${control.value}`.trim()}
    ])
    .pipe(
      // tap((result) => console.log(result) ),
      map((data) => {
        // console.log({data});
        return (data.length > 0) ? { couponCodeExist: true } : null;
      })
    );
    // return service.afs.collection('users', (ref) => ref.where('walletAddress', '==', `${control.value}`.trim()).limit(1)).get()
    //   .pipe(
    //     // tap((result) => console.log(result) ),
    //     map((data) => {
    //       // console.log({data});
    //       return (data.empty) ? null : { walletStored: true };
    //     })
    //   );
  }
}
