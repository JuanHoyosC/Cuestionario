import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

import jwt_decode from 'jwt-decode';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId = '';
  public email: string = '';

  constructor(private afAuth: AngularFireAuth) {  

  }

  login(usuario: Usuario) {

    return this.afAuth.auth
    .signInWithEmailAndPassword(usuario.email, usuario.password)

  }
  
  nuevoUsuario(usuario: Usuario) {
    return this.afAuth.auth
    .createUserWithEmailAndPassword(usuario.email, usuario.password)
  }


   guardarToken(idToken: string) {

    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());


  }


  salir() {
    this.afAuth.auth.signOut();
    localStorage.clear()
  }


  estaAutenticado(): boolean {
    const userToken = localStorage.getItem('token') || '';
    if (userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      this.salir();
      return false;
    }
  }
}
