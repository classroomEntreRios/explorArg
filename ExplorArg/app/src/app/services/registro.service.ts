import { Usuario } from './../models/usuario';
import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private url: UrlService, private http: HttpClient) { }

  obtenerUsuarios(){
    return this.http.get(this.url.urlRegistro);

  }

  registrarNuevoUsuario(datos: Usuario){
    return this.http.post(this.url.urlRegistro, datos)
  }


}
