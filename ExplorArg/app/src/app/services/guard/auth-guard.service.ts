import { CookieService } from 'ngx-cookie-service';
import { DatosService } from './../datos.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private datos: DatosService,
    private cookie: CookieService
    ) { }

    userToken: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      this.userToken = this.datos.mostrarToken;
      let cookieToken = this.cookie.get('userCookie');
      if (this.userToken = cookieToken){
        return true;
      }else{
        this.router.navigate(['ingreso']);
        console.log('El usuario no se encuentra autenticado, por favor ingrese con una cuenta o cree una nueva.')
        return false;
      }

  }
}
