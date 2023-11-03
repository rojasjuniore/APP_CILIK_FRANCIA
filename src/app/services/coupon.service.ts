import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { increment } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public collection = 'hotel_event';
  public subCollection = 'coupons';

  constructor(
    public afs: AngularFirestore
  ) { }

  async store(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).set(data);
  }

  async update(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).update(data);
  }

  async remove(eventId: string, docId: string) {
    return await this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId).delete();
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



  /**
   * @dev Resta un valor a un contador
   * @param docId 
   * @param field 
   * @param value 
   */
  async subtractCounter(eventId: string, docId: string, field = "userLimit", value = 1) {
    const ref = this.afs.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId);
    await ref.update({ [field]: increment(-value) });
  }



  // 
  /**
   * Función para decrementar userLimit de un cupón específico de forma atómica
   * @param documentId 
   * @param couponConcept 
   * @returns 
   */
  async decrementUserLimit(eventId: string, docId: string, couponConcept: string) {
    // const docRef = this.afs.firestore.collection('tuColeccion').doc(documentId);

    const docRef = this.afs.firestore.collection(this.collection).doc(eventId).collection(this.subCollection).doc(docId);


    return this.afs.firestore.runTransaction(transaction => {

      return transaction.get(docRef).then(doc => {
        if (!doc.exists) {
          throw "Document does not exist!";
        }

        const data = doc.data();
        if (data && Array.isArray(data.coupons)) {
          const couponIndex = data.coupons.findIndex((coupon: any) => coupon.concept === couponConcept);

          // Si no se encuentra el cupón o userLimit ya es 0, lanzar un error.
          if (couponIndex === -1 || data.coupons[couponIndex].userLimit <= 0) {
            throw "Cupón no encontrado o userLimit no se puede decrementar más.";
          }

          // Decrementar el userLimit
          data.coupons[couponIndex].userLimit--;

          // Se prepara la actualización del documento
          transaction.update(docRef, { coupons: data.coupons });
        } else {
          throw "El documento no tiene la estructura esperada";
        }
      });
    })
      .then(() => console.log("Transaction successfully committed!"))
      .catch(error => console.log("Transaction failed: ", error));
  }


  /**
     * porque firebase solo me permite actualiza un documento 1 vexz cada segundo  
     * Ejecuta decrementos de userLimit en secuencia con un retraso
     * @param cart 
     * @param purchase 
     */
  async decrementUserLimitsSequentially(products: any, codeCoupon): Promise<void> {
    let delay = 0; // retraso inicial
    const delayIncrement = 1000; // incremento del retraso en milisegundos

    for (const product of products) {
      // Crea una promesa que se resuelve con un retraso
      await new Promise(resolve => setTimeout(resolve, delay));

      // Llama a la función para decrementar el userLimit
      await this.decrementUserLimit(environment.dataEvent.keyDb, codeCoupon, product.key)
        .catch(error => console.error('Error decrementing user limit:', error));

      delay += delayIncrement; // Incrementa el retraso para la siguiente iteración
    }
  }


  /**
   * 
   * @param uid 
   * @returns 
   */
  myCuposPurchaseList(uid: any) {
    return this.getDynamic(environment.dataEvent.keyDb, [
      { field: "ownerId", condition: "==", value: uid }
    ], { orderBy: [{ field: "createdAt", order: "desc" }] })
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
    return service.afs.collection(service.collection)
      .doc(environment.dataEvent.keyDb)
      .collection(
        service.subCollection,
        (ref) => ref.where('code', '==', `${control.value}`.trim().toUpperCase()).limit(1)
      )
      .get()
      .pipe(
        // tap((result) => console.log(result) ),
        map((data) => {
          return (data.empty) ? null : { couponCodeExist: true };
        })
      );
  }
}


/**
 * TODO: ORIGINAL
 * @param service 
 * @returns 
 */
export function checkAvailableCouponCodeExist2(service: CouponService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log('control', control.value, service.collection, environment.dataEvent.keyDb);
    return service.afs.collection(service.collection)
      .doc(environment.dataEvent.keyDb)
      .collection(
        service.subCollection,
        (ref) => ref.where('code', '==', `${control.value}`.trim().toUpperCase()).limit(1)
      )
      .get()
      .pipe(
        tap((result) => console.log(result)),
        map((data) => {
          // console.log('data', data);
          return (data.empty) ? { availableCouponCode: true } : ((data.docs[0].data().status) ? null : { availableCouponCode: true });
        })
      );
  }
}


/***
 * TODO: CUPONES JUNIOR
 */
export function checkAvailableCouponCodeExist(service: CouponService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // console.log('control', service.collection, environment.dataEvent.keyDb, service.subCollection, control.value);

    return service.afs.collection(service.collection)
      .doc(environment.dataEvent.keyDb)
      .collection(
        service.subCollection,
        (ref) => ref.where('code', '==', `${control.value}`.trim().toLowerCase()).limit(1)
      )
      .get()
      .pipe(
        // tap((result) => console.log(result.empty, result.docs[0].data())),
        map((data) => {

          if (data.empty) {
            return { availableCouponCode: true };
          }

          const dataCurrent = data.docs[0].data();
          console.log('dataCurrent', dataCurrent.status && dataCurrent.userLimit > 0);
          if (dataCurrent.status && dataCurrent.userLimit > 0) {
            return null
          } else {
            return { availableCouponCode: true };
          }

          // return (data.empty) ? { availableCouponCode: true } :
          //   ((data.docs[0].data().status && data.docs[0].data().userLimit <= 0) ? null :
          //     { availableCouponCode: true });
        })
      );
  }
}
