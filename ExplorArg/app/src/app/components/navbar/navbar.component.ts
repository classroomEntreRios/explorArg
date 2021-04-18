import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DatosService } from './../../services/datos.service';
import { DatosUsuarioService } from './../../services/datosUsuario/datos-usuario.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

usuario : any = []

  constructor(
    private cookieSvc: CookieService,
    private serv: DatosUsuarioService,
    private datos: DatosService) { }

  ngOnInit(): void {
    this.trueCookie()
    this.buscarDatos()
  }

  trueCookie() {
    if(this.cookieSvc.get('userCookie')){
      return true
    }else{
      return false
    }
  }

  buscarDatos(){
    this.usuario = this.datos.mostrarDatos();
  }

}
