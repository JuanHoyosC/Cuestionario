import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';

//Components
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgregarEmpleadosComponent } from './components/agregar-empleados/agregar-empleados.component';
import { MostrarEmpleadosComponent } from './components/mostrar-empleados/mostrar-empleados.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { GraficaComponent } from './components/grafica/grafica.component';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavbarComponent,
    AgregarEmpleadosComponent,
    MostrarEmpleadosComponent,
    EncuestaComponent,
    PreguntasComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
