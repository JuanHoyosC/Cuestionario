import { Component, OnInit } from '@angular/core';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../models/empleado.model';
import { Administrador } from '../../models/administrador.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: [
  ]
})
export class EncuestaComponent {

  empleado: Empleado;
  index: number;

  constructor(private _crud: CrudEmpleadosService, private _auth: AuthService, private route: ActivatedRoute, private afAuth: AngularFireAuth) { 
    //Obtiene el empleado que se le quiere hacer el cuestionario
    this.afAuth.authState.subscribe((user: any) => {
      //SI no hay session iniciada no retorna nada
      if (!user) return;
      this._auth.email = user.email;
      this._crud.obtenerEmpleado(user.uid).subscribe((administrador: Administrador) => {
        //coloca la sede en la variable sede
        this._crud.sede = administrador.sede;
        //Obtiene la posicion y el nombre enviado por ulr
        const index = this.route.snapshot.paramMap.get('empleado').split('-')[0];
        //Obtiene del empleado con la posicion que se envio por url y del administrador que tiene la sessipn iniciada
        this.empleado = administrador.empleados[index];
        this.index = Number(index);
      })
    })
    
  }

}
