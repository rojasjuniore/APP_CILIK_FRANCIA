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
    },
    {
      date: '2024-02-06',
    },
    {
      date: '2024-02-07',
    },
    {
      date: '2024-02-08',
    },
    {
      date: '2024-02-09',
    },
    {
      date: '2024-02-10',
    },
    {
      date: '2024-02-11',
    },
  ];

  constructor() { }
}
