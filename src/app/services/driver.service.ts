import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface driver {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }
  getDriver(param:driver): Observable<driver[]>{
      return  this.http.post<driver[]>("http://localhost:3000/api/getdriver",param);
      }
  addDriver(param:driver): Observable<driver[]>{
      return  this.http.post<driver[]>("http://localhost:3000/api/adddriver",param);
      }
}
