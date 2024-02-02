// submission.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission } from '../interfaces/Submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private baseUrl = 'http://localhost:8080/api/submission'; 

  constructor(private http: HttpClient) { }

  createSubmission(submission: Submission): Observable<Submission> {

    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.post<Submission>(`${this.baseUrl}/create`, submission,
    { headers: header }
  );

    // return this.http.post<Submission>(`${this.baseUrl}/create`, submission);
  }

  getAllSubmissions(): Observable<Submission[]> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.get<Submission[]>(`${this.baseUrl}/all`,
    { headers: header }
  );

    // return this.http.get<Submission[]>(`${this.baseUrl}/all`);
  }

  getSubmissionById(id: number): Observable<Submission> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.get<Submission>(`${this.baseUrl}/${id}`,
    { headers: header }
  );


    // return this.http.get<Submission>(`${this.baseUrl}/${id}`);
  }

  updateSubmission(id: number, updatedSubmission: Submission): Observable<Submission> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.put<Submission>(`${this.baseUrl}/${id}/update`, updatedSubmission,
    { headers: header }
  );



    // return this.http.put<Submission>(`${this.baseUrl}/${id}/update`, updatedSubmission);
  }

  deleteSubmission(id: number): Observable<void> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.delete<void>(`${this.baseUrl}/${id}/delete`,
    { headers: header }
  );
    // return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
