import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL_ROOT = environment.urlrootFunctions

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient,) { }



  /**
   * 
   * @param keydb 
   * @param code 
   * @returns 
   */
  getAccreditationsRecord(keydb: string, code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`${URL_ROOT}/accreditations/record/?keydb=${keydb}&code=${code}`);
      this.http
        .get(`${URL_ROOT}/accreditations/record/?keydb=${keydb}&code=${code}`)
        .subscribe(
          (res) => {
            console.log(res);
            resolve(res);
          },
          (err) => {
            console.log(err);
            reject(err.error);
          }
        );
    });
  }

  /**
   * 
   * @param keydb 
   * @returns 
   */
  getAccreditationsCount(keydb: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`${URL_ROOT}/accreditations/count?keydb=${keydb}`);
      this.http
        .get(`${URL_ROOT}/accreditations/count?keydb=${keydb}`)
        .subscribe((res) => {
          resolve(res);
        },
          (err) => {
            console.log(err);
            reject(err.error);
          }
        );
    });
  }



}

