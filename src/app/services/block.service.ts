import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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

  /**
 * @dev Obtener listado de bloques filtrado por tipo de categoria
 * @param keyDb           Key de la base de datos
 * @param subCategory     Subcategoria
 * @returns 
 */
  async getBlockByType(keyDb: string, subCategory: string) {
    try {
      const params = new HttpParams({
        fromObject: {
          keyDb: keyDb,
          subCategory: subCategory
        }
      });

      const url = `${environment.urlrootFunctions}/v2/division/block-by-type` + '?' + params.toString();
      const snapshot: any = await lastValueFrom(this.http.get(url));
      return snapshot.results;

    } catch (err) {
      console.log('Error on DivisionPurchasePage.ngOnInit', err);
      throw err;
    }
  }
}
