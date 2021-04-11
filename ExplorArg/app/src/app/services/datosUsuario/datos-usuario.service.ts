import { UrlService } from './../url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioService {

  constructor(private http: HttpClient, private url: UrlService) { }


modifNombre(id: number, nombre: string){
   return this.http.put(this.url.putNombre + '?id=' + id + '&nombre=' + nombre, {})
}

modifEmail(id: number, email: string){
  return this.http.put(this.url.putEmail + '?id=' + id + '&email=' + email, {}
  );
}

modifPassw(id: number, passw: string){
  return this.http.put(this.url.putPassw + '?id=' + id + '&nuevoPass=' + passw, {} );
}

}
