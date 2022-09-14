import { TestBed } from '@angular/core/testing';

import { Sweetalert2stepsService } from './sweetalert2steps.service';

describe('Sweetalert2stepsService', () => {
  let service: Sweetalert2stepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sweetalert2stepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
