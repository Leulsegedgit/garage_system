import { Component, OnInit } from '@angular/core';
import { users } from '../models/users';
import { RegisterService } from '../services/register.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {
  public  piechart = [
    {
      "name": "Drivers",
      "value": 98
    },
    {
      "name": "Technicians",
      "value": 65
    },
    {
      "name": "Admin",
      "value": 5
    },
    {
      "name": "Manegers",
      "value": 9
    }
  ];
  public  bargraph = [
    {
      "name": "Mentenance requests",
      "value": 27
    },
    {
      "name": "Finished",
      "value": 65
    },
    {
      "name": "On progress",
      "value": 5
    },
    {
      "name": "Fullly woking",
      "value": 9
    }
  ];
  showFiller = false;
  public show_register_request = false;
  public show_hide = "Show";
  public register_request = false;
  constructor(private _register:RegisterService,private _users:UsersService) { }
public users = [
  {"id":"atr/6598/11","first_name": "Leul","last_name":"wond","password":"+251938293330","confirm_password":"+251938293330","email":"","check_box":false,"title":"+251938293330"}

];
  ngOnInit(): void {
    this._register.getUser()
    .subscribe(
      data => {
        console.log(data.length);
        if(data.length!=0)
          this.register_request = true;
        this.users = data;
      }
    );
  }
  
  declineRegistration(index:any){
   
   this._register.deleteUser(
        this.users[index].id
   )
   .subscribe(
    data => {
     
    }
  );
  this.users.splice(index,1);
  }

  approveRegistration(index:any){
   
    this._register.deleteUser(this.users[index].id)
          .subscribe(
          data => {
            
          }
        );
  let usr:users = {"id":this.users[index].id,"first_name":this.users[index].first_name,"last_name":this.users[index].last_name,"password":this.users[index].password,"type":"user"};

   this._users.addUser(usr)
        .subscribe(
        data => {
        
        }
        );
   this.users.splice(index,1);
   }

  showRegisterRequest(){
    this.show_register_request = !this.show_register_request;
    if(this.show_hide === "Show")
      this.show_hide = "Hide";
      else
      this.show_hide = "Show";
  }


}
