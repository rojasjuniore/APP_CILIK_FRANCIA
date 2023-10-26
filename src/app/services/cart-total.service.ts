import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartTotalService {

  private key = 'cart';
  private ttl = 604800000 // 7 dias
  private storageKeyPrefix = 'secure_';

  private readonly encryptionKey = environment.localStorage.SECRET_KEY;
  public _cartTotal = new BehaviorSubject<any>(null);
  public readonly myCartTotal$ = this._cartTotal.asObservable();



  constructor(
    private commonSrv: CommonService,
  ) {
    const initialCartValue = this.getItem();
    this._cartTotal.next(initialCartValue);
  }


  /**
   * @dev Guarda un valor con encriptación y un tiempo de vida limitado. y valido por 7 dias
   * @param value 
   * @param ttl 
   */
  setItem(value: any): void {
    const currentTime = new Date().getTime();
    const expires = currentTime + this.ttl;

    const data = {
      value: CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptionKey).toString(),
      expires
    };

    localStorage.setItem(this.storageKeyPrefix + this.key, JSON.stringify(data));


    this._cartTotal.next(value);

  }



  // Recupera un valor, lo desencripta y verifica su tiempo de vida.
  getItem(): any {
    const rawData = localStorage.getItem(this.storageKeyPrefix + this.key);

    if (!rawData) {
      return null;
    }

    const data = JSON.parse(rawData);
    const currentTime = new Date().getTime();

    if (data.expires && data.expires < currentTime) {
      this.removeItem();
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(data.value, this.encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  // Elimina un valor del almacenamiento.
  removeItem(): void {
    localStorage.removeItem(this.storageKeyPrefix + this.key);

    this._cartTotal.next(null);
  }



  /**
 * @dev group by
 * @param data 
 * @param key 
 * @returns 
 */
  groupByAndCalculateTotals(data, key) {
    const grouped = this.commonSrv.groupBy(data, key);

    for (let groupKey in grouped) {
      grouped[groupKey].name = groupKey;
      grouped[groupKey].total = grouped[groupKey].reduce((sum, item) => sum + item.totales, 0);
    }

    return grouped;
  }

  /**
   * @dev apply discounts
   * @param groupedData 
   * @param discounts 
   * @returns 
   */
  applyDiscounts(groupedData, discounts) {
    console.log('groupedData', discounts);
    for (let key in groupedData) {
      // Establecer valores predeterminados
      groupedData[key].subtotal = groupedData[key].total;
      groupedData[key].totalDiscount = 0;
      groupedData[key].totalToPay = groupedData[key].subtotal;
    }

    // Si discounts es null, simplemente regresa groupedData con los valores predeterminados establecidos
    if (!discounts) return groupedData;

    for (let discount of discounts) {
      if (discount.concept && groupedData[discount.concept]) {
        let discountAmount = 0;

        if (discount.type === "percentage") {
          discountAmount = groupedData[discount.concept].total * (discount.value / 100);
        } else if (discount.type === "amount") {
          discountAmount = discount.value;
        }

        groupedData[discount.concept].totalDiscount = discountAmount;
        groupedData[discount.concept].totalToPay = groupedData[discount.concept].subtotal - discountAmount;
      }
    }
    return groupedData;
  }



  /**
   * @dev calculate global totals
   * @param groupedData 
   * @returns 
   */
  calculateGlobalTotals(groupedData, couponList) {
    let globalSubtotal = 0;
    let globalDiscount = 0;
    let globalTotalToPay = 0;
    let globalDiscountGlobalPercentage = 0;

    for (let key in groupedData) {
      globalSubtotal += groupedData[key].subtotal;
      globalDiscount += groupedData[key].totalDiscount;
      globalTotalToPay += groupedData[key].totalToPay;
    }


    // @dev apply discounts
    /**
     * TODO: hay un tipo de descuento que se aplica a todo el carrito, no a un producto en particular
     * por lo que no se puede aplicar en el método applyDiscounts
     */
    const discount = couponList.find((item: any) => item.concept === 'discount');
    if (discount) {
      if (discount.type === "percentage") {
        globalDiscountGlobalPercentage = globalSubtotal * (discount.value / 100);
      } else if (discount.type === "amount") {
        globalDiscountGlobalPercentage = discount.value;
      }
    }


    return {
      globalDiscountGlobalPercentage,
      globalSubtotal,
      globalDiscount: globalDiscount || globalDiscountGlobalPercentage,
      globalTotalToPay: globalDiscountGlobalPercentage > 0 ? globalTotalToPay - globalDiscountGlobalPercentage : globalTotalToPay
    };
  }
}
