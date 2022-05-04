import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users} from '../models/users';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {}

  getUser(username:string, password:string): Observable<users[]>{
  let user =  {
      first_name: username,
      password: password
    }
    //console.log("user::"+user.first_name);
    return  this.http.post<users[]>("http://localhost:3000/api/getuser",user);
  }
  addUser(user:users): Observable<users[]>{
    return  this.http.post<users[]>("http://localhost:3000/api/adduser",user);
    }
}
