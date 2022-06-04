import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: UsersService, private _router: Router){

  }
  canActivate(): boolean{
    if(this._authService.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/login'])
      return false;
    }
  }
  
}
