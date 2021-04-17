import { RegistroService } from './../../services/registro.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DatosService } from './../../services/datos.service';
import { Usuario } from './../../models/usuario';
import { IngresoService } from 'src/app/services/ingreso.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private registroS: RegistroService,
    private router: Router,
    private datos: DatosService,
    private cookieSvc: CookieService,
    private login : IngresoService
    ) { }

  logState : boolean = false;
  datosUsuario: Usuario[] = []

  ngOnInit(): void {
    this.verUsuarios();
    this.userLog();
  }

  cerrarModal(){
    location.reload();
  }

  verUsuarios(){
    this.registroS.obtenerUsuarios().subscribe(data =>{
      console.log(data)
    })
  }

  userLog() {
    let cookieString = this.cookieSvc.get('userCookie')
    let tokenString = this.datos.mostrarToken()
    if(tokenString == cookieString){
      console.log('Sesión de usuario ON')
      this.logState = true
    }else{
      this.cookieSvc.delete('userCookie')
      console.log('Sesión de usuario OFF')
      this.logState = false
      alert('Sesión de usuario expirada')
      setTimeout(() => {
        this.router.navigate(['ingreso'])
      }, 2000)
    }
  }
}
