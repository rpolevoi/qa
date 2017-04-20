import { TestBed, inject } from '@angular/core/testing';

import { QAService } from './qa.service';

describe('QaserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QaserviceService]
    });
  });

  it('should ...', inject([QaserviceService], (service: QaserviceService) => {
    expect(service).toBeTruthy();
  }));
});
