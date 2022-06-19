import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { supplier } from '../supplier/supplier.component';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _refreashRequired = new Subject<void>();
  private _updaterow = new Subject<any>();
   updaterow$ = this._updaterow.asObservable();
  get RefreashRequired(){
    return this._refreashRequired;
  }
  
  constructor(private http:HttpClient) { }
  //store request
  getSupplier(param:supplier): Observable<supplier[]>{
    return  this.http.post<supplier[]>("http://localhost:3000/api/getsupplier",param);
    }

  addSupplier(param:supplier): Observable<supplier[]>{
      return  this.http.post<supplier[]>("http://localhost:3000/api/addsupplier",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }

      updateSupplier(row:any){
        let body = [row];
       
        this.http.put("http://localhost:3000/api/editsupplier/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteSupplier(id:string){
        return this.http.delete("http://localhost:3000/api/deletesupplier/"+id);
      }
    }
