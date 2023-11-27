import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { handlerArrayResult } from 'src/app/helpers/model.helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public collection: string = 'users';

  constructor(
    private db: AngularFireDatabase,
    public afs: AngularFirestore,
  ) { }




  async getName(value): Promise<any> {
    if (!value) return "No validado";
    let name = await this.getUserNameDB(value);
    if (!name) {
      const profile: any = await this.getProfileAfs(value);
      if (profile) {
        name = profile.name;
      }
    }
    return name;
  }


  getProfileAfs(uid) {
    return new Promise((resolve) => {
      return this.afs
        .collection('users').
        doc(uid)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }


  /**
   * 
   * @param uid 
   * @returns 
   */
  getUserNameDB(uid) {
    return new Promise((resolve) => {
      return this.db.object(`/users/${uid}/name`)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }


  /**
   * Obtener listado dinamico
   * @param where 
   * @param where.field 
   * @param where.condition
   * @param where.value
   * @param opts 
   * @param opts.idField
   * @param opts.orderBy
   * @param opts.orderBy.field
   * @param opts.orderBy.order
   * @param opts.startAt
   * @param opts.endAt
   * 
   * @returns 
   */
  getDynamic(where: any[] = [], opts: any = {}): Observable<any[]> {
    const {
      idField = "_id",
      startAt = null,
      endAt = null,
      orderBy = [],
    } = opts;

    return this.afs.collection(this.collection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }

        if (startAt) { query = query.startAt(startAt); }

        if (endAt) { query = query.endAt(endAt); }

        return query;
      }
    ).valueChanges({ idField });
  }

  async getDynamicToPromise(where: any[] = [], opts: any = {}): Promise<any[]> {
    const {
      idField = "_id",
      startAt = null,
      endAt = null,
      orderBy = [],
    } = opts;

    console.log({ where });

    const snapshot = await this.afs.collection(this.collection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }

        if (startAt) { query = query.startAt(startAt); }

        if (endAt) { query = query.endAt(endAt); }

        return query;
      }
    ).get().toPromise()

    return await handlerArrayResult(snapshot, opts);
  }
}
