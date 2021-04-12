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
}
