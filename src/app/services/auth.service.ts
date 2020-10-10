import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyA1gLBmc9Hr8OhhEEBNA7lbJO-j9AUz2IQ';
  public userId = '';
  private userToken: string = '';

  constructor(private http: HttpClient) {
     
    this.leerToken();
   
  }

  login(usuario: Usuario) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }
  
  nuevoUsuario(usuario: Usuario) {
    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apikey}`, {...usuario})
  }


  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());


  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  salir() {
    this.userToken = '';
    window.location.reload();
    localStorage.clear();
  }


  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
