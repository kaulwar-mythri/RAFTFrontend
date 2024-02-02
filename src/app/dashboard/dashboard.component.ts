import { Component } from '@angular/core';
import { dashboardData } from './dash-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashData = dashboardData;
}
