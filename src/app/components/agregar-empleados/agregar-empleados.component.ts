import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-agregar-empleados',
  templateUrl: './agregar-empleados.component.html',
  styles: [
  ]
})
export class AgregarEmpleadosComponent {

  @Output() agregado: EventEmitter<boolean> = new EventEmitter()
  constructor(private _crud: CrudEmpleadosService) { }

  crearEmpleado(form: NgForm) {

    if(form.invalid) {
      this.mensajeError();
      return ;
    }

    const empleado = new Empleado(form.value.nombre.trim(), form.value.apellido.trim(), form.value.puesto.trim());
    this._crud.agregarEmpleado(empleado).then( () => {
      this.mensajeCorrecto();
      this.agregado.emit(true);
      form.reset();
      this.CierraPopup();
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

  mensajeError()  {
    Swal.fire({
      title: 'Debe llenar todos los campos',
      text: '¿Cerrar?',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })
  }

  CierraPopup() {
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
  }

}
