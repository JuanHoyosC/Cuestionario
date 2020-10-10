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

    this._auth.nuevoUsuario(form.value).subscribe(res => {
      this.route.navigateByUrl('/login');
      this.mensajeCorrecto();
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
      text: 'Se registro correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
