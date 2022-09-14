import { TestBed } from '@angular/core/testing';

import { TemporalTokenService } from './temporal-token.service';

describe('TemporalTokenService', () => {
  let service: TemporalTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
