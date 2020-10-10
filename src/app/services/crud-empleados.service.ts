import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

//firebase

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Administrador } from '../models/administrador.model';
import { Empleado } from '../models/empleado.model';


@Injectable({
  providedIn: 'root'
})
export class CrudEmpleadosService {

  private administrador: AngularFirestoreCollection<Administrador>;
  private preguntas: AngularFirestoreCollection<any>;
  public admi: Administrador;
  public empleados: Empleado[] = [];

  constructor(private _auth: AuthService, private afs: AngularFirestore) {
    const token = this._auth.leerToken();
    const decode = jwt_decode(token);
    this.admi = new Administrador(decode.user_id, decode.email);

    this.administrador = this.afs.collection<Administrador>('usuarios', ref => ref.where('uid', '==', this.admi.uid));
    this.preguntas = this.afs.collection<any>('preguntas');

    this.administrador.valueChanges().subscribe( (admi: Administrador[]) => {
      if(admi.length !== 0){
        this.admi = admi[0];
        this.empleados = admi[0].empleados;
      }
    })
   }


  agregarEmpleado(empleado: Empleado) {
    this.admi.empleados.push({...empleado});
    return this.administrador.doc( this.admi.uid ).set({ ...this.admi })
  }


  obtenerPreguntas() {
    return this.preguntas.valueChanges();
  }

  obtenerEmpleado() {
   return this.administrador.valueChanges()
  }

  actualizarEmpleado(empleado: Empleado, index: number) {
    this.admi.empleados[index] = empleado;
    return this.administrador.doc( this.admi.uid ).update({empleados: this.admi.empleados})
  }

  eliminarEmpleado() {
    return this.administrador.doc( this.admi.uid ).update({empleados: this.admi.empleados})
  }

  editarEmpleado() {
    return this.administrador.doc( this.admi.uid ).update({empleados: this.admi.empleados})
  }


}
