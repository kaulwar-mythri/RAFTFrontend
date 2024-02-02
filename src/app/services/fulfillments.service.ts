import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';
import { Fulfillment } from '../interfaces/Fulfillment';

@Injectable({
  providedIn: 'root'
})
export class FulfillmentsService {
  private baseUrl = 'http://localhost:8080/api/fulfillments';
  constructor(private http: HttpClient) {}


 

  // get all the fulfillments 
  getAllFulfillments(): Observable<Fulfillment[]> {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get<Fulfillment[]>(
      `${this.baseUrl}/all`,
      { headers: header }
    );
  }

  // get fulfillment by id 
  getFulfillmentById(id: number): Observable<Fulfillment> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.get<Fulfillment>(`${this.baseUrl}/${id}`,{ headers: header }
  );
  }

  // create fulfillment
  createFulfillment(fulfillment: Fulfillment): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`)
    
  return this.http.post(`${this.baseUrl}/create`, fulfillment,
    { headers: header }
  );
  }

  // update fulfillment
  updateFulfillment(id: number, fulfillment: Fulfillment): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.put(`${this.baseUrl}/${id}/update`, fulfillment,
    { headers: header }
  );
  }

  // delete fulfillment 
  deleteRequirement(id: number): Observable<any> {
    const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
  return this.http.delete(
    `${this.baseUrl}/${id}/delete`,
    { headers: header }
  );
  }
}
