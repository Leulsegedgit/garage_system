import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { spare } from '../store/spare-registration/spare-registration.component';
export interface store_request {
  no: number;
  part_number: string;
  request_number: string;
  service_number: string;
  requester: string;
  approver: string;
  quantity: number;
  date: string;
}

export interface store_receive {
  no: number;
  plate_number: string;
  receive_vocher_number: string;
  part_number: string;
  receiver: string;
  deliverer: string;
  supplier: string;
  refference: string;
  unit_price: number;
  quantity_received: number;
  quantity_remaining: number;
  
  date: string;
}
export interface store_issue {
  no: number;
  request_number: string;
  issue_refference_number: string;
  part_number: string;
  quantity_available: number;
  quantity_requested: number;
  date: string;
}
@Injectable({
  providedIn: 'root'
})

export class StoreServiceService {

  private _refreashRequired = new Subject<void>();
  private _updaterow = new Subject<any>();
   updaterow$ = this._updaterow.asObservable();
  get RefreashRequired(){
    return this._refreashRequired;
  }
  constructor(private http:HttpClient) { }

  //store request
  getStoreRequest(param:store_request): Observable<store_request[]>{
    return  this.http.post<store_request[]>("http://localhost:3000/api/getstorerequest",param);
    }
  addStoreRequest(param:store_request): Observable<store_request[]>{
      return  this.http.post<store_request[]>("http://localhost:3000/api/addstorerequest",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateStoreRequest(row:any){
        let body = [row];
       
        this.http.put("http://localhost:3000/api/editstorerequest/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteStoreRequest(id:string){
        return this.http.delete("http://localhost:3000/api/deletestorerequest/"+id);
      }
      getByPartNumber(part_number:string): Observable<any>{
        return  this.http.get<any>("http://localhost:3000/api/getbypartnumber/"+part_number);
        }
    //Store receive
    getStoreReceive(param:store_receive): Observable<store_receive[]>{
      return  this.http.post<store_receive[]>("http://localhost:3000/api/getstorereceive",param);
      }
    addStoreReceive(param:store_receive): Observable<store_receive[]>{
        return  this.http.post<store_receive[]>("http://localhost:3000/api/addstorereceive",param).pipe(
          tap(()=>{
            this.RefreashRequired.next();
          }
  
          )
        );
        }
        
    deleteStoreReceive(id:string){
          return this.http.delete("http://localhost:3000/api/deletestorereceive/"+id);
        }
      updateStoreReceive(row:any){
        let body = [row];
       
        this.http.put("http://localhost:3000/api/editstorereceive/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }

      
  //store issue
  getStoreIssue(param:store_issue): Observable<store_issue[]>{
    return  this.http.post<store_issue[]>("http://localhost:3000/api/getstoreissue",param);
    }
  addStoreIssue(param:store_issue): Observable<store_issue[]>{
      return  this.http.post<store_issue[]>("http://localhost:3000/api/addstoreissue",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateStoreIssue(row:any){
        let body = [row];
       console.log(body)
        this.http.put("http://localhost:3000/api/editstoreissue/",row).subscribe(
          data =>{
            console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteStoreIssue(id:string){
        return this.http.delete("http://localhost:3000/api/deletestoreissue/"+id);
      }
    //spare
  getSpare(param:spare): Observable<spare[]>{
    return  this.http.post<spare[]>("http://localhost:3000/api/getspare",param);
    }
  addSpare(param:spare): Observable<store_issue[]>{
      return  this.http.post<store_issue[]>("http://localhost:3000/api/addspare",param).pipe(
        tap(()=>{
          this.RefreashRequired.next();
        }

        )
      );
      }
      updateSpare(row:any){
        let body = [row];
       console.log(body)
        this.http.put("http://localhost:3000/api/editspare/",row).subscribe(
          data =>{
            //console.log(data)
          }
        )
        this._updaterow.next(row);
        this.RefreashRequired.next();
      }
  deleteSpare(id:string){
        return this.http.delete("http://localhost:3000/api/deletespare/"+id);
      }
    
}
