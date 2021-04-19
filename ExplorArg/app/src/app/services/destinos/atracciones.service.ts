import { Atraccion } from './../../models/atraccion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class AtraccionesService {

  constructor(
    private http: HttpClient,
    private url: UrlService
  ) { }

  getAtracciones() {
    return this.http.get(this.url.urlAtracciones)
  }

  postAtracciones(val: Atraccion){
    return this.http.post(this.url.urlAtracciones, {
      Id: 0,
      Nombre: val.Nombre,
      Info: val.Info
    })
  }

  Atraccion_Destino(id_Destino: number, id_Atraccion: number){
    return this.http.post(this.url.urlDestino_Atraccion + "?idDestino=" + id_Destino + "&idAtraccion=" + id_Atraccion , {})
  }
}
