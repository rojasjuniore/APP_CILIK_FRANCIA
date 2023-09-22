import { TestBed } from '@angular/core/testing';

import { TucompraService } from './tucompra.service';

describe('TucompraService', () => {
  let service: TucompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TucompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
