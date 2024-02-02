import { TestBed } from '@angular/core/testing';

import { FulfillmentsService } from './fulfillments.service';

describe('FulfillmentsService', () => {
  let service: FulfillmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FulfillmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
