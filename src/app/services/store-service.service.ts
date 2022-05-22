import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
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

  private _refreashRequired = new Subject<void>();

  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }
  getStore(param:store): Observable<store[]>{
    return  this.http.post<store[]>("http://localhost:3000/api/getstore",param);
    }
  addStore(param:store): Observable<store[]>{
      return  this.http.post<store[]>("http://localhost:3000/api/addstore",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
  deleteStore(id:number){
        return this.http.delete("http://localhost:3000/api/deletestore/"+id);
      }
}
