import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//pages
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { EncuestaComponent  } from './pages/encuesta/encuesta.component';
//guard

import { AuthGuard } from './guards/auth.guard';
import { NoAccessGuard } from './guards/no-access.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAccessGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [NoAccessGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'cuestionario/:empleado', component: EncuestaComponent, canActivate: [AuthGuard] },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
})
export class AppRoutingModule { }
