import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CredentialResponse, PromptMomentNotification} from 'google-one-tap';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from "firebase/auth";
import { FirebasePayload } from '../interfaces/FirebasePayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  auth_token: string = '';
  user: any;
  firebasePayload!: FirebasePayload;
  constructor(private fireAuth: AngularFireAuth, private authService: AuthService, private router: Router, private service: AuthService, public _dataService: DataService) {}


  ngOnInit(): void {

    // @ts-ignore
  //   window.onGoogleLibraryLoad = () => {
  //     // @ts-ignore
  //     google.accounts.id.initialize({
  //       client_id: '888908128889-t24335rv56vhplh02rubq4u514ui641e.apps.googleusercontent.com',
  //       callback: this.handleCredentialResponse.bind(this),
  //       auto_select: false,
  //       cancel_on_tap_outside: true
  //     });
  //     // @ts-ignore
  //     google.accounts.id.renderButton(
  //       // @ts-ignore
  //       document.getElementById('buttonDiv'),
  //       { theme: 'outline', size: 'large', width: '100%' }
  //     );
  //     // @ts-ignore
  //     google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  //   }
  // }
  // async handleCredentialResponse(response: CredentialResponse) {
  //   try {
  //     await firstValueFrom(this.service.createUser(response.credential)).then(
  //       (x) => {
  //         console.log(x.authToken);
  //         this.service.setToken(x.authToken);
  //         this.authService.fetchUserRole(x.authToken).subscribe((data) => {
  //           this.user = data;
  //           console.log(data)
  //           if(this.user.role === "DEFAULT"){
  //             console.log(this.user.role);
  //             this._dataService.isUserDeafult = true
  //           }
  //           if(this._dataService.isUserDeafult) {
  //             this.router.navigate(["/defaultPage"])
  //           }
  //            else {
  //             this.router.navigate(["/dashboard"]);
  //           }
  //         });
  //       }
  //     )
  //   } catch(err) {
  //     console.log(err);
  //   }
  }

  onSignInClick() {
    this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.firebasePayload = {name: res.user?.displayName ? res.user?.displayName : "", emailId: res.user?.email ? res.user?.email : ""}
      console.log(this.firebasePayload);
    }).then(() => this.createUser())

  }

  createUser() {
    try {
      firstValueFrom(this.service.createUser(this.firebasePayload)).then(
        (x) => {
          console.log(x.authToken);
          this.service.setToken(x.authToken);
          if(x.userRole === "DEFAULT")
            this._dataService.isUserDeafult = true

          if(this._dataService.isUserDeafult) {
            this.router.navigate(["/defaultPage"])
          }
            else {
            this.router.navigate(["/dashboard"]);
          }
        }
      )
    } catch(err) {
      console.log(err);
    }
  }
}


