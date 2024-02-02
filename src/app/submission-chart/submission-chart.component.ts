import { Component } from '@angular/core';
import { DonutChartService } from '../services/donut-chart.service';

@Component({
  selector: 'app-submission-chart',
  templateUrl: './submission-chart.component.html',
  styleUrl: './submission-chart.component.scss'
})
export class SubmissionChartComponent {
  single: any[] = []; 
 

  constructor(private donutChartService: DonutChartService) { }

  ngOnInit(): void {
    this.donutChartService.getDummyDataSubmission().subscribe(
      (data) => {
        this.single = data;
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }
}


