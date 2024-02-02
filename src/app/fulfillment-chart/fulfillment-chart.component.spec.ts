import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentChartComponent } from './fulfillment-chart.component';

describe('FulfillmentChartComponent', () => {
  let component: FulfillmentChartComponent;
  let fixture: ComponentFixture<FulfillmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FulfillmentChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FulfillmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
