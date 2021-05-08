import { Usuario } from './../models/usuario';
import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, Validators } from '@angular/forms';



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

clavesiguales(campo1:string, campo2:string){
return(fg:AbstractControl): Validators | null =>{
  const pass1= fg.get(campo1)?.value;
  const pass2= fg.get(campo2)?.value;
  if(pass1 !== pass2){
    fg.get(campo2)?.setErrors({});
    return null
  }else{
    fg.get(campo2)?.setErrors(null);
    return null
  }
}
}
}
