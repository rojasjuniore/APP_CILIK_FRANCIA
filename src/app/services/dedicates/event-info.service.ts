import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventInfoService {

  public storeOptions: any[] = [
    {
      isRecommended: true,
      img: 'assets/images/icons/plan-icon-1.png',
      title: 'Hotel y Evento',
      slug: 'hotel-event',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Full Pass',
      slug: 'full-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase por día',
      slug: 'day-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase de fin de semana',
      slug: 'weekend-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pases de Categoria',
      slug: 'category-pass',
      include: 'incluye texto',
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

  constructor() { }

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

}
