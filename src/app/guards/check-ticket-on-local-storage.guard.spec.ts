import { TestBed } from '@angular/core/testing';

import { CheckTicketOnLocalStorageGuard } from './check-ticket-on-local-storage.guard';

describe('CheckTicketOnLocalStorageGuard', () => {
  let guard: CheckTicketOnLocalStorageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckTicketOnLocalStorageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
