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
   * @returns 
   */
  async checkCode() {
    return new Promise((resolve) => {
      const code: any = this.getCode();
      this.couponSrv.getByEventAndId(environment.dataEvent.keyDb, code)
        .subscribe((coupon: any) => {
          if (!coupon || !coupon.status) return resolve(false);
          return resolve(coupon);
        })
    });

  }

  /**
   * 
   * @param code 
   */
  setCode(code: string) {
    if (!code) return
    return localStorage.setItem(this.storageKey, code);
  }




  /**
   * 
   * @returns 
   */
  getCode() {
    return localStorage.getItem(this.storageKey)
  }

  /**
   * 
   */
  clearCode(): void {
    localStorage.removeItem(this.storageKey);
  }
}
