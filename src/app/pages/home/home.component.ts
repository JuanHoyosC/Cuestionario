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
    //Obtiene los datos del admistrador que inicio sessión
    this._crud.obtenerDatos()
  }



  //Si hay un empleado seleccionado lo deselecciona
  deseleccionar( e ) {
    if(e) this.empleado.empleadoSeleccionado = null;
  }

}
