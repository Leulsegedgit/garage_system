import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from '../models/register';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private _register:RegisterService,private _router:Router) { }

  ngOnInit(): void {
  }
public check_box = true;
public password_match = true;
public id_empty = false;
public info_sent = false;

public usr:register = new register('','','','','','',true,'');

register(user:register){
  
this.usr = user;
this.check_box = this.usr.check_box;
if(this.usr.password != this.usr.confirm_password )
  this.password_match = false;
  else 
  this.password_match = true;
 if(this.usr.id == "")
    this.id_empty = true;
    else
    this.id_empty = false;
  if(this.check_box&&this.password_match&&!this.id_empty){
    this.info_sent = true;
    this._register.addUser(this.usr).subscribe(
      (data:any) => {
        
      });
  }
    
}
backToHome(){
  this._router.navigate(['/login']);
}
}