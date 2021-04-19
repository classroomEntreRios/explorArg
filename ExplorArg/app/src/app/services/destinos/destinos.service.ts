import { Destino } from './../../models/destino.model';
import { UrlService } from './../url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  constructor(private http: HttpClient, private url: UrlService) { }


  getDestinos(){
    return this.http.get(this.url.urlDestinos);
  }

  postDestino(val: Destino){
    return this.http.post(this.url.urlDestinos, {
      Id: 0,
      Nombre: val.Nombre,
      Id_destino: val.Id_destino
    });
  }

   getDestino(nombre: string){
     return this.http.get(this.url.urlDestinos + "?nombre=" + nombre);
   }

   getIdDestino(nombre: string){
    return this.http.get(this.url.urlDestinos + "?nombre=" + nombre);
   }

   getAtracciones_Destinos(id: number){
     return this.http.get(this.url.urlDestinos + "/atracciones" + "?id=" + id);
   }
}
