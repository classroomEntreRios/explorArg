import { CookieService } from 'ngx-cookie-service';
import { DatosService } from 'src/app/services/datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  islogged: boolean = false;
  isAdmin: boolean = false;
  datosU: any;

  constructor(
    private datos: DatosService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.datosU = this.datos.mostrarDatos();
    this.checkStatus()
  }

  checkStatus(){
    let token = this.datos.mostrarToken();
    let cookie = this.cookie.get('userCookie');

    if (token = cookie){
      this.islogged = true;
    }
    else if (this.datosU[0].isAdmin = true){
      this.isAdmin = true;
    }
    else{
      this.islogged = false;
    }
  }

}
