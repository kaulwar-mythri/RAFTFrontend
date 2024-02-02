import { Component } from '@angular/core';
import { Requirement } from '../interfaces/Requirement';
import { RequirementService } from '../services/requirement.service';
import { Account } from '../interfaces/Account';
import { AddRequirementDialogComponent } from '../add-requirement-dialog-component/add-requirement-dialog-component.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.scss',
})
export class RequirementsComponent {
  requirements: Requirement[] = [];
  accounts : Account[] = [];
  constructor(private requirementService : RequirementService ,public dialog: MatDialog,private accountService: AccountService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.fetchRequirements();
  }
  private fetchRequirements(): void {
    this.requirementService.getAllRequirements().subscribe(
      (data) => {
      this.requirements = data;
      this.requirements.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB- dateA;
      });
      console.log(this.requirements);
      this.accountService.getAllAccounts().subscribe((accountsData) => {
        this.accounts = accountsData;
      console.log(this.accounts);
    });
  }
)}
  openAddRequirementDialog(): void {
    const dialogRef = this.dialog.open(AddRequirementDialogComponent, {
      width: '400px',
      data: {
        accountNames: this.accounts.map((account) => account.name),
        initialValues: {
          requirementId: null,
          startDate: '',
          endDate: '',
          requiredNo: null,
          jobDescription: '',
          hiringManager: '',
          accountName: null,
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedAccount = this.accounts.find((account) => account.name === result.accountName);
        if (selectedAccount) {
          result.account = selectedAccount
          delete result.accountName;
          console.log(result);
          
          this.requirementService.createRequirement(result).subscribe(
            (createdRequirement) => {
              console.log('Requirement inserted successfully:', createdRequirement);
              this.fetchRequirements();
            },
            (error) => {
              console.error('Error inserting requirement:', error);
            }
          );
        } else {
          console.error('Selected account not found');
        }
      }
    });
  }
  onEditingStart(event: any): void {
    // Open the edit dialog when editing starts
    const dialogRef = this.dialog.open(AddRequirementDialogComponent, {
        width: '400px',
        data: {
            accountNames: this.accounts.map((account) => account.name),
            initialValues: {
                requirementId: event.data.requirementId,
                startDate: event.data.startDate,
                endDate: event.data.endDate,
                requiredNo: event.data.requiredNo,
                jobDescription: event.data.jobDescription,
                hiringManager: event.data.hiringManager,
                accountName: event.data.account.name,
            },
        },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       
        console.log(result);
        const selectedAccount = this.accounts.find((account) => account.name === result.accountName);
        if (selectedAccount) {
          result.account = selectedAccount
          delete result.accountName;
          console.log(result);
          this.requirementService.updateRequirement(result.requirementId,result).subscribe(
            (updatedRequirement) => {
              console.log('Requirement updated successfully:', updatedRequirement);
              this.fetchRequirements();
            },
            (error) => {
              console.error('Error inserting requirement:', error);
            }
          );
        } else {
          console.error('Selected account not found');
        }
      }
    });
}
 
  onRowRemoving(event: any) {
    const requirementId = event.data.requirementId;
      this.requirementService.deleteRequirement(requirementId).subscribe(
        () => {
          console.log('Requirement removed successfully');
          this.fetchRequirements();
        },
        (error) => {
          console.error('Error removing requirement:', error);
        }
      );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  } 

  onRowPrepared(e: any) {
    const fulfillmentNo = e.data.fulfilledNo;
    const requiredNo = e.data.requiredNo;
      const startDate = new Date(e.data.startDate);
      const endDate = new Date(e.data.endDate);
      const currentDate = new Date();
  
      const timePassedPercentage = (endDate.getTime() - currentDate.getTime()) / (endDate.getTime() - startDate.getTime() + 1);
      if (fulfillmentNo === requiredNo) {
        e.rowElement.style.backgroundColor = '#baffc9';
      } else if (timePassedPercentage <= 1 / 3) {
        e.rowElement.style.backgroundColor = 	'#ffb3ba';
      } 
    else {
      e.rowElement.style.backgroundColor = '#ffffba';
    }
  }
} 