import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css']
})
export class DashboardToolbarComponent implements OnInit {

  constructor(private _authService: UsersService) { }
  public name = "";

  ngOnInit(): void {
    this.name = this._authService.getName()
  }
logOut(){
this._authService.logOut()
}

}
