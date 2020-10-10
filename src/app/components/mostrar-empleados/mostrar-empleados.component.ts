import { Component } from '@angular/core';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { Empleado } from '../../models/empleado.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-empleados',
  templateUrl: './mostrar-empleados.component.html',
  styles: [
  ]
})
export class MostrarEmpleadosComponent  {

  empleadoSeleccionado: Empleado;
  elementoAnterior;
  constructor(public _crud: CrudEmpleadosService, private route: Router) { 
  }

  seleccionarEmpleado(empleado: Empleado, empleadoEl) {

    if(this.elementoAnterior) this.elementoAnterior.classList.remove('seleccionado');
    empleadoEl.classList.add('seleccionado');
    this.elementoAnterior = empleadoEl;
    this.empleadoSeleccionado = empleado;

  }

  llenarCuestionario(nombre: string) {
    this.route.navigateByUrl(`cuestionario/${nombre}`)
  }

  eliminarEmpleado(index: number) {
    console.log(this._crud.empleados)
    this._crud.empleados.splice(index, 1);
    this._crud.eliminarEmpleado().then()
  }

  actualizarEmpleado(form: NgForm) {
    if(form.invalid) return ;
    this._crud.editarEmpleado().then(()=> this.mensajeCorrecto())
  }

  mensajeCorrecto()  {
    Swal.fire({
      title: 'Correcto',
      text: 'Empleado actualizado',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
}
