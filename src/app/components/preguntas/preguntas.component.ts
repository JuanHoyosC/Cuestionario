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
    // Obtiene las preguntas que se envia del servicio crud
    this._crud.obtenerPreguntas().subscribe(preguntas => {
      // Ordena las preguntas y las guarda en arrays
      for (const pregunta in preguntas[0]) {
        if(pregunta === "_id") continue;
        this.nombreCategoria.push(pregunta);
        this.categorias.push(preguntas[0][pregunta])
      }
    });
   }


  continuar(form: NgForm, categoria: string) {
    //Guarda las respuesta de una categoria en una variable de tipo Respuesta
    const respuesta = new Respuesta( categoria );
    respuesta.respuestas = [];

    // Si ya respondio 6 categorias no podra responder más
    if(this.empleado.respuestas.length === 6) {
      return ;
    }

    //Obtiene las respuestas de cada pregunta
    for (const resultado in form.value) {
      respuesta.respuestas.push(form.value[resultado])
    }

    //Verifica si se respondio a todas las preguntas de la categoria
    const puedePasar = respuesta.respuestas.every(res => Number(res)  !== 0)
    //Si no se respondio todas las respuestas de la categoria no podra pasar a la siguiente
    if(!puedePasar) {
      this.mensajeError();
      return ;
    };

    //Si respondio a todas las preguntas de una categoria puede pasar a la otra
    this.categoria++;
    //SI llego a la ultima categoria, mostrara la opcion de guardar a la base de datos
    if(this.categoria === 6) this.categoria = 5;
    //Guarda las respuesta en las respuestas del empleado
    this.empleado.respuestas.push({ ...respuesta })
    //Si se llego a la ultima categoria se dará por hecho el cuestionario y se guardara en la base de datos
    if(this.empleado.respuestas.length === 6) {
      //El estado del empleado ahora sera encuestado
      this.empleado.encuestado = true;
      //se llama al servicio para guardar las respuestas del empleado en la base de datos
      this._crud.actualizarEmpleado(this.empleado, this.index).subscribe(res => this.mensajeCorrecto())
    }
    
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
