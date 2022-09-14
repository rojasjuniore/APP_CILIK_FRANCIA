import { TestBed } from '@angular/core/testing';

import { OrdersStatsService } from './orders-stats.service';

describe('OrdersStatsService', () => {
  let service: OrdersStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
