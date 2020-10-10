import { Component, ViewChild } from '@angular/core';
import { MostrarEmpleadosComponent } from '../../components/mostrar-empleados/mostrar-empleados.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild( MostrarEmpleadosComponent ) empleado: MostrarEmpleadosComponent;

  constructor() { }



  deseleccionar( e ) {
    console.log('dd')
    if(e) this.empleado.empleadoSeleccionado = null;
  }

}
