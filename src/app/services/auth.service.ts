import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebasePayload } from '../interfaces/FirebasePayload';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebasePayload!: FirebasePayload;

  private path = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private angularAuth: AngularFireAuth) { }

  public signOutExternal = () => {
    localStorage.removeItem("auth_token");
    console.log("Auth Token deleted");
  }

  public createUser(firebasePayload: FirebasePayload): Observable<any> {
    console.log("In service" + firebasePayload.name, firebasePayload.emailId);
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.post(
      
      this.path + `api/auth/signInWithGoogle`, 
      firebasePayload,
      {headers: header}
    );
  }

  getToken():string | null {
    return localStorage.getItem("auth_token");
  }

  setToken(tokenPayload: string): void {
    localStorage.setItem("auth_token", tokenPayload);
  }

  isTokenPresent():boolean {
    return localStorage.getItem("auth_token") != null;
  }
  
  public fetchUserRole(token: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.httpClient.get(
      this.path + `api/auth/getUser`,
      {headers: header}
    );
  }
}
