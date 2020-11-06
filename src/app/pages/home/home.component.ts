import { Component, ViewChild } from '@angular/core';
import { MostrarEmpleadosComponent } from '../../components/mostrar-empleados/mostrar-empleados.component';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild( MostrarEmpleadosComponent ) empleado: MostrarEmpleadosComponent;

  constructor(private _crud: CrudEmpleadosService) { 
    this._crud.obtenerDatos()
  }



  deseleccionar( e ) {
    if(e) this.empleado.empleadoSeleccionado = null;
  }

}
