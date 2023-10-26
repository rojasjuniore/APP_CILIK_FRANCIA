import { TestBed } from '@angular/core/testing';

import { CartTotalService } from './cart-total.service';

describe('CartTotalService', () => {
  let service: CartTotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartTotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
