import { Component } from '@angular/core';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { Empleado } from '../../models/empleado.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-mostrar-empleados',
  templateUrl: './mostrar-empleados.component.html',
  styles: [
  ]
})
export class MostrarEmpleadosComponent   {

  //Varibles que serviran para darle estilo al elemento html seleccionado
  empleadoSeleccionado: Empleado;
  elementoAnterior;

  // Inyecta los servicios en el componente
  constructor(public _crud: CrudEmpleadosService, private route: Router) { 
    
  }


  seleccionarEmpleado(empleado: Empleado, empleadoEl) {

    //Verifica si hubo un usuario seleccionado anteriormente y le borra el estilo de selección
    if(this.elementoAnterior) this.elementoAnterior.classList.remove('seleccionado');
    //Le añade el estilo de seleccion al usuario seleccionado
    empleadoEl.classList.add('seleccionado');
    //Le añade a una variable el empleado seleccionado actualmente, para la eliminación del estilo si se tocasen otro empleado
    this.elementoAnterior = empleadoEl;
    //añade a una varible el empleado seleccionado
    this.empleadoSeleccionado = empleado;
  }

  llenarCuestionario(nombre: string) {
    //Navega hacia el cuestionario del empleado al que se le dio doble click o ver cuestionario
    this.route.navigateByUrl(`cuestionario/${nombre}`)
  }

  eliminarEmpleado(index: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar al empleado?',
      text: "No puedes revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      // Si la respuesta es si, elimina al empleado y muestra un mensaje de eliminación.
      if (result.isConfirmed) {
        //Elimina al empleado del array
        this._crud.empleados.splice(index, 1);
        //Elimina la slección del empleado que estaba seleccionado
        this.empleadoSeleccionado = null;
        //ELimina al empleado de la base de datos
        this._crud.eliminarEmpleado().subscribe()
        //Mensaje correcto de eliminación
        Swal.fire(
          'Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        )
      }
    })
  }

  actualizarEmpleado(form: NgForm) {
    //Si el formulario es invalido no sé ejecutaran las siguientes lineas
    if(form.invalid) return ;
    //Si el formulario es valido se ejecutarán estas lineas

    //Manda a llamar la funcion de editar empleado del servicio crud
    this._crud.editarEmpleado().subscribe(()=> {
      //Si se edita correctamente se muestra un mensaje exitoso
      this.mensajeCorrecto(); 
      //Hace que la ventana modal desaparezca
      this.CierraPopup();
    })
  }

  mensajeCorrecto()  {
    Swal.fire({
      title: 'Correcto',
      text: 'Empleado actualizado',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  CierraPopup() {
    $("#exampleModal1").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
  }

}
