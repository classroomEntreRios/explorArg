import { Injectable } from '@angular/core';
import { Foro } from './../models/foro.model';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(
    private http: HttpClient,
    private url: UrlService
  ) { }

  // No me funciona todavía
  getForoData() {
    return this.http.get(this.url.urlForo)
  }

  getDetalles(id:number){
    return this.http.get(this.url.urlForo + "?id=" + id)
  }

  postForo(post: Foro){
    return this.http.post(this.url.urlForo, post)
  }

  editar(post: Foro){
    return this.http.put(this.url.urlForo , post)
  }



  // {
  //   id_topico: post.id_topico,
  //   fk_id_usuarioReg: post.fk_id_usuarioReg,
  //   Titulo: post.Titulo,
  //   Contenido: post.Contenido
  // }






}
