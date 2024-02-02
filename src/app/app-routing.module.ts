import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { FulfillmentsComponent } from './fulfillments/fulfillments.component';
import { BenchCandidatesComponent } from './bench/bench.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { Role } from './interfaces/Role';
import { DefaultUserPageComponent } from './default-user-page/default-user-page.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { SubmissionChartComponent } from './submission-chart/submission-chart.component';

const routes: Routes = [
  {
    path: 'donut-chart', component: DonutChartComponent,
  },
  
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'requirements', component: RequirementsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'submissions', component: SubmissionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fulfillments', component: FulfillmentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'bench', component: BenchCandidatesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: {required_roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'defaultPage',
    component: DefaultUserPageComponent
  },
  {
    path: 'chart-submission', component: SubmissionChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
