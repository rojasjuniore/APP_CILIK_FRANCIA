import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyProductService {

  constructor(private http: HttpClient) { }


  /**
   * @dev getDivision
   * @param keydb 
   * @param uid 
   * @returns 
   */
  getDivision(keydb: any, uid: any) {
    console.log('getDivision', keydb, uid);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.urlrootFunctions}/accreditations/getDivision`, {
        key_db: keydb,
        uid: uid
      }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }


}
