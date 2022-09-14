import { TestBed } from '@angular/core/testing';

import { PreReserveService } from './pre-reserve.service';

describe('PreReserveService', () => {
  let service: PreReserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreReserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
