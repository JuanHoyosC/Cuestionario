import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAccessGuard implements CanActivate {

  constructor(private _auth: AuthService, private route: Router) {}
  canActivate():  boolean {
    if(!this._auth.estaAutenticado()) return true;
    if(this._auth.estaAutenticado()) {
      this.route.navigateByUrl('/home');
      return false;
    }
  }
  
}
