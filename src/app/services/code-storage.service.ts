import { Injectable } from '@angular/core';
import { CouponService } from './coupon.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeStorageService {

  private storageKey = 'myCodeCoupon';

  constructor(private couponSrv: CouponService) { }

  /**
   * 
   * @param code 
   */
  setCode(code: string) {
    if (!code) return
    this.couponSrv
      .getByEventAndId(environment.dataEvent.keyDb, code)
      .subscribe((res: any) => {
        if (!res || !res.status) {
          console.log('getInfoCode', res);
          return
        }
        console.log('getInfoCode', res);
        localStorage.setItem(this.storageKey, JSON.stringify(res));
      });
  }



  /**
   * 
   * @returns 
   */
  getCode() {
    const codeObj: any = localStorage.getItem(this.storageKey);
    return JSON.parse(codeObj);
  }

  /**
   * 
   */
  clearCode(): void {
    localStorage.removeItem(this.storageKey);
  }
}
