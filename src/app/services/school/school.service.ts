import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  public collection: string = 'schoolRecord';

  constructor(
    public db: AngularFireDatabase,
  ) { }

  getDynamic(where: any[] = [], opts: any = {}): Observable<any[]> {
    const {
      idField = "_id",
      startAt = null,
      endAt = null,
      orderBy = [],
    } = opts;


    return this.db.list(
      this.collection,
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.orderByChild(row.field).equalTo(row.value); }

        for (const order of orderBy) { query = query.orderByChild(order.field); }

        if (startAt) { query = query.startAt(startAt); }

        if (endAt) { query = query.endAt(endAt); }

        return query;
      }
    ).valueChanges([], { idField });

    // return this.afs.collection(this.collection,
    //   (ref) => {
    //     let query: Query = ref;
    //     for (const row of where) { query = query.where(row.field, row.condition, row.value); }

    //     for (const order of orderBy) { query = ref.orderBy(order.field, order.order); }

    //     if (startAt) { query = query.startAt(startAt); }

    //     if (endAt) { query = query.endAt(endAt); }

    //     return query;
    //   }
    // ).valueChanges({ idField });
  }
}
