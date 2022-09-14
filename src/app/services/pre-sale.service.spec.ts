import { TestBed } from '@angular/core/testing';

import { PreSaleService } from './pre-sale.service';

describe('PreSaleService', () => {
  let service: PreSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
