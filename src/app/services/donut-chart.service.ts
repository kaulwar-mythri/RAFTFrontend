import { Injectable } from '@angular/core';
import { Requirement } from '../interfaces/Requirement';
import { RequirementService } from './requirement.service';
import { Observable } from 'rxjs';
import { Submission } from '../interfaces/Submission';
import { SubmissionService } from './submission.service';
import { SubmissionStatus } from '../interfaces/SubmissionStatus';

@Injectable({
  providedIn: 'root'
})
export class DonutChartService {
  requirements: Requirement[] = [];
  donutChartData: number[] = [0, 0];
  submission: Submission[] = [];
  donutChartDataSubmission: number[] = [0,0,0];

  constructor(private requirementService: RequirementService , private submissionService: SubmissionService) {}

  private fetchRequirements(): Observable<number[]> {
    return new Observable<number[]>((observer) => {
      this.requirementService.getAllRequirements().subscribe(
        (data) => {
          this.requirements = data;

          let totalFulfilled = 0;
          let totalRequired = 0;

          this.requirements.forEach((requirement) => {
            totalFulfilled += requirement.fulfilledNo;
            totalRequired += requirement.requiredNo;
          });

          const fulfilledPercentage = (totalFulfilled / totalRequired) * 100;
          const remainingPercentage = 100 - fulfilledPercentage;
          // console.log(totalFulfilled);
          this.donutChartData = [fulfilledPercentage, remainingPercentage];
          observer.next(this.donutChartData);
          observer.complete();
        },
        (error) => {
          console.error('Error loading data', error);
          observer.error(error);
        }
      );
    });
  }

  private fetchSubmission(): Observable<number[]>{
    return new Observable<number[]>((observer) => {
      this.submissionService.getAllSubmissions().subscribe(
        (data) => {
          this.submission = data;
          let totalHold = 0;
          let totalAccepted = 0;
          let totalRejected = 0;

          this.submission.forEach((submission) => {
            if (submission.submissionStatus === SubmissionStatus.HOLD) {
              totalHold += 1; // Increment count for 'HOLD' submissions
            }
            else if(submission.submissionStatus === SubmissionStatus.ACCEPTED){
              totalAccepted +=1;
            }
            else {
              totalRejected+=1;
            }
          });
          console.log("hi");

          const totalHoldPercentage = (totalHold / (totalHold + totalAccepted + totalRejected)) * 100;
          const totalAcceptedPercentage  = (totalAccepted/  (totalHold + totalAccepted + totalRejected)) * 100;
          const totalRejectedPercentage  = (totalRejected/  (totalHold + totalAccepted + totalRejected)) * 100;
          // console.log(totalFulfilled);
          this.donutChartDataSubmission = [totalHoldPercentage, totalAcceptedPercentage,totalRejectedPercentage];
          observer.next(this.donutChartDataSubmission);
          observer.complete();
        },
        (error) => {
          console.error('Error loading data', error);
          observer.error(error);
        }
        
      )
    });  
  }


  getDummyDataSubmission(): Observable<{ name: string, value: number }[]> {
    return new Observable<{ name: string, value: number }[]>((observer) => {
      this.fetchSubmission().subscribe(
        (data) => {
          // console.log(this.donutChartData[0]);
          // console.log(this.donutChartData[1]);
          observer.next([
            { name: 'HOLD', value: this.donutChartDataSubmission[0] },
            { name: 'ACCEPTED', value: this.donutChartDataSubmission[1] },
            {name: 'REJECTED', value: this.donutChartDataSubmission[2] }
          ]);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getDummyData(): Observable<{ name: string, value: number }[]> {
    return new Observable<{ name: string, value: number }[]>((observer) => {
      this.fetchRequirements().subscribe(
        (data) => {
          // console.log(this.donutChartData[0]);
          // console.log(this.donutChartData[1]);
          observer.next([
            { name: 'Fulfillment achieved', value: this.donutChartData[0] },
            { name: 'Fulfillment left', value: this.donutChartData[1] }
          ]);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
