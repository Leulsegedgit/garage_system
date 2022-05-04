import { Component, OnInit } from '@angular/core';
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
        this.user = data;
        if(data.length == 0)
        {
          this.is_registerd = false;
          return
        }
         if(this.user[0].type == 'admin')
           this._router.navigate(['/dashboard']);
         else if(this.user[0].type == 'user')
            this._router.navigate(['/user']);
          
      }
    );
    
 }

}
