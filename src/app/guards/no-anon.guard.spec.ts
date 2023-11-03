import { TestBed } from '@angular/core/testing';

import { NoAnonGuard } from './no-anon.guard';

describe('NoAnonGuard', () => {
  let guard: NoAnonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAnonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
