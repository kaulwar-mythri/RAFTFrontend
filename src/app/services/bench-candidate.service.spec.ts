import { TestBed } from '@angular/core/testing';

import { BenchService } from './bench-candidate.service';

describe('BenchCandidateService', () => {
  let service: BenchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
