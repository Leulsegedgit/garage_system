import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
export interface technician {
  no: number;
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: number;
  major: string;
  level: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})

export class TechnicianService {

  private _refreashRequired = new Subject<void>();

  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }
  getTechinician(param:technician): Observable<technician[]>{
    return  this.http.post<technician[]>("http://localhost:3000/api/gettechnician",param);
    }
  addTechinician(param:technician): Observable<technician[]>{
      return  this.http.post<technician[]>("http://localhost:3000/api/addtechnician",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
  deleteTechinician(id:number){
        return this.http.delete("http://localhost:3000/api/deletetechnician/"+id);
      }
}
