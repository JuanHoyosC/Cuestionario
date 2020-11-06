import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CrudEmpleadosService } from '../../services/crud-empleados.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public _auth: AuthService, public _crud: CrudEmpleadosService) { }

  ngOnInit(): void {
  }

}
