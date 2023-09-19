import { Injectable } from '@angular/core';
import { EventInfoService } from './event-info.service';

@Injectable({
  providedIn: 'root'
})
export class PassesService {

  public passPrice = {
    'full-pass': [
      {
        ranges: {from: '2023-08-01', to: '2023-11-10'},
        price: 139
      },
      {
        ranges: {from: '2023-11-11', to: '2023-12-16'},
        price: 159
      },
      {
        ranges: {from: '2023-12-17', to: '2024-01-20'},
        price: 189
      },
    ],
    'weekend-pass': [
      {
        ranges: {from: '2023-08-01', to: '2023-11-10'},
        price: 89
      },
      {
        ranges: {from: '2023-11-11', to: '2023-12-16'},
        price: 119
      },
      {
        ranges: {from: '2023-12-17', to: '2024-01-20'},
        price: 149
      },
    ],
    'category-pass': {
      solo: [
        {
          ranges: {from: '2023-08-01', to: '2023-11-10'},
          price: 50
        },
        {
          ranges: {from: '2023-11-11', to: '2023-12-16'},
          price: 60
        },
        {
          ranges: {from: '2023-12-17', to: '2024-01-20'},
          price: 75
        },
      ],
      couple: [
        {
          ranges: {from: '2023-08-01', to: '2023-11-10'},
          price: 35
        },
        {
          ranges: {from: '2023-11-11', to: '2023-12-16'},
          price: 45
        },
        {
          ranges: {from: '2023-12-17', to: '2024-01-20'},
          price: 60
        },
      ],
      group: [
        {
          ranges: {from: '2023-08-01', to: '2023-11-10'},
          price: 15
        },
        {
          ranges: {from: '2023-11-11', to: '2023-12-16'},
          price: 20
        },
        {
          ranges: {from: '2023-12-17', to: '2024-01-20'},
          price: 25
        },
      ]
    },
    'day-pass': [
      {
        ranges: {from: '2023-08-01', to: '2023-11-10'},
        dayOfWeek: [30, 15, 15, 15, 25, 30, 50]
      },
      {
        ranges: {from: '2023-11-11', to: '2023-12-16'},
        dayOfWeek: [35, 18, 18, 18, 30, 35, 55]
      },
      {
        ranges: {from: '2023-12-17', to: '2024-01-20'},
        dayOfWeek: [40, 20, 20, 20, 35, 40, 60]
      },
    ]
  };

  constructor(
    private eventInfoSrv: EventInfoService,
  ) { }

  getPassPriceBySlug(slug: string){
    return this.passPrice[slug];
  }

  getPassPriceByDateAndSlug(date: string, slug: string){
    const priceList = this.getPassPriceBySlug(slug);
    const price = priceList.find((item: any) => {
      return this.eventInfoSrv.isDateInRange(date, item.ranges);
    });
    return price;
  }
}
