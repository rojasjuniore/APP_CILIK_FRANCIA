import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventInfoService {

  public storeOptions: any[] = [
    {
      isRecommended: true,
      img: 'assets/img/hotel.jpg',
      key: "hotelAndEvent",
      title: 'plan.hotelAndEvent.title',
      slug: 'hotel-event',
      include: 'plan.hotelAndEvent.include',
      notInclude: 'plan.hotelAndEvent.notInclude',
      important: null,
      headerColor: 'red',
      icons: [
        "assets/img/icon-bed.png",
        "assets/img/icon-ticket.png"
      ],
      available: true,
      wantButton: "plan.hotelAndEvent.wantButton",
    },
    {
      isRecommended: false,
      img: 'assets/img/full.jpg',
      key: "fullPass",
      title: 'plan.fullPass.title',
      slug: 'full-pass',
      include: 'plan.fullPass.include',
      notInclude: 'plan.fullPass.notInclude',
      important: 'plan.fullPass.important',
      headerColor: 'red',
      icons: [
        "assets/img/icon-full-pass.png",
      ],
      available: true,
      wantButton: "plan.fullPass.wantButton",
    },
    {
      isRecommended: false,
      img: 'assets/img/dia.jpg',
      key: "passPerDay",
      title: 'plan.passPerDay.title',
      slug: 'day-pass',
      include: 'plan.passPerDay.include',
      notInclude: 'plan.passPerDay.notInclude',
      important: null,
      headerColor: 'red',
      icons: [
        "assets/img/icon-ticket.png"
      ],
      available: false,
      wantButton: "plan.passPerDay.wantButton",
    },
    {
      isRecommended: false,
      img: 'assets/img/fiestas.jpg',
      key: "weekendPass",
      title: 'plan.weekendPass.title',
      slug: 'weekend-pass',
      include: 'plan.weekendPass.include',
      notInclude: 'plan.weekendPass.notInclude',
      important: null,
      headerColor: 'red',
      icons: [
        "assets/img/icon-ticket.png"
      ],
      available: true,
      wantButton: "plan.weekendPass.wantButton",
    },
    {
      isRecommended: false,
      img: 'assets/img/categorias.jpeg',
      key: "categoryPass",
      title: 'plan.categoryPass.title',
      slug: 'category-pass',
      include: 'plan.categoryPass.include',
      notInclude: 'plan.categoryPass.notInclude',
      important: null,
      headerColor: 'red',
      icons: [
        "assets/img/icon-pass-category.png"
      ],
      available: true,
      wantButton: "plan.hotelAndEvent.wantButton",
    },
  ];

  /** Fecha tope para días extras antes */
  public beforeLimit = '2024-01-29';

  /** Fecha tope para días extras después */
  public afterLimit = '2024-02-18';

  /**
   * Días del evento
   */
  public eventDates: any[] = [
    {
      date: '2024-02-05',
      weekend: false,
    },
    {
      date: '2024-02-06',
      weekend: false,
    },
    {
      date: '2024-02-07',
      weekend: false,
    },
    {
      date: '2024-02-08',
      weekend: false,
    },
    {
      date: '2024-02-09',
      weekend: false,
    },
    {
      date: '2024-02-10',
      weekend: true,
    },
    {
      date: '2024-02-11',
      weekend: true,
    },
  ];

  public bankTransferOptionList = [
    {
      label: 'Bancolombia',
      value: 'Colombia',
      accountTitle: 'Fundación Ballet Nacional El Firulete',
      nrAccount: '10570863272 Ahorros',
      swift: 'COLOCOBM',
      status: true,
      slug: 'bancolombia'
    },
    {
      label: 'ADCB BANK',
      value: 'Dubai',
      accountTitle: 'BNF FZ LLC',
      nrAccount: '957211920010',
      swift: 'ADCBAEAA',
      status: true,
      slug: 'adcb-bank'
    }
  ];

  constructor(
    private translate: TranslateService
  ) { }

  getStoreOptionBySlug(slug: string){
    return this.storeOptions.find((item) => item.slug === slug);
  }

  getStartEventDate(){
    return this.eventDates[0];
  }

  getEndEventDate(){
    return this.eventDates[this.eventDates.length - 1];
  }

  getWeekendDays(){
    return this.eventDates.filter((date) => date.weekend);
  }

  isDateInRange(date: string, ranges: any){
    const dateMoment = moment(date);
    const fromMoment = moment(ranges.from);
    const toMoment = moment(ranges.to);

    return dateMoment.isBetween(fromMoment, toMoment, null, '[]');
  }

}
