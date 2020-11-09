import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private _auth: AuthService, private route: Router, private afAuth: AngularFireAuth) { }


  ingresar(form: NgForm) {
    if(form.invalid) return ;

    this._auth.login(form.value).then(() => {
      this.afAuth.authState.subscribe( (user: any) => { 
        if( !user ) return ;
        //Guarda un token en el local storage para inidicar que se esta autentica
        this._auth.guardarToken(user.refreshToken);
        this.route.navigateByUrl('/home');
        this.mensajeCorrecto()
      });
    }) .catch(error => this.mensajeError(error.message))

  }

  mensajeError(error: string) {
    Swal.fire({
      title: error,
      text: '¿Quieres continuar?',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  mensajeCorrecto()  {
    Swal.fire({
      title: 'Correcto',
      text: 'Ingreso correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
