// fulfillment.component.ts

import { Component, OnInit } from '@angular/core';
import { Fulfillment } from '../interfaces/Fulfillment';
import { Submission } from '../interfaces/Submission';
import { FulfillmentsService } from '../services/fulfillments.service';
import { SubmissionService } from '../services/submission.service';
import { BenchService } from '../services/bench-candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFulfillmentDialogComponent } from '../add-fulfillment-dialog/add-fulfillment-dialog.component';
import { FulfillmentStatus } from '../interfaces/FulfillmentStatus';

@Component({
  selector: 'app-fulfillment',
  templateUrl: './fulfillments.component.html',
  styleUrls: ['./fulfillments.component.scss'] // Adjust the path based on your project structure
})
export class FulfillmentsComponent implements OnInit {
  fulfillments : Fulfillment[] = [];
  submissions : Submission[] = [];
  // pageSize: number = 2;
  // currentPageIndex: number = 1;
  // allowedPageSizes: number[] = [2, 4, 6];
  constructor(private fulfillmentService : FulfillmentsService, private submissionService : SubmissionService, private benchService : BenchService, public dialog: MatDialog){}
  ngOnInit(): void {
    this.fetchFulfillments();
  }

  private fetchFulfillments(): void {
    this.fulfillmentService.getAllFulfillments().subscribe((data) =>{
      this.fulfillments = data;
      
      
      console.log("Fulfillments : " + this.fulfillments);

      this.fulfillments.sort((a, b) => {
        const dateA = new Date(a.fulfillmentDate).getTime();
        const dateB = new Date(b.fulfillmentDate).getTime();
        return dateB - dateA;
      });
      console.log("Fulfillments after sorting : " + this.fulfillments);
      this.submissionService.getAllSubmissions().subscribe((submissionData) => {
      this.submissions = submissionData;
      console.log("Submission : " + this.submissions);

      })

  });
  }
// submission -> drop down , status  , date
  openAddFulfillmentDialog(): void {
    const dialogRef = this.dialog.open(AddFulfillmentDialogComponent, {
      width: '400px',
      data: {
       displaySubmissions : this.submissions.map((submission) => (
        `${submission.submissionId}`
       )),
        fulfillmentStatus : Object.keys(FulfillmentStatus), 
        initialValues: {
          fulfillmentId: null,
          fulfillmentDate: '',
          fulfillmentStatus: '',
          submissionString: ''
        },
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      
        console.log(result.submission)
        const selectedSubmission = this.submissions.find((submission) => submission.submissionId == parseInt(result.submission));
        console.log(selectedSubmission)
        if (selectedSubmission) {
          result.submission = selectedSubmission;
          delete result.submissionString;
          console.log(result);
          this.fulfillmentService.createFulfillment(result).subscribe(
            (createdFulfillment) => {
              console.log('Fulfillment inserted successfully:', createdFulfillment);
              this.fetchFulfillments();
            },
            (error) => {
              console.error('Error inserting fulfillment:', error);
            }
          );
        } else {
          console.error('Selected submission not found');
        }
      }
    });
  }

    onEditingStart(event: any): void {

      // Open the edit dialog when editing starts
      const dialogRef = this.dialog.open(AddFulfillmentDialogComponent, {
          width: '400px',
          data: {
              displaySubmissions : this.submissions.map((submission) => (
                `${submission.submissionId}`
               )),
             fulfillmentStatus : Object.keys(FulfillmentStatus), 
             initialValues: {
               fulfillmentId: `${event.data.fulfillmentId}`, 
               fulfillmentDate: event.data.fulfillmentDate,
               fulfillmentStatus: event.data.fulfillmentStatus,
               submission : `${event.data.submission.submissionId}`
             },
           },
         });
         dialogRef.afterClosed().subscribe((result) => {

          
          if (result) {
            console.log('we have entered this dialogref closed part ')
            console.log(result);
            const selectedSubmission = this.submissions.find((submission) => submission.submissionId == parseInt(result.submission));
            console.log(selectedSubmission)
            if (selectedSubmission) {
              result.submission = selectedSubmission;
              // delete result.submissionString;
             
              console.log(result);
              this.fulfillmentService.updateFulfillment(result.fulfillmentId,result).subscribe(
                (updatedFulfillment) => {
                  console.log('Fulfillment inserted successfully:', updatedFulfillment);
                  this.fetchFulfillments();
                },
                (error) => {
                  console.error('Error inserting fulfillment:', error);
                }
              );
            } else {
              console.error('Selected submission not found');
            }
          }
        });
  } 
}