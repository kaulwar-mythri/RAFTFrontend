import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';
  constructor(private http: HttpClient) {}
  
  createAccount(account: any): Observable<string> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.post<string>(`${this.apiUrl}/create`, account,{ headers: header }
  );
    // return this.http.post<string>(`${this.apiUrl}/create`, account);
  }
  updateAccount(id: number, updatedAccount: any): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.put<any>(`${this.apiUrl}/${id}/update`, updatedAccount,{ headers: header }
  );
    // return this.http.put<any>(`${this.apiUrl}/${id}/update`, updatedAccount);
  }
  getAllAccounts(): Observable<any[]> {
    const header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    console.log("in getAllAccounts");
    return this.http.get<any[]>(`${this.apiUrl}/all`,{ headers: header }
  );
    // return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  getAccountById(id: number): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`,{ headers: header });
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  deleteAccountById(id: number): Observable<string> {
    const header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.delete<string>(`${this.apiUrl}/${id}/delete`,{ headers: header });
   // return this.http.delete<string>(`${this.apiUrl}/${id}/delete`);
  }
}