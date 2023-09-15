import { TestBed, inject } from '@angular/core/testing';

import { CustomizationfileService } from './customizationfile.service';

describe('CustomizationfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomizationfileService]
    });
  });

  it('should be created', inject([CustomizationfileService], (service: CustomizationfileService) => {
    expect(service).toBeTruthy();
  }));
});
