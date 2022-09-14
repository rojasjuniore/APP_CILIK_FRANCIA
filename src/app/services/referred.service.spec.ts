import { TestBed } from '@angular/core/testing';

import { ReferredService } from './referred.service';

describe('ReferredService', () => {
  let service: ReferredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
