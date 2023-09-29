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
      img: 'assets/images/icons/plan-icon-1.png',
      title: 'general.hotelAndEvent',
      slug: 'hotel-event',
      include: 'HOTEL OFICIAL WLDC CON ACCESOS CON ACCESOS AL EVENTO INCLUIDOS',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Full Pass',
      slug: 'full-pass',
      include: 'Accesos a todas las actividades desde el 5 al 11 de Febrero. Concierto, Fiestas, Talleres, Conferencias, Competencia, Gran Final, Ultimate Championship, Music Park Fest, Pool Partys, Playas, Gimnasio. NOTA: TODOS  LOS COMPETIDORES DEBERAN CONTAR CON UN FULL PASS PARA ACCEDER AL EVENTO',
      noInclude: '-VIPPoolparties - Gala dinner - Bootcamp especiales con profesiores internacionales - no incluye categorias para competir',
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'general.passPerDay',
      slug: 'day-pass',
      include: 'TODAS LAS ACTIVIDADES DE ESTE DÍA',
      noInclude: '-VIPPoolparties - Gala dinner - Bootcamp especiales con profesiores internacionales - no incluye categorias para competir',
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'general.weekendPass',
      slug: 'weekend-pass',
      include: 'Accesso a todas las actividades desde el 9 al 11 de Febrero. Concierto, Fiestas, Talleres, Conferencias, Competencia, Gran Final, Ultimate Championship, Music Park Fest, Pool Partys, Playas, Gimnasio',
      noInclude: '-VIPPoolparties - Gala dinner - Bootcamp especiales con profesiores internacionales - no incluye categorias para competir',
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'general.categoryPasses',
      slug: 'category-pass',
      include: '',
      noInclude: null,
      headerColor: 'red',
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
