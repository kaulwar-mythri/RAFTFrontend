import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { Role } from '../interfaces/Role';
import { accounts } from 'google-one-tap';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Account } from '../interfaces/Account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  auth_token: string = '';
 
  user: any;
  accounts: Account[] = [];

  constructor(private authService: AuthService){
    
  }

  ngOnInit(): void {
    this.auth_token != localStorage.getItem("auth_token");
    console.log(this.auth_token);
    this.authService.fetchUserRole(this.auth_token).subscribe((data) => {
      console.log("hehe")
      this.user = data;
      this.accounts = data.accounts;
      this.user.accounts = this.accounts.map((account) => account.name).join(", ");
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // Assuming you have a function to handle file uploads
      this.uploadProfilePicture(file);
    }
  }

  uploadProfilePicture(file: File): void {
    // Implement your logic to upload the file to the server (backend/Spring)
    // You can use Angular HttpClient to send the file to your server
    // Example: this.http.post('/api/upload-profile-picture', formData).subscribe(response => { /* Handle response */ });
  }
}
