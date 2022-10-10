import { TestBed } from '@angular/core/testing';

import { CheckAdminRoleGuard } from './check-admin-role.guard';

describe('CheckAdminRoleGuard', () => {
  let guard: CheckAdminRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
