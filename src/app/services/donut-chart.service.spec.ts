import { TestBed } from '@angular/core/testing';

import { DonutChartService } from './donut-chart.service';

describe('DonutChartService', () => {
  let service: DonutChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonutChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
