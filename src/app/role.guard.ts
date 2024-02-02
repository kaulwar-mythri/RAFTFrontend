import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    token!: string;
  constructor(private authService: AuthService, private router: Router) {
    this.token = localStorage.getItem("auth_token") || "";
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = route.data['required_roles'];
    console.log(typeof requiredRoles);
    return this.authService.fetchUserRole(localStorage.getItem("auth_token") || "").pipe(
      map((response) => {
        console.log(response);
        return requiredRoles.includes(response.role);
      })
    );
  }
}