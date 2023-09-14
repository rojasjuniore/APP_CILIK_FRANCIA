import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, combineLatest, distinctUntilChanged, map, merge, Observable, of, scan, switchMap, tap } from 'rxjs';
import { handlerObjectResult, handlerObjectResultRDB } from '../helpers/model.helper';
import { slugify } from '../helpers/slugify';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public authCollection = "auth__assigments";
  public usersCollection = "users";

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
  ) { }

  /**
   * Obtener roles asignados al usuario dentro de un evento
   * @param eventId 
   * @param uid 
   * @returns 
   */
  async getUserRoles(eventId: string, uid: string){
    try {
      const snapshot = await this.afs.collection(this.authCollection).doc(eventId).collection('list').doc(uid).get().toPromise();
      const result = await handlerObjectResult(snapshot);
      return (!result) ? [] : result.profiles;
    } catch (err) {
      return [];
    }
  }

  getUserRolesObservable(eventId: string, uid: string){
    return this.afs.collection(this.authCollection).doc(eventId).collection('list').doc(uid)
    .valueChanges()
    .pipe(
      // tap((data) => console.log('getUserRolesObservable', data)),
      map((data: any) => (data) ? data.profiles : []),
      catchError((err) => {
        console.log('Error on PermissionService.getUserRolesObservable', err);
        return of([]);
      })
    )
  }

  /**
   * Obtener si el usuario es super admin
   * @param uid 
   * @returns 
   */
  async getSuperAdmin(uid: string){
    try {
      const snapshot = await this.db.object(`${this.usersCollection}/${uid}`).query.once('value');
      const result = await handlerObjectResultRDB(snapshot);
      return (!result) ? false : result['super-admin'];
    } catch (err) {
      return false;      
    }
  }

  getSuperAdminObservable(uid: string){
    return this.db.object(`${this.usersCollection}/${uid}`)
    .valueChanges()
    .pipe(
      // tap((data) => console.log('getSuperAdminObservable', data)),
      map((data: any) => (data) ? data['super-admin'] : false),
      catchError((err) => {
        console.log('Error on PermissionService.getSuperAdminObservable', err);
        return of(false);
      })
    )
  }

  /**
   * Obtener roles y super admin del usuario dentro de un evento
   * @param eventId 
   * @param uid 
   * @returns 
   */
  getUserEventFullRolesObservable(eventId: string, uid: string){
    return combineLatest([
      this.getSuperAdminObservable(uid).pipe(map((data) => ({superAdmin: data}))),
      this.getUserRolesObservable(eventId, uid).pipe(map((data) => ({roles: data}))),
    ])
    .pipe(
      map((data: any[]) => data.reduce((prev, next) => Object.assign({}, prev, next), {})),
      scan((prev, next) => Object.assign({}, prev, next), {}),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
      // tap((data) => console.log('getUserEventFullRolesObservable', data)),
      catchError((err) => {
        console.log('Error on PermissionService.getUserEventFullRolesObservable', err);
        return of({
          roles: [],
          superAdmin: false,
        });
      })
    );
  }

























  




  /**
   * TODO: revisar de aqui hacia abajo antes de eliminar
   */
  async addRole(slug: string, data: any) {
    try {
      await this.afs.collection(this.authCollection).doc(slug).set(data);
      return true;
    } catch (err) {
      console.warn('Error on try to create a document', err);
      return false;
    }
  }

  async updateRole(slug: string, data: any) {
    try {
      await this.afs.collection(this.authCollection).doc(slug).update(data);
      return true;
    } catch (err) {
      console.warn('Error on try to update a document', err);
      return false;

    }
  }

  async removeRole(slug: string) {
    try {
      await this.afs.collection(this.authCollection).doc(slug).delete();
      return true;
    } catch (err) {
      console.warn('Error on try to delete a document', err);
      return false;
    }
  }

  async updateUserRoles(uid: string, roles: any) {
    try {
      await this.afs.collection(this.usersCollection).doc(uid).update({ roles });
      return true;
    } catch (err) {
      console.warn('Error on try to update user groups', err);
      return false;
    }
  }



  checkUserHasRoles(uid: string) {
    return this.afs.collection(this.usersCollection).doc(uid).get()
      .pipe(
        switchMap((doc) => handlerObjectResult(doc)),
        map((user: any) => {
          if (user && user.roles && user.roles.length > 0) {
            return true;
          }
          return false;
        }),
        // tap((hasRoles) =>  console.log('hasRoles', hasRoles))
      );
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
  getRolesDynamic(where: any[] = [], opts: any = {}): Observable<any> {
    const {
      idField = "_id",
      orderBy = [],
      startAt = null,
      endAt = null,
    } = opts;

    return this.afs.collection(
      this.authCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = ref.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = ref.orderBy(order.field, order.order); }

        if (startAt) { query = query.startAt(startAt); }

        if (endAt) { query = query.endAt(endAt); }

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

    return service.afs.collection(service.authCollection, (ref) => ref.where('slug', '==', controlValue).limit(1))
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
