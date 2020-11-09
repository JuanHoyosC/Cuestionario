import { Component, OnInit } from '@angular/core';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../models/empleado.model';
import { Administrador } from '../../models/administrador.model';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: [
  ]
})
export class EncuestaComponent {

  empleado: Empleado;
  index: number;

  constructor(private _crud: CrudEmpleadosService, private route: ActivatedRoute) { 
    //Obtiene el empleado que se le quiere hacer el cuestionario
    this._crud.obtenerEmpleado().subscribe((administrador: Administrador) => {
      //Obtiene la posicion y el nombre enviado por ulr
      const index = this.route.snapshot.paramMap.get('empleado').split('-')[0];
      //Obtiene del empleado con la posicion que se envio por url y del administrador que tiene la sessipn iniciada
      this.empleado = administrador.empleados[index];
      this.index = Number(index);
    })
  }

}
