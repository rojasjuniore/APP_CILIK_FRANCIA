import { TestBed } from '@angular/core/testing';

import { CustomizedWalletConnectService } from './customized-wallet-connect.service';

describe('CustomizedWalletConnectService', () => {
  let service: CustomizedWalletConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizedWalletConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
