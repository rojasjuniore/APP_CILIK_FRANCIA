import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventInfoService {

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
      weekend: true,
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

  getWeekendDays(){
    return this.eventDates.filter((date) => date.weekend);
  }

}
