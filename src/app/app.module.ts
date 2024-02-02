import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { FulfillmentsComponent } from './fulfillments/fulfillments.component';
import { BenchCandidatesComponent } from './bench/bench.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { DxButtonModule, DxDataGridModule, DxLookupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {  MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { AddSubmissionDialogComponent } from './add-submission-dialog/add-submission-dialog.component';
import { AddBenchCandidateDialogComponent } from './add-bench-candidate-dialog/add-bench-candidate-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { UsersComponent } from './users/users.component';
import { AddFulfillmentDialogComponent } from './add-fulfillment-dialog/add-fulfillment-dialog.component'
import { AddUserDialogComponentComponent } from './add-user-dialog-component/add-user-dialog-component.component';
import { DefaultUserPageComponent } from './default-user-page/default-user-page.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddRequirementDialogComponent } from './add-requirement-dialog-component/add-requirement-dialog-component.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DonutChartService } from './services/donut-chart.service';
import { SubmissionChartComponent } from './submission-chart/submission-chart.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { environment } from '../environments/environment';
import { FulfillmentChartComponent } from './fulfillment-chart/fulfillment-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    RequirementsComponent,
    SubmissionsComponent,
    FulfillmentsComponent,
    BenchCandidatesComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    AddRequirementDialogComponent,
    AddBenchCandidateDialogComponent,
    UsersComponent,
    AddUserDialogComponentComponent,
    AddSubmissionDialogComponent,
    AddBenchCandidateDialogComponent,
    UsersComponent,
    AddFulfillmentDialogComponent,
    DefaultUserPageComponent,
    DonutChartComponent,
    SubmissionChartComponent,
    FulfillmentChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    DxDataGridModule,
    DxLookupModule,
    DxButtonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    DxSelectBoxModule,
    DxTemplateModule,
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
 ],
  providers: [DonutChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
