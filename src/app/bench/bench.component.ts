import { Component, NgModule, OnInit } from '@angular/core';
import { BenchCandidate } from '../interfaces/Bench';
import { BenchService } from '../services/bench-candidate.service';
import { Skill } from '../interfaces/Skill';
import { MatDialog } from '@angular/material/dialog';
import { AddBenchCandidateDialogComponent } from '../add-bench-candidate-dialog/add-bench-candidate-dialog.component';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';
import { BenchCandidateStatus } from '../interfaces/BenchCandidateStatus';
import { Role } from '../interfaces/Role';
@Component({
  selector: 'app-bench-candidates',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss'],
})
export class BenchCandidatesComponent implements OnInit {
  benchCandidates: BenchCandidate[] = [];
  users: User[] = [];
  constructor( private benchService : BenchService , public dialog: MatDialog , private userService : UserService) {
  }
  ngOnInit(): void {
    this.fetchCandidates();
  }
  private fetchCandidates(): void {
    this.benchService.getAllBenchCandidates().subscribe((data) => {
      this.benchCandidates = data;
      console.log("Bench Candidate Data",this.benchCandidates);
    this.userService.getAllUsers().subscribe((userData) => {
      this.users = userData;
      console.log("User data",this.users);
    });
  });
  }
  openAddBenchCandidateDialog() : void{
    const dialogRef = this.dialog.open(AddBenchCandidateDialogComponent, {
      width: '400px',
      data: {
        candidateStatuses: Object.keys(BenchCandidateStatus),
        benchManagerNames : this.users.filter(user => user.role == Role.BENCH_MANAGER).map((user) => user.name),
        initialValues:{
          id:'',
          candidateName :'',
          candidateStatus: '',
          benchCandidateSkills : '',
          startDate:'',
          endDate:'',
          benchManagerName : null,
        }
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedBenchManager = this.users.find((user) => user.name === result.benchManagerName);
        if(selectedBenchManager){
          result.benchManager = selectedBenchManager
          delete result.benchManagerName;
          console.log("Result",result);
          this.benchService.addCandidate(result).subscribe(
            (createdBenchCandidate) =>{
              console.log("bench candidate added successfully" , createdBenchCandidate);
              this.fetchCandidates();
            },
            (error) =>{
              console.error("error while creating candidate" , error);
            }
          );
        }else{
          console.error('selected bench manager not found');
        }
      }
    });
  }
  onEditingStart(event: any): void {
    console.log("Edit button clicked");
    //open dialog box
    console.log("Event data", event.data);
    const dialogRef = this.dialog.open(AddBenchCandidateDialogComponent, {
        width: '400px',
        data: {
          candidateStatuses: Object.keys(BenchCandidateStatus),
          benchManagerNames : this.users.map((user) => user.name),
          initialValues:{
            id:event.data.id,
            candidateName :event.data.candidateName,
            candidateStatus: event.data.candidateStatus,
            startDate:event.data.startDate,
            endDate:event.data.endDate,
            benchCandidateSkills : event.data.benchCandidateSkills,
            benchManagerName : event.data.benchManager.name,
          }
        },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedBenchManager = this.users.find((user) => user.name === result.benchManagerName);
        if (selectedBenchManager) {
          result.benchManager = selectedBenchManager
          delete result.benchManagerName;
          console.log("Result",result);
          this.benchService.updateCandidate(result.id,result).subscribe(
            (updatedCandidate) => {
              console.log('Bench Candidate updated successfully:', updatedCandidate);
              this.fetchCandidates();
            },
            (error) => {
              console.error('Error updating bench candidate:', error);
            }
          );
        } else {
          console.error('Selected bench manager not found');
        }
      }
    });
}
}