import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-default-user-page',
  templateUrl: './default-user-page.component.html',
  styleUrl: './default-user-page.component.scss'
})
export class DefaultUserPageComponent {

  constructor(private router: Router, private _ngZone: NgZone, private service: AuthService) {

  }
  logout() {
    console.log("logout clicked");
    
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

}
