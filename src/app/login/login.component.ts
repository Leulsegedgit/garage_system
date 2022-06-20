import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  constructor(private _router: Router,private _users:UsersService) { }
  public is_registerd = true;
    ngOnInit(): void {
    }
    
  public user:users[] = [];
  public form = {};

  public x = {};
  
 log(form:any)
 {
  this.form = form;
    
    
  this.x =  this._users.getUser(form.username,form.password)
  .subscribe(
    (data) => {
      
      if(data == null)
      {
        this.is_registerd = false;
        return
      }else{
        this.is_registerd = true
        localStorage.setItem('token',data.token);
        this._users.setName(data.name)
        
       if(data.type == 'Admin')
         {
           this._router.navigate(['/dashboard']);
          }
       else if(data.type == 'User')
          this._router.navigate(['/user']);
        
    }
  },
  err => {
    if(err instanceof HttpErrorResponse){
      if(err.status == 401){
        this._router.navigate(['/login'])
      }
    }
  }
  );
  
}
}
