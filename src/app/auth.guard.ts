import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    token!: string;
    constructor(private authService: AuthService, private router: Router) {
        this.token = authService.getToken() || "";
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.token !== "") {
            return true;
        } else {
            this.router.navigate(["/"]);
            console.log("Login first");
            return false;
        }
    }
}