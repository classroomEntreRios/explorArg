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
}
