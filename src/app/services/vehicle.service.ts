import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { vehicle } from '../vehicle-registration/vehicle-registration.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private _refreashRequired = new Subject<void>();
  private _updaterow = new Subject<any>();
   updaterow$ = this._updaterow.asObservable();
  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }

  
  getVehicle(param:vehicle): Observable<vehicle[]>{

    return  this.http.post<vehicle[]>("http://localhost:3000/api/getreception",param);
    }
    
  addVehicle(param:vehicle): Observable<vehicle[]>{
    console.log(param)
      return  this.http.post<vehicle[]>("http://localhost:3000/api/addreception",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateVehicle(row:any){
        let body = [row];
       
        this.http.put("http://localhost:3000/api/editreception/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteVehicle(id:string){
        return this.http.delete("http://localhost:3000/api/deletereception/"+id);
      }
      getByPartNumber(part_number:string): Observable<any>{
        return  this.http.get<any>("http://localhost:3000/api/getbypartnumber/"+part_number);
        }
    }
  