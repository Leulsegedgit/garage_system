import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface store {
  no: number;
  request_number: number;
  service_number: number;
  requester: string;
  approver: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})

export class StoreServiceService {

  constructor(private http:HttpClient) { }
  getStore(param:store): Observable<store[]>{
    return  this.http.post<store[]>("http://localhost:3000/api/getstore",param);
    }
  addStore(param:store): Observable<store[]>{
      return  this.http.post<store[]>("http://localhost:3000/api/addstore",param);
      }
}
