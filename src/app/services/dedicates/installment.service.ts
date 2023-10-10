import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  public installmentDateLimit = '2023-02-02';

  public installments = [
    {
      installmentOrder: 0,
      ranges: {from: '2023-08-01', to: '2023-11-09'},
      limit: {year: 2023, month: 12, day: 2},
      nroInstallments: 4,
    },
    {
      installmentOrder: 1,
      ranges: {from: '2023-11-10', to: '2023-12-15'},
      limit: {year: 2023, month: 12, day: 2},
      nroInstallments: 3,
    },
    {
      installmentOrder: 2,
      ranges: {from: '2023-12-16', to: '2024-01-19'},
      limit: {year: 2023, month: 12, day: 2},
      nroInstallments: 2,
    },
  ]

  constructor() { }

  isDateInRange(date: string, ranges: any){
    const dateMoment = moment(date);
    const fromMoment = moment(ranges.from);
    const toMoment = moment(ranges.to);

    return dateMoment.isBetween(fromMoment, toMoment, null, '[]');
  }

  getInstallmentByDate(date: string){
    const installments: any[] = [{
      date: date,
      paymentMethod: null,
      status: 'pending',
      amount: 0,
    }];

    const snapshot = this.installments.find((item) => {
      return this.isDateInRange(date, item.ranges);
    });

    if(!snapshot) return installments;

    const dateLimit = moment()
    .set('date', snapshot.limit.day)
    .set('month', snapshot.limit.month - 1)
    .set('year', snapshot.limit.year)
    .format('YYYY-MM-DD');
    // console.log('dateLimit', dateLimit);

    for (let index = 1; index < snapshot.nroInstallments; index++) {
      let snapshotDate = moment(date).add(index, 'month').format('YYYY-MM-DD');

      if(moment(snapshotDate).isAfter(dateLimit)){
        snapshotDate = moment(snapshotDate).set('date', snapshot.limit.day).format('YYYY-MM-DD');
      }

      installments.push({
        date: snapshotDate,
        paymentMethod: null,
        status: 'pending',
        amount: 0,
      });
    }

    console.log('snapshot', snapshot);
    console.log('installments', installments);

    return installments;
  }

}
