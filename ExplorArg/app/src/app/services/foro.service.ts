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









}
