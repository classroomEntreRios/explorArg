import { ApiService } from './../../services/openWeather/api.service';
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
  climaLocal: any;




  constructor(
    private datos: DatosService,
    private cookie: CookieService,
    private usuario: DatosUsuarioService,
    private climaserv: ApiService
  ) { }

  ngOnInit(): void {
    this.check();
    this.clima();
  }


  check(){
    this.parsedData = JSON.parse(this.localInfo);

    if (this.parsedData != null){
      this.isLogged = true; // mostrá foro, dashboard y boton inicio
    }else {
      this.isLogged = false; // mostrá boton de iniciar sesión
    }
  }

  clima(){
    this.climaserv.getClima('3841956').subscribe(resp =>{
      this.climaLocal = resp;
    })
    ;
  }


}
