import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentsService {

  constructor() { }


  /**
 * 
 * @param installments 
 * @returns 
 */
  installmentsList(installments) {
    // console.log('installments', installments);
    let activeQuotaFound = false;
    return installments.map((cuota, index) => {
      const fechaCuota = moment(cuota.date);
      const isOverdue = moment().isAfter(fechaCuota) && cuota.status === "pending";

      if (!activeQuotaFound && (isOverdue || cuota.status === "pending" || cuota.status === "rejected")) {
        activeQuotaFound = true;
        return {
          ...cuota,
          index: index,
          isOverdue: isOverdue,
          isActiveToPay: true
        };
      }

      return {
        ...cuota,
        index: index,
        isOverdue: isOverdue,
        isActiveToPay: false
      };
    });

  }


  /**
   * @dev Comprobar si la fecha de pago es válida
   * @param createdAt 
   */
  isValidPaymentDate(installments) {
    if (installments.status == 'completed') return false;
    // console.log('createdAt', installments);
    const now = moment();  // Fecha y hora actual
    const createdAtMoment = moment(installments);

    // Comprobar si han pasado más de 48 horas
    if (now.diff(createdAtMoment, 'hours') > 48) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  }
}

