import { Injectable } from '@angular/core';
import { CouponService } from './coupon.service';
import { environment } from 'src/environments/environment';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CodeStorageService {

  private key = 'myCodeCoupon';
  private storageKeyPrefix = 'secure_';
  private readonly encryptionKey = environment.localStorage.SECRET_KEY;

  constructor(private couponSrv: CouponService) { }



  /**
 * 
 * @returns 
 */
  async checkCode() {
    return new Promise((resolve) => {
      const code: any = this.getItem();
      if (!code) return resolve(false);
      this.couponSrv.getByEventAndId(environment.dataEvent.keyDb, code)
        .subscribe((coupon: any) => {
          if (!coupon || !coupon.status) return resolve(false);
          return resolve(coupon);
        })
    });

  }



  /**
    * @dev Guarda un valor con encriptación y un tiempo de vida limitado. y valido por 7 dias
    * @param value 
    * @param ttl 
    */
  setItem(value: any): void {
    const data = CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptionKey).toString()
    localStorage.setItem(this.storageKeyPrefix + this.key, data);
    return
  }


  // Recupera un valor, lo desencripta y verifica su tiempo de vida.
  getItem(): any {
    const rawData = localStorage.getItem(this.storageKeyPrefix + this.key);
    if (!rawData) {
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(rawData, this.encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  // Elimina un valor del almacenamiento.
  removeItem(): void {
    localStorage.removeItem(this.storageKeyPrefix + this.key);

  }


  /**
   * 
   * @param array 
   * @param conceptToFind 
   * @returns 
   */
  findByConcept(array: any, conceptToFind: string) {
    return array.find(item => item.concept === conceptToFind) || null;
  }



  // /**
  //  * 
  //  * @param code 
  //  */
  // setCode(code: string) {
  //   if (!code) return
  //   return localStorage.setItem(this.storageKey, code);
  // }




  // /**
  //  * 
  //  * @returns 
  //  */
  // getCode() {
  //   return localStorage.getItem(this.storageKey)
  // }

  // /**
  //  * 
  //  */
  // clearCode(): void {
  //   localStorage.removeItem(this.storageKey);
  // }
}
