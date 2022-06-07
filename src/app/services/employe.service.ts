import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { employe } from '../employe/employe-registration/employe-registration.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  
  private _refreashRequired = new Subject<void>();
  private _updaterow = new Subject<any>();
   updaterow$ = this._updaterow.asObservable();
  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }

  //spare
  getEmploye(param:employe): Observable<employe[]>{
    return  this.http.post<employe[]>("http://localhost:3000/api/getemploye",param);
    }
  addEmploye(param:employe): Observable<employe[]>{
      return  this.http.post<employe[]>("http://localhost:3000/api/addemploye",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateEmploye(row:any){
        let body = [row];
       console.log(body)
        this.http.put("http://localhost:3000/api/editemploye/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteEmploye(id:string){
        return this.http.delete("http://localhost:3000/api/deleteemploye/"+id);
      }
    
}
