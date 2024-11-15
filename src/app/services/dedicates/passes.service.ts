import { Injectable } from '@angular/core';
import { EventInfoService } from './event-info.service';

@Injectable({
  providedIn: 'root',
})
export class PassesService {
  public passPrice = {
    'full-pass': [
      {
        ranges: { from: '2023-08-01', to: '2023-11-16' },
        price: 139,
      },
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        price: 159,
      },
      {
        ranges: { from: '2023-12-17', to: '2024-02-27' },
        price: 189,
      },
    ],
    'weekend-pass': [
      {
        ranges: { from: '2023-08-01', to: '2023-11-16' },
        price: 89,
      },
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        price: 119,
      },
      {
        ranges: { from: '2023-12-17', to: '2024-02-27' },
        price: 149,
      },
    ],
    'category-pass': [
      {
        ranges: { from: '2023-08-01', to: '2023-11-16' },
        soloist: 40,
        couples: 30,
        groups: 15,
      },
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        soloist: 40,
        couples: 30,
        groups: 15,
      },
      {
        ranges: { from: '2024-12-17', to: '2025-02-27' },
        soloist: 40,
        couples: 30,
        groups: 15,
      },
    ],
    // 'category-pass': [
    //   {
    //     ranges: { from: '2023-08-01', to: '2023-11-16' },
    //     soloist: 50,
    //     couples: 35,
    //     groups: 15
    //   },
    //   {
    //     ranges: { from: '2023-11-17', to: '2023-12-16' },
    //     soloist: 60,
    //     couples: 45,
    //     groups: 20
    //   },
    //   {
    //     ranges: { from: '2023-12-17', to: '2024-02-27' },
    //     soloist: 75,
    //     couples: 60,
    //     groups: 25
    //   },
    // ],
    'day-pass': [
      {
        ranges: { from: '2023-08-01', to: '2023-11-16' },
        dayOfWeek: [30, 15, 15, 15, 25, 30, 50],
      },
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        dayOfWeek: [35, 18, 18, 18, 30, 35, 55],
      },
      {
        ranges: { from: '2023-12-17', to: '2024-02-27' },
        dayOfWeek: [40, 20, 20, 20, 35, 40, 60],
      },
    ],
  };

  constructor(private eventInfoSrv: EventInfoService) {}

  getPassPriceBySlug(slug: string) {
    return this.passPrice[slug];
  }

  getPassPriceByDateAndSlug(date: string, slug: string) {
    const priceList = this.getPassPriceBySlug(slug);
    const price = priceList.find((item: any) => {
      return this.eventInfoSrv.isDateInRange(date, item.ranges);
    });
    return price;
  }
}
