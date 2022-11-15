import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  public collection = "coupons";

  constructor(
    public afs: AngularFirestore,
  ) { }

  async store(docId: string, data: any){
    return this.afs.collection(this.collection).doc(docId).set(data);
  }

  async update(docId: string, data: any){
    return this.afs.collection(this.collection).doc(docId).update(data);
  }

  async delete(docId: string){
    return this.afs.collection(this.collection).doc(docId).delete();
  }

  async getById(docId: string){
    return this.afs.collection(this.collection).doc(docId).get().toPromise();
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

