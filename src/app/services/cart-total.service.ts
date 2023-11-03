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
    return this._cartTotal.next(value);
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
   * TODO: Calcular totales
   */


  //   /**
  //  * @dev group by
  //  * @param data 
  //  * @param key 
  //  * @returns 
  //  */
  //   groupByAndCalculateTotals(data, key) {
  //     const grouped = this.commonSrv.groupBy(data, key);

  //     for (let groupKey in grouped) {
  //       grouped[groupKey].name = groupKey;
  //       grouped[groupKey].total = Math.ceil(grouped[groupKey].reduce((sum, item) => sum + item.totales, 0));
  //     }

  //     return grouped;
  //   }

  /**
   * Agrupa los elementos del array 'data' por la clave 'key' y calcula el total acumulado de 'totales' para cada grupo.
   * 
   * @param {Array} data - Array de objetos para agrupar y calcular totales.
   * @param {string} key - La clave por la cual se agruparán los datos.
   * @returns {Object} Un objeto que contiene los grupos con su nombre y total acumulado.
   */
  groupByAndCalculateTotals(data, key) {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('La entrada debe ser un array no vacío.');
      return {};
    }

    const grouped = this.commonSrv.groupBy(data, key);

    Object.keys(grouped).forEach(groupKey => {
      const total = grouped[groupKey].reduce((sum, item) => {
        const itemTotal = item.totales || 0; // Asegura que 'totales' exista y sea un número.
        return sum + itemTotal;
      }, 0);

      grouped[groupKey] = {
        name: groupKey,
        total: Math.ceil(total)
      };
    });

    return grouped;
  }



  // /**
  //  * @dev apply discounts
  //  * @param groupedData 
  //  * @param discounts 
  //  * @returns 
  //  */
  // applyDiscounts(groupedData, discounts) {
  //   for (let key in groupedData) {
  //     // Establecer valores predeterminados
  //     groupedData[key].subtotal = Math.ceil(groupedData[key].total);
  //     groupedData[key].totalDiscount = 0;
  //     groupedData[key].totalToPay = Math.ceil(groupedData[key].subtotal);
  //   }

  //   // Si discounts es null, simplemente regresa groupedData con los valores predeterminados establecidos
  //   if (!discounts) return groupedData;

  //   for (let discount of discounts) {

  //     if (discount.concept
  //       && discount.userLimit > 0
  //       && groupedData[discount.concept]) {

  //       let discountAmount = 0;

  //       if (discount.type === "percentage") {
  //         discountAmount = groupedData[discount.concept].total * (discount.value / 100);
  //       } else if (discount.type === "amount") {
  //         discountAmount = discount.value;
  //       }

  //       groupedData[discount.concept].totalDiscount = Math.ceil(discountAmount);
  //       groupedData[discount.concept].totalToPay = Math.ceil(groupedData[discount.concept].subtotal - discountAmount);
  //     } else {
  //       // console.log('no se puede aplicar el descuento', discount);
  //     }
  //   }
  //   return groupedData;
  // }

  /**
 * Aplica descuentos a cada elemento en los datos agrupados basados en las reglas de descuentos proporcionadas.
 * 
 * @param {Object} groupedData - Los datos agrupados a los que se aplicarán descuentos.
 * @param {Array} discounts - Un array de objetos de descuentos que se aplicarán.
 * @returns {Object} - Retorna los datos agrupados con descuentos aplicados.
 */
  applyDiscounts(groupedData, discounts) {
    // Primero establece los valores iniciales para subtotal, totalDiscount y totalToPay.
    Object.values(groupedData).forEach((group: any) => {
      group.subtotal = Math.ceil(group.total);
      group.totalDiscount = 0;
      group.totalToPay = group.subtotal;
    });

    // Retorna temprano si no hay descuentos que aplicar.
    if (!discounts) return groupedData;

    // Aplica descuentos donde sea aplicable.
    discounts.forEach(discount => {
      if (this.canApplyDiscount(discount, groupedData)) {
        const discountAmount = this.calculateDiscountAmount(discount, groupedData[discount.concept].total);
        groupedData[discount.concept].totalDiscount = Math.ceil(discountAmount);
        groupedData[discount.concept].totalToPay -= Math.ceil(discountAmount);
      }
    });

    return groupedData;
  }

  /**
   * Calcula el monto del descuento basado en las reglas del descuento proporcionado.
   * 
   * @param {Object} discount - El descuento que se aplicará.
   * @param {number} total - El total al cual se aplicará el descuento.
   * @returns {number} - El monto del descuento calculado.
   */
  calculateDiscountAmount(discount, total) {
    if (discount.type === "percentage") {
      return total * (discount.value / 100);
    } else if (discount.type === "amount") {
      return discount.value;
    }
    // Manejar caso de tipo de descuento desconocido o no soportado.
    console.warn(`Tipo de descuento desconocido: ${discount.type}`);
    return 0;
  }

  /**
   * Verifica si un descuento puede ser aplicado a los datos agrupados.
   * 
   * @param {Object} discount - El descuento para verificar.
   * @param {Object} groupedData - Los datos agrupados sobre los que se verifica el descuento.
   * @returns {boolean} - Verdadero si el descuento puede ser aplicado, falso en caso contrario.
   */
  canApplyDiscount(discount, groupedData) {
    return discount.concept &&
      discount.userLimit > 0 &&
      groupedData.hasOwnProperty(discount.concept);
  }




  // /**
  //  * @dev calculate global totals
  //  * @param groupedData 
  //  * @returns 
  //  */
  // calculateGlobalTotals(groupedData, couponList) {
  //   let globalSubtotal = 0;
  //   let globalDiscount = 0;
  //   let globalTotalToPay = 0;
  //   let globalDiscountGlobalPercentage = 0;

  //   for (let key in groupedData) {
  //     globalSubtotal += groupedData[key].subtotal;
  //     globalDiscount += groupedData[key].totalDiscount;
  //     globalTotalToPay += groupedData[key].totalToPay;
  //   }


  //   /**
  //    * TODO: hay un tipo de descuento que se aplica a todo el carrito, no a un producto en particular
  //    * por lo que no se puede aplicar en el método applyDiscounts
  //    */
  //   if (couponList) {
  //     const discount = couponList.find((item: any) => item.concept === 'discount');
  //     if (discount && discount.userLimit > 0) {
  //       if (discount.type === "percentage") {
  //         globalDiscountGlobalPercentage = Math.ceil(globalSubtotal * (discount.value / 100));
  //       } else if (discount.type === "amount") {
  //         globalDiscountGlobalPercentage = Math.ceil(discount.value);
  //       }
  //     }
  //   }


  //   return {
  //     globalDiscountGlobalPercentage: Math.ceil(globalDiscountGlobalPercentage),
  //     globalSubtotal: Math.ceil(globalSubtotal),
  //     globalDiscount: Math.ceil(globalDiscount),
  //     globalTotalToPay: Math.ceil((globalTotalToPay - globalDiscountGlobalPercentage))
  //   };
  // }

  /**
 * Calcula los totales globales de los datos agrupados y aplica un descuento global si está disponible.
 * 
 * @param {Object} groupedData - Objeto que contiene los datos agrupados con subtotales y descuentos.
 * @param {Array} couponList - Lista de cupones que pueden contener un descuento global.
 * @returns {Object} Un objeto con el subtotal global, descuento global, descuento por porcentaje global y total a pagar global.
 */
  calculateGlobalTotals(groupedData, couponList) {
    let globalSubtotal = 0;
    let globalDiscount = 0;
    let globalTotalToPay = 0;
    let globalDiscountPercentage = 0;

    // Calcula subtotales y descuentos para cada grupo de datos.
    Object.values(groupedData).forEach((group: any) => {
      globalSubtotal += group.subtotal;
      globalDiscount += group.totalDiscount;
      globalTotalToPay += group.totalToPay;
    });

    // Calcula el descuento global si existe un cupón válido.
    if (couponList) {
      globalDiscountPercentage = this.calculateGlobalDiscount(couponList, globalSubtotal);
    }

    // Aplica el descuento global al total a pagar.
    globalTotalToPay -= globalDiscountPercentage;

    // Devuelve los totales globales.
    return {
      globalSubtotal: Math.ceil(globalSubtotal),
      globalDiscount: Math.ceil(globalDiscount),
      globalDiscountPercentage: Math.ceil(globalDiscountPercentage),
      globalTotalToPay: Math.ceil(globalTotalToPay)
    };
  }

  /**
   * Calcula el descuento global basado en la lista de cupones y el subtotal global.
   * 
   * @param {Array} couponList - Lista de cupones que pueden contener un descuento global.
   * @param {number} globalSubtotal - El subtotal global antes de aplicar el descuento.
   * @returns {number} El valor del descuento global.
   */
  calculateGlobalDiscount(couponList, globalSubtotal) {
    const globalCoupon = couponList.find(coupon => coupon.concept === 'discount' && coupon.userLimit > 0);
    if (globalCoupon) {
      if (globalCoupon.type === "percentage") {
        return globalSubtotal * (globalCoupon.value / 100);
      } else if (globalCoupon.type === "amount") {
        return globalCoupon.value;
      }
    }
    // Retorna 0 si no hay cupón válido o no aplica un descuento.
    return 0;
  }

}
