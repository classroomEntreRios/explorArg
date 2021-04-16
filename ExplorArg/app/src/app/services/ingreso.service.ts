import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private url: UrlService, private http:HttpClient) { }

  urlLogin: any;

  autenticarUsuario(datos: Usuario){
    return this.http.post(this.url.urlLogin, datos);
  }

  obtenerUsuario(email: string){
    return this.http.get(this.url.urlRegistro + '?Email=' + email)
  }

  obtenerToken(token: string){
    return this.http.get(this.url.urlRegistro + '?Token=' + token);
  }
}
