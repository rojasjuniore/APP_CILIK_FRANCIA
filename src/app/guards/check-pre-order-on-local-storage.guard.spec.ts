import { TestBed } from '@angular/core/testing';

import { CheckPreOrderOnLocalStorageGuard } from './check-pre-order-on-local-storage.guard';

describe('CheckPreOrderOnLocalStorageGuard', () => {
  let guard: CheckPreOrderOnLocalStorageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckPreOrderOnLocalStorageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
