import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject ,tap} from 'rxjs';
import { reception } from '../reception/reception.component';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  private _refreashRequired = new Subject<void>();
  private _updaterow = new Subject<any>();
   updaterow$ = this._updaterow.asObservable();
  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }

  
  getReception(param:reception): Observable<reception[]>{

    return  this.http.post<reception[]>("http://localhost:3000/api/getreception",param);
    }
    
  addReception(param:reception): Observable<reception[]>{
    console.log(param)
      return  this.http.post<reception[]>("http://localhost:3000/api/addreception",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateReception(row:any){
        let body = [row];
       
        this.http.put("http://localhost:3000/api/editreception/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteReception(id:string){
        return this.http.delete("http://localhost:3000/api/deletereception/"+id);
      }
      getByPartNumber(part_number:string): Observable<any>{
        return  this.http.get<any>("http://localhost:3000/api/getbypartnumber/"+part_number);
        }
    }
  