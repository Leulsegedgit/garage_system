import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users} from '../models/users';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient,private _router: Router) {}

  getUser(username:string, password:string): Observable<any>{
  let user =  {
      first_name: username,
      password: password
    }
    //console.log("user::"+user.first_name);
    return  this.http.post<any>("http://localhost:3000/api/getuser",user);
  }
  addUser(user:users): Observable<users[]>{
    return  this.http.post<users[]>("http://localhost:3000/api/adduser",user);
    }
    loggedIn(){
      return !!localStorage.getItem('token');
    }
    logOut(){
      localStorage.removeItem('token')
      this._router.navigate(['/login'])
    }
    getToken(){
      return localStorage.getItem('token')
    }
}
