import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-empleados',
  templateUrl: './agregar-empleados.component.html',
  styles: [
  ]
})
export class AgregarEmpleadosComponent {

  constructor(private _crud: CrudEmpleadosService) { }

  crearEmpleado(form: NgForm) {

    if(form.invalid) return ;

    const empleado = new Empleado(form.value.nombre, form.value.apellido, form.value.puesto);
    this._crud.agregarEmpleado(empleado).then( () => {
      this.mensajeCorrecto();
      form.reset();
    });
  }

  mensajeCorrecto()  {
    Swal.fire({
      title: 'Correcto',
      text: 'Se agrego el empleado',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
