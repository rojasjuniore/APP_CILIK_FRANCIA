import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersStatsService {

  public collection = 'paymentHistory';
  public baseUrl = [environment.API_URL, 'reports'].join('/');

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }


  async getReportOfAllOrders(data: any){
    const url = `${this.baseUrl}/all-orders`;
    console.log('url', url);

    return new Promise((resolve, reject) => {
      this.http.post(url, data, { responseType: 'json' }).subscribe((res: any) => { resolve(res.results); }, err => { reject(err); });
    });
  }


  getDynamicSnapshot(where: any[]) {
    return this.afs.collection(
      this.collection,
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }
        return query;
      }
    );
  }

  getDynamic(where: any[]) {
    return this.getDynamicSnapshot(where).valueChanges({ idField: '_id' });
  }
}
