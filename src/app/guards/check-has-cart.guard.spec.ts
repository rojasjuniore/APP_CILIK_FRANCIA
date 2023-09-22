import { TestBed } from '@angular/core/testing';

import { CheckHasCartGuard } from './check-has-cart.guard';

describe('CheckHasCartGuard', () => {
  let guard: CheckHasCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckHasCartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
