import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  addUser(user:register): Observable<register[]>{
    return this.http.post<register[]>("http://localhost:3000/api/adduserregistrationrequest",user);
    }
  getUser(): Observable<register[]>{
    return this.http.get<register[]>("http://localhost:3000/api/getpendingregisters");
  }
  deleteUser(id:string){
    console.log("deleting"+id);
    return this.http.delete("http://localhost:3000/api/deletependingregisters/"+id);
  }
} 
