import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpClient) { }


  getBlock(keydb: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.urlrootFunctions}/v2/division/block?keydb=${keydb}`)
        .subscribe((res: any) => {
          if (!res) { reject() }
          resolve(res.results)
        })
    })
  }
}
