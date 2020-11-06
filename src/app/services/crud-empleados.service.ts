import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

//firebase

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Administrador } from '../models/administrador.model';
import { Empleado } from '../models/empleado.model';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudEmpleadosService {

  private administrador: AngularFirestoreCollection<Administrador>;
  private preguntas: AngularFirestoreCollection<any>;
  public admi: Administrador;
  public empleados: Empleado[] = [];
  public sede: string = "";

  constructor(private _auth: AuthService, private afs: AngularFirestore, private afAuth: AngularFireAuth,
    private http: HttpClient) {
  }

  obtenerDatos() {
    this.afAuth.authState.subscribe((user: any) => {
      this.admi = null;
      this.empleados = [];
      if (!user) return;
      this._auth.email = user.email;
      this.admi = new Administrador(user.uid, user.email);
      this.administrador = this.afs.collection<Administrador>('usuarios', ref => ref.where('uid', '==', this.admi.uid));
      this.preguntas = this.afs.collection<any>('preguntas');
      this.http.get(`http://localhost:3000/administrador/${this.admi.uid}`).subscribe((administrador: Administrador) => {
        this.admi = administrador;
        this.empleados = administrador.empleados;
        this.sede = administrador.sede;
      })
    })
  }

  //Agrega un empleado a la base de datos
  agregarEmpleado(empleado: Empleado) {
    //Agrega el empleado al array de empleados
    this.admi.empleados.push({ ...empleado });
    //retorna una promesa del que el empleado será guardado en la base de datos
    return this.http.put(`http://localhost:3000/administrador/${this.admi.uid}`, { ...this.admi })
  }


  obtenerPreguntas() {
    //Retorna las preguntas que estan guardadas en la base de datos
    return this.http.get('http://localhost:3000/preguntas/')
  }

  obtenerEmpleado() {
    //Retorna el administrador actual para obtener sus empleados
    return this.http.get(`http://localhost:3000/administrador/${this.admi.uid}`)
  }

  // Funcion que actualizará la información del empleado
  actualizarEmpleado(empleado: Empleado, index: number) {
    //Reemplaza el empleado con la información nueva
    this.admi.empleados[index] = empleado;
    //devuelve una promesa de que el empleado será actualizado
    return this.http.put(`http://localhost:3000/empleados/${this.admi.uid}`, this.admi.empleados )
  }

  eliminarEmpleado() {
    //devuelve una promesa de que el empleado será eliminado
    return this.http.put(`http://localhost:3000/empleados/${this.admi.uid}`, this.admi.empleados)
  }

  editarEmpleado() {
    return this.http.put(`http://localhost:3000/empleados/${this.admi.uid}`, this.admi.empleados)
  }


}
