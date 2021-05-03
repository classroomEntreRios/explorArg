import { CookieService } from 'ngx-cookie-service';
import { DatosService } from 'src/app/services/datos.service';
import { Component, OnInit } from '@angular/core';
import { DatosUsuarioService } from 'src/app/services/datosUsuario/datos-usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;
  localInfo: any = localStorage.getItem("Usuario");
  parsedData: any;




  constructor(
    private datos: DatosService,
    private cookie: CookieService,
    private usuario: DatosUsuarioService
  ) { }

  ngOnInit(): void {
    this.check();
  }


  check(){
    this.parsedData = JSON.parse(this.localInfo);
    console.log(this.parsedData);
    if (this.parsedData != null){
      this.isLogged = true; // mostrá foro, dashboard y boton inicio
    }else {
      this.isLogged = false; // mostrá boton de iniciar sesión
    }
  }



}
