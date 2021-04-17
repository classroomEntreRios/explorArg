import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

  datosUsuario: Usuario[] = [];
  datosU: any;
  
  constructor() { }

agregarDatos(val: Usuario){
  this.datosUsuario.push(val)
}

mostrarDatos(){
  return this.datosUsuario;
}

mostrarToken(){
  return this.datosUsuario[0].Token
}

}
