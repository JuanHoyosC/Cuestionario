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

  //Decorador que sirve para emitir un evento al padre
  @Output() agregado: EventEmitter<boolean> = new EventEmitter()

  //Se inyecta el servicio al componente
  constructor(public _crud: CrudEmpleadosService) { }

  crearEmpleado(form: NgForm) {

    if(form.invalid) {
      this.mensajeError();
      return ;
    }

    // Crea un empleado de tipo empleado, obtiene los datos correspondiente con el form.value
    const empleado = new Empleado(form.value.nombre.trim(), form.value.apellido.trim(), form.value.puesto.trim(), form.value.expediente.trim());
    // Manda a llamar la funcion de agregarEmpleado del servicio _crud
    this._crud.agregarEmpleado(empleado).subscribe( () => {
      //Si se agrego al empleado correctamente mostrará un mensaje exitoso
      this.mensajeCorrecto();
      //Evento que se emite para deseleccionar un empleado siempre que se cree otro
      this.agregado.emit(true);
      //Borra los datos que se encuentre en los campos del formulario
      form.reset();
      //Cierra la ventana modal
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

  //Funcion que sirve para hacer desaparecer la ventana modal de agregar empleados
  CierraPopup() {
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
  }

}
