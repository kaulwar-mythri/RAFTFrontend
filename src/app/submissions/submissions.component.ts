import { Component } from '@angular/core';
import {Submission } from '../interfaces/Submission';
import { SubmissionService } from '../services/submission.service';
import { Requirement } from '../interfaces/Requirement';
import { BenchCandidate } from '../interfaces/Bench';
import { RequirementService } from '../services/requirement.service';
import { MatDialog } from '@angular/material/dialog';
import { BenchService } from '../services/bench-candidate.service';
import { AddSubmissionDialogComponent } from '../add-submission-dialog/add-submission-dialog.component';
import { SubmissionStatus } from '../interfaces/SubmissionStatus';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss'
})
export class SubmissionsComponent {
  submissions:Submission[] = [];
  benchCandidates: BenchCandidate[] = [];
  requirements:Requirement[]=[];
  selectedSubmission!:Submission;
  constructor(private submissionService: SubmissionService,private requirementService : RequirementService,private benchCandidateService: BenchService,public dialog: MatDialog){};
  
  ngOnInit(){
    this.fetchSubmission();
  }

  private fetchSubmission() : void{
     this.submissionService.getAllSubmissions().subscribe(
      (data) => {
              this.submissions = data;
              console.log("submissions in submissions",this.submissions);
            this.benchCandidateService.getAllBenchCandidates().subscribe((benchData)=>{
              this.benchCandidates=benchData;
              console.log("bench candidates in submissions",this.benchCandidates);
            });
            this.requirementService.getAllRequirements().subscribe((requirementData)=>{
              this.requirements=requirementData;
              console.log("Requirements in submissions", this.requirements);
            });
      });
  }
  openAddSubmissionDialog(): void {
    const dialogRef = this.dialog.open(AddSubmissionDialogComponent, {
      width: '400px',
      data: {
        submissionStatuses: Object.keys(SubmissionStatus),
        benchCandidateNames: this.benchCandidates.map((bench) => bench.candidateName),
        requirementIds:this.requirements.map((req)=>req.requirementId),
        initialValues: {
          submissionId: null,
          submissionDate: '',
          feedback:'',
          submissionStatus:'',
          requirementId:'',
          benchCandidateName: null,
        },
      },
    });
     dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedRequirement=this.requirements.find((requirement)=>requirement.requirementId==result.requirementId);
        const selectedBenchCandidate = this.benchCandidates.find((benchCandidate) => benchCandidate.candidateName === result.benchCandidateName);
        console.log("Selected Bench Candidate: ",selectedBenchCandidate);
        if (selectedBenchCandidate) {
          result.benchCandidate= selectedBenchCandidate
          delete result.benchCandidateName;
          
          console.log("Result",result);
        } else {
          console.error('Selected bench candidate not found');
        }
if(selectedRequirement){
  result.requirement=selectedRequirement;
  delete result.requirementId;
  console.log(result);
}
else{
  console.error("Selected requirement not found");
}
          this.submissionService.createSubmission(result).subscribe(
            (createdSubmission) => {
              console.log('Submission inserted successfully:', createdSubmission);
              this.fetchSubmission();
            },
            (error) => {
              console.error('Error inserting submission:', error);
            }
          );
      }
    });
  }
      onEditingStart(event: any): void {
        const dialogRef = this.dialog.open(AddSubmissionDialogComponent, {
            width: '400px',
            data: {
              submissionStatuses: Object.keys(SubmissionStatus),
              benchCandidateNames: this.benchCandidates.map((bench) => bench.candidateName),
              requirementIds:this.requirements.map((req)=>req.requirementId),
              initialValues: {
                submissionId: event.data.submissionId,
                submissionDate: event.data.submissionDate,
                feedback:event.data.feedback,
                submissionStatus:event.data.submissionStatus,
                requirementId:event.data.requirement.requirementId,
                benchCandidateName: event.data.benchCandidate.candidateName
              },
            },
           });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            const selectedRequirement=this.requirements.find((requirement)=>requirement.requirementId===result.requirementId);
            const selectedBenchCandidate = this.benchCandidates.find((benchCandidate) => benchCandidate.candidateName === result.benchCandidateName);
            console.log("Selected Bench Candidate: ",selectedBenchCandidate);
                    if (selectedBenchCandidate) {
                      result.benchCandidate= selectedBenchCandidate
                      delete result.benchCandidateName;
                      console.log("Result",result);
                    } else {
                      console.error('Selected bench candidate not found');
                    }

            if(selectedRequirement){
              result.requirement=selectedRequirement;
              delete result.requirementId;
            
            }
            else{
              console.error("Selected requirement not found");
            }

            this.submissionService.updateSubmission(result.submissionId,result).subscribe(
              (createdSubmission) => {
                console.log('Submission updated successfully:', createdSubmission);
                this.fetchSubmission();
              },
              (error) => {
                console.error('Error updating submission:', error);
              }
            );
         
        }
      });
    }
}






















