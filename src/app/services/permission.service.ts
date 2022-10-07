import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { slugify } from '../helpers/slugify';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public roleCollection = "permission__roles";
  public userRolesCollection = "users";

  constructor(
    public afs: AngularFirestore,
  ) { }

  async addRole(slug: string, data: any){
    try {
      await this.afs.collection(this.roleCollection).doc(slug).set(data);
      return true;
    } catch (err) {
      console.warn('Error on try to create a document', err);
      return false;
    }
  }
  
  async updateRole(slug: string, data: any){
    try {
      await this.afs.collection(this.roleCollection).doc(slug).update(data);
      return true;
    } catch (err) {
      console.warn('Error on try to update a document', err);
      return false;
      
    }
  }

  async updateUserRoles(uid: string, roles: any){
    try {
      await this.afs.collection(this.userRolesCollection).doc(uid).update({roles});
      return true;
    } catch (err) {
      console.warn('Error on try to update user groups', err);
      return false;
    }
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
   * @param opts.startAt
   * @param opts.endAt
   * 
   * @returns 
   */
  getRolesDynamic(where: any[] = [], opts: any = {}): Observable<any>{
    const {
      idField = "_id", 
      orderBy = [],
      startAt = null,
      endAt = null,
    } = opts;

    return this.afs.collection(
      this.roleCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = ref.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = ref.orderBy(order.field, order.order); }

        if(startAt){ query = query.startAt(startAt); }

        if(endAt){ query = query.endAt(endAt); }

        return query;
      }
    ).valueChanges({ idField });
  }

}

/**
 * Validat si existe role con slug
 *
 * @param service 
 * @returns 
 */
 export function checkRoleSlug(service: PermissionService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    const controlValue = slugify(`${control.value}`.trim());

    return service.afs.collection(service.roleCollection, (ref) => ref.where('slug', '==', controlValue).limit(1))
      .get()
      .pipe(
        // tap((result) => console.log(result) ),
        map((data) => {
          // console.log({data});
          return (data.empty) ? null : { slugExist: true };
        })
      );
  }
}
