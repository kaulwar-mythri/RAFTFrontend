import { Component } from '@angular/core';
import { DonutChartService } from '../services/donut-chart.service';

@Component({
  selector: 'app-fulfillment-chart',
  templateUrl: './fulfillment-chart.component.html',
  styleUrl: './fulfillment-chart.component.scss'
})
export class FulfillmentChartComponent {
  single: any[] = [];
  constructor(private donutChartService: DonutChartService) { }
  ngOnInit(): void {
    this.donutChartService.getDummyDataFulfillment().subscribe(
      (data) => {
        this.single = data;
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }
}
