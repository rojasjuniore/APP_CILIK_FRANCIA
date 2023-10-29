import { Injectable } from '@angular/core';
import moment from 'moment';

interface Quota {
  quota: number;
  date: string;
  status: 'pending';
  amount: number;
  paymentMethod: any;
}

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  public installmentDateLimit = '2023-02-02';



  constructor() { }


  /**
  * Función para calcular las fechas de las cuotas de pago basadas en la fecha actual.
  * @param todayDate - La fecha actual en formato de cadena 'YYYY-MM-DD'.
  * @returns Un array de objetos que representan las cuotas a pagar.
  */
  calculateQuotas(todayDate: string): Quota[] {
    // Convertir la fecha actual a un objeto moment para manipulación fácil de fechas.
    const today = moment(todayDate);

    // Inicializar el array que contendrá las cuotas.
    const quotas: Quota[] = [];

    // Primer caso: Si la fecha actual es antes del 10 de noviembre de 2023.
    if (today.isBefore(moment('2023-11-10'))) {
      // Calcular la fecha para la primera cuota, asegurándose de que haya al menos 30 días de diferencia y no pase del 2 del mes siguiente.
      const firstQuotaDate = moment.max(today.clone().add(30, 'days'), today.clone().add(1, 'month').date(2));
      // Calcular las fechas para las cuotas siguientes con la misma lógica.
      const secondQuotaDate = moment.max(firstQuotaDate.clone().add(30, 'days'), firstQuotaDate.clone().add(1, 'month').date(2));
      const thirdQuotaDate = moment.max(secondQuotaDate.clone().add(30, 'days'), secondQuotaDate.clone().add(1, 'month').date(2));
      const finalQuotaDate = moment.min(thirdQuotaDate.clone().add(30, 'days'), moment('2024-02-02'));

      // Agregar las cuotas al array de cuotas.
      quotas.push({ date: today.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
      quotas.push({ date: firstQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 2 });
      quotas.push({ date: secondQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 3 });
      quotas.push({ date: finalQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 4 });
    }
    // Segundo caso: Si la fecha actual es antes del 16 de diciembre de 2023.
    else if (today.isBefore(moment('2023-12-16'))) {
      // Calcular las fechas para las cuotas con la misma lógica que en el primer caso.
      const firstQuotaDate = moment.max(today.clone().add(30, 'days'), today.clone().add(1, 'month').date(2));
      const secondQuotaDate = moment.max(firstQuotaDate.clone().add(30, 'days'), firstQuotaDate.clone().add(1, 'month').date(2));
      const finalQuotaDate = moment.min(secondQuotaDate.clone().add(30, 'days'), moment('2024-02-02'));

      // Agregar las cuotas al array de cuotas.
      quotas.push({ date: today.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
      quotas.push({ date: firstQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 2 });
      quotas.push({ date: finalQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 3 });
    }
    // Tercer caso: Si la fecha actual es antes del 20 de enero de 2024.
    else if (today.isBefore(moment('2024-01-20'))) {
      // Agregar las cuotas al array de cuotas, la segunda cuota es fija al 2 de febrero de 2024.
      quotas.push({ date: today.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
      quotas.push({ date: moment('2024-02-02').format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 2 });
    }

    // Retornar el array de cuotas.
    return quotas;
  }



}
