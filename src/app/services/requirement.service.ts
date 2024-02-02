import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private baseUrl = 'http://localhost:8080/api/requirement';
  constructor(private http: HttpClient) { }
  getAllRequirements(): Observable<any> {
    const header = new HttpHeaders()
      .set('Content-type',  'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get(
      `${this.baseUrl}/all`,
      { headers: header }
    );
  }
  getRequirementById(id: number): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.get(`${this.baseUrl}/${id}`,{ headers: header }
  );
    // return this.http.get(`${this.baseUrl}/${id}`);
  }
  createRequirement(requirement: any): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type',  'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.post(`${this.baseUrl}/create`, requirement,
    { headers: header }
  );
    // return this.http.post(`${this.baseUrl}/create`, requirement);
  }
  updateRequirement(id: number, requirement: any): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.put(`${this.baseUrl}/${id}/update`, requirement,
    { headers: header }
  );
    // return this.http.put(`${this.baseUrl}/${id}/update`, requirement);
  }
  deleteRequirement(id: number): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.delete(
    `${this.baseUrl}/${id}/delete`,
    { headers: header }
  );
    // return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }
}