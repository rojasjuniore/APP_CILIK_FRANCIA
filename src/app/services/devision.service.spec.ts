import { TestBed } from '@angular/core/testing';

import { DevisionService } from './devision.service';

describe('DevisionService', () => {
  let service: DevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
