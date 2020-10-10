import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private _auth: AuthService, private route: Router) { }


  ingresar(form: NgForm) {
    if(form.invalid) return ;

    this._auth.login(form.value).subscribe(() => {
      this.route.navigateByUrl('/home');
      this.mensajeCorrecto()
    }, error => this.mensajeError(error.error.error.errors[0].message))

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
