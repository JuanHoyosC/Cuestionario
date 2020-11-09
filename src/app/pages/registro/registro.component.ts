import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private _auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  registrarse(form: NgForm) {
    if(form.invalid) return ;
    //Envia los datos ingresados en el registro a la funcion nuevoUsuario del servicio Auth
    this._auth.nuevoUsuario(form.value).then(res => {
      //Agrega al administrador a la base de datos de mongo
      this._auth.agregarUsuario(form.value.sede);
      //Navega hacia la pagina de login
      this.route.navigateByUrl('/login');
      this.mensajeCorrecto();
    })
    .catch(error => this.mensajeError(error.message))

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
      text: 'Se registro correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
