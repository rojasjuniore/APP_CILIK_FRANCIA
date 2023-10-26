import { TestBed } from '@angular/core/testing';

import { MySalesBenefitsService } from './my-sales-benefits.service';

describe('MySalesBenefitsService', () => {
  let service: MySalesBenefitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySalesBenefitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
