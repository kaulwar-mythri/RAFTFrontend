import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/userRoles';
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get(
      `${this.baseUrl}/all`,
      { headers: header }
    );
  }
  getUserByEmployeeId(id: number): Observable<any> {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get(`${this.baseUrl}/${id}`, { headers: header });
  }
  updateUser(employeeId: number, user: any): Observable<any> {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.put(`${this.baseUrl}/${employeeId}/update`, user, {headers: header});
  }

  deleteUser(id: number): Observable<any> {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.delete(`${this.baseUrl}/${id}/delete`, {headers: header});
  }
}  

