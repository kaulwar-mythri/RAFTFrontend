import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
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
