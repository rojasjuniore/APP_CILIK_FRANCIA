// https://commerce.coinbase.com/docs/api/#charges

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, pluck } from 'rxjs';

import { environment } from "src/environments/environment";
const URL_ROOT = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {

  constructor(private _http: HttpClient) { }


  /***
   * DOC: https://commerce.coinbase.com/docs/api/#create-a-charge
   */
  create(data: any) {
    return this._http.post(`${URL_ROOT}/coinbase/charges/create`, data);
  }


  /***
   * DOC: https://commerce.coinbase.com/docs/api/#resolve-a-charge
   */
  showACharge(checkoutId: any) {

    let params = new HttpParams()
      .set("checkoutId", checkoutId)
    return this._http.get(`${URL_ROOT}/coinbase/charges/retrieve`, { params: params });
  }


  /***
  * DOC: https://commerce.coinbase.com/docs/api/#list-charges
  */
  listCharges() {
    return this._http.get(`${URL_ROOT}/coinbase/charges/list`);
  }

  /***
  * DOC: https://commerce.coinbase.com/docs/api/#list-charges
  */
  listChargesAll() {
    return this._http.get(`${URL_ROOT}/coinbase/charges/all`);
  }



  getSite(url) {
    return this._http.get(url, { responseType: "text" });
  }

  /**
   * Cancelar orden de compra
   * @param orderId 
   * @returns 
   */
  async cancelOrder(orderId: string){
    try {
      const url = `${environment.API_URL}/coinbase/charges/cancel`;

      const snapshot = await lastValueFrom( 
        this._http.post(url, {orderId} ).pipe(
          pluck('results')
        )
      );

      return snapshot;
    } catch (err) {
      console.log('Erro ron CoinbaseService.cancelOrder', err);
      return null;
    }
  }
}


