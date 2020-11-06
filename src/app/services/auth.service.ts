import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Administrador } from '../models/administrador.model';
import { Empleado } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId = '';
  public email: string = '';
  private admi: Administrador;
  private administrador: AngularFirestoreCollection<Administrador>;
  private empleados: AngularFirestoreCollection<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private http: HttpClient) {
    this.administrador = this.afs.collection<Administrador>('usuarios');
  }

  login(usuario: Usuario) {

    return this.afAuth.auth
      .signInWithEmailAndPassword(usuario.email, usuario.password)

  }

  nuevoUsuario(usuario: Usuario) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
  }

  agregarUsuario(sede: string) {

    this.afAuth.authState.subscribe((user: any) => {
      this.admi = null;
      if (!user) return;
      //Creamos un administrador
      this.admi = new Administrador(user.uid, user.email);
      this.http.get('http://localhost:3000/sedes').subscribe(res => {
   
        let arraySede = res[0][sede];

        //Convierte cada empleado de la base de dato a tipo Empleado y se los añade al administrador
        arraySede.forEach((empleado: any) => {
          const nuevoEmpleado = new Empleado(empleado.nombre, empleado.apellidos, empleado.puesto, empleado.expendiente);
          this.admi.empleados.push({ ...nuevoEmpleado });
        })

        //Le añade al administrador la sede
        this.admi.sede = sede;

        // Guarda en administrador en la base de dato con sus empleados por sede
        this.http.post('http://localhost:3000/administrador', { ...this.admi }).subscribe();
      });

    })
  }


  guardarToken(idToken: string) {

    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }


  salir() {
    this.afAuth.auth.signOut();
    localStorage.clear()
  }


  estaAutenticado(): boolean {
    const userToken = localStorage.getItem('token') || '';
    if (userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      this.salir();
      return false;
    }
  }
}
