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
    this._crud.obtenerEmpleado().subscribe(administrador => {
      const index = this.route.snapshot.paramMap.get('empleado').split('-')[0];
      this.empleado = administrador[0].empleados[index];
      console.log(this.empleado)
      this.index = Number(index);
    })
  }

}
