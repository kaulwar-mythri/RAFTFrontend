import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { Account } from '../interfaces/Account';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';
import { AddUserDialogComponentComponent } from '../add-user-dialog-component/add-user-dialog-component.component';
import { Role } from '../interfaces/Role';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  displayUsers: any[] = [];
  accounts : Account[] = [];
  
  constructor(private userService : UserService, public dialog: MatDialog, private accountService: AccountService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
    
      this.users = data;
      this.displayUsers = this.users.map(user => ({
        ...user,
        accounts: this.formatDisplayAccounts(user.accounts)
      }));
      console.log(this.displayUsers);
      this.accountService.getAllAccounts().subscribe((accountsData) => {
        this.accounts = accountsData;
        console.log(this.accounts);
      });
    });
  }

  formatDisplayAccounts(accounts: Account[]): string {
    return accounts.map(account => `${account.name}`).join(', ');
  }
   

  openAddRequirementDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponentComponent, {
      width: '400px',
      data: {
        accountNames: this.accounts.map((account) => account.name),
        roles: Object.keys(Role),
        initialValues: {
          employeeId: '',
          name: '',
          emailId: '',
          role: '',
          accountName: '',
        },
      },
  });


    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
        
      //   const selectedAccount = this.accounts.find((account) => account.name === result.accountName);

      //   if (selectedAccount) {
      //     result.account = selectedAccount

      //     delete result.accountName;
      //     console.log(result);

      //     this.userService.createRequirement(result).subscribe(
      //       (createdRequirement) => {
      //         console.log('Requirement inserted successfully:', createdRequirement);
              
      //       },
      //       (error) => {
      //         console.error('Error inserting requirement:', error);
      //       }
      //     );
      //   } else {
      //     console.error('Selected account not found');
      //   }
      // }
    });
  }

  onEditingStart(event: any): void {
    // Open the edit dialog when editing starts
    const dialogRef = this.dialog.open(AddUserDialogComponentComponent, {
        width: '400px',
        data: {
            accountNames: this.accounts.map((account) => account.name),
            roles: Object.keys(Role),
            initialValues: {
                employeeId: event.data.employeeId,
                name: event.data.name,
                emailId: event.data.emailId,
                role: event.data.role,
                accountName: '',
            },
        },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedAccount = this.accounts.find((account) => account.name === result.accountName);
        if (selectedAccount) {
          result.accounts = this.users.find(userRole => userRole.employeeId === result.employeeId)?.accounts
          result.accounts.push(selectedAccount);
          delete result.accountName;
          console.log(result);
          this.userService.updateUser(result.employeeId, result).subscribe(
            (updatedUser) => {
              console.log('User updated successfully:', updatedUser);
              this.fetchUsers();
            },
            (error) => {
              console.error('Error updating user:', error);
          
              const errorMessage = error.error ? error.error : 'An error occurred';
              this.openSnackBar(errorMessage);
            }
          );
        } else {
          console.error('Selected account not found');
        }
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  } 
}