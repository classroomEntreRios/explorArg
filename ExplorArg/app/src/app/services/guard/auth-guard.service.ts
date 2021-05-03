import { CookieService } from 'ngx-cookie-service';
import { DatosService } from './../datos.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private datepipe: DatePipe
    ) { }

    localInfo: any;
    fechaActual: any = 0;
    fechaExp: any = 0;
    TTE: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      // buscamos dato del usuario en localstorage
      let datos: any = localStorage.getItem("Usuario");
      // parseamos los datos a JSON y los alojamos en localInfo
      this.localInfo = JSON.parse(datos);
      // recuperamos la fecha de expiración de los datos del usuario
      if (this.localInfo != null){
        this.TTE = this.localInfo.FechaExpiracion;
      } else { // si es null redirige al login
        this.router.navigateByUrl('/ingreso')
      }
      // definimos la fecha actual
      let fecha = new Date(); // fecha.setDate(4); <- para testear que funcione
      //transformamos ambas fechas al mismo formato
      this.fechaActual = this.datepipe.transform(fecha, "yyyy-MM-dd");
      this.fechaExp = this.datepipe.transform(this.TTE, "yyyy-MM-dd")

      // comprobamos que la fecha actual sea menor a
      //la fecha de expiración del localstorage
      if (this.fechaActual < this.fechaExp){
        console.log("Sesión válida")
        return true; // aprueba la activación del componente
      }else{
        console.log('El usuario no se encuentra autenticado, por favor ingrese con una cuenta o cree una nueva.')
        localStorage.clear();
        this.router.navigateByUrl('/ingreso')
        return false;
      }

  }
}
