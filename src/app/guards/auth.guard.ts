import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private route: Router, private afAuth: AngularFireAuth) { }
  canActivate(): boolean {

    if(this._auth.estaAutenticado()) return true;
    if(!this._auth.estaAutenticado()) {
      this.route.navigateByUrl('/login');
      return false;
    }
  }

}
