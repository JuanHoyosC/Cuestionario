import { Component, Input} from '@angular/core';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';

import { NgForm } from '@angular/forms';
import { Respuesta } from '../../models/respuesta.model';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: [
  ]
})
export class PreguntasComponent  {

  categorias: any[] = []
  nombreCategoria: any[] = [];
  categoria: number = 0;
  @Input() empleado: Empleado = new Empleado('', '', '', '');
  @Input() index: number;

  constructor(private _crud: CrudEmpleadosService) {
    this._crud.obtenerPreguntas().subscribe(preguntas => {
      for (const pregunta in preguntas[0]) {
        if(pregunta === "_id") continue;
        this.nombreCategoria.push(pregunta);
        this.categorias.push(preguntas[0][pregunta])
      }
    });
   }


  continuar(form: NgForm, categoria: string) {
    const respuesta = new Respuesta( categoria );
    respuesta.respuestas = [];

    if(this.empleado.respuestas.length === 6) {
      return ;
    }

    for (const resultado in form.value) {
      respuesta.respuestas.push(form.value[resultado])
    }

    const puedePasar = respuesta.respuestas.every(res => Number(res)  !== 0)
    if(!puedePasar) {
      this.mensajeError();
      return ;
    };

    this.categoria++;
    if(this.categoria === 6) this.categoria = 5;
    this.empleado.respuestas.push({ ...respuesta })
    if(this.empleado.respuestas.length === 6) {
      this.empleado.encuestado = true;
      this._crud.actualizarEmpleado(this.empleado, this.index).subscribe(res => this.mensajeCorrecto())
    }
    
  }

  anterior() {
    if(this.categoria === 0) return ;
    this.categoria--;
  }

  mensajeError() {
    Swal.fire({
      title: 'Debe responder todas las preguntas antes de continuar',
      text: '¿cerrar?',
      icon: 'error',
      confirmButtonText: 'cerrar'
    })
  }

  mensajeCorrecto() {
    Swal.fire({
      title: 'Correcto',
      text: 'Encuesta enviada',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
