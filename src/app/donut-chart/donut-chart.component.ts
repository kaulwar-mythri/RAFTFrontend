import { Component, OnInit } from '@angular/core';
import { DonutChartService } from '../services/donut-chart.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  single: any[] = []; 
 

  constructor(private donutChartService: DonutChartService) { }

  ngOnInit(): void {
    this.donutChartService.getDummyData().subscribe(
      (data) => {
        this.single = data;
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }
}
