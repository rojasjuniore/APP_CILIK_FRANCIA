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

  // public installments = [
  //   {
  //     installmentOrder: 0,
  //     ranges: { from: '2023-08-01', to: '2023-11-09' },
  //     limit: { year: 2023, month: 12, day: 2 },
  //     nroInstallments: 4,
  //   },
  //   {
  //     installmentOrder: 1,
  //     ranges: { from: '2023-11-10', to: '2023-12-15' },
  //     limit: { year: 2023, month: 12, day: 2 },
  //     nroInstallments: 3,
  //   },
  //   {
  //     installmentOrder: 2,
  //     ranges: { from: '2023-12-16', to: '2024-01-19' },
  //     limit: { year: 2023, month: 12, day: 2 },
  //     nroInstallments: 2,
  //   },
  // ]

  constructor() { }


  /**
   * @dev  Método para calcular las cuotas
   * @param todayDate 
   * @returns 
   */
  calculateQuotas(todayDate: string): Quota[] {
    const today = moment(todayDate);
    const quotas: Quota[] = [];

    if (today.isBefore(moment('2023-11-10'))) {
      const firstQuotaDate = today.clone().add(1, 'month').date(2);
      quotas.push({ date: firstQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
      quotas.push({ date: firstQuotaDate.clone().add(1, 'month').format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 2 });
      quotas.push({ date: firstQuotaDate.clone().add(2, 'months').format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 3 });
    } else if (today.isBefore(moment('2023-12-16'))) {
      const firstQuotaDate = today.clone().add(1, 'month').date(2);
      quotas.push({ date: firstQuotaDate.format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
      quotas.push({ date: firstQuotaDate.clone().add(1, 'month').format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 2 });
    } else if (today.isBefore(moment('2023-01-20'))) {
      quotas.push({ date: today.clone().add(1, 'month').date(2).format('YYYY-MM-DD'), status: 'pending', amount: 0, paymentMethod: null, quota: 1 });
    }

    return quotas;
  }



  // /**
  //  * 
  //  * @param date 
  //  * @param ranges 
  //  * @returns 
  //  */
  // isDateInRange(date: string, ranges: any) {
  //   const dateMoment = moment(date);
  //   const fromMoment = moment(ranges.from);
  //   const toMoment = moment(ranges.to);

  //   return dateMoment.isBetween(fromMoment, toMoment, null, '[]');
  // }


  // /**
  //  * 
  //  * @param date 
  //  * @returns 
  //  */
  // getInstallmentByDate(date: string) {
  //   const installments: any[] = [{
  //     quota: 1,
  //     date: date,
  //     paymentMethod: null,
  //     status: 'pending',
  //     amount: 0,
  //   }];

  //   const snapshot = this.installments.find((item) => {
  //     return this.isDateInRange(date, item.ranges);
  //   });

  //   if (!snapshot) return installments;

  //   const dateLimit = moment()
  //     .set('date', snapshot.limit.day)
  //     .set('month', snapshot.limit.month - 1)
  //     .set('year', snapshot.limit.year)
  //     .format('YYYY-MM-DD');
  //   // console.log('dateLimit', dateLimit);

  //   for (let index = 1; index < snapshot.nroInstallments; index++) {
  //     let snapshotDate = moment(date).add(index, 'month').format('YYYY-MM-DD');

  //     if (moment(snapshotDate).isAfter(dateLimit)) {
  //       snapshotDate = moment(snapshotDate).set('date', snapshot.limit.day).format('YYYY-MM-DD');
  //     }

  //     installments.push({
  //       quota: index + 1,
  //       date: snapshotDate,
  //       paymentMethod: null,
  //       status: 'pending',
  //       amount: 0,
  //     });
  //   }

  //   console.log('snapshot', snapshot);
  //   console.log('installments', installments);

  //   return installments;
  // }






  // addQuota(date) {
  //   quotas.push({
  //     "date": date.format('YYYY-MM-DD'),
  //     "status": "pending",
  //     "amount": 34
  //   });
  // }


}
