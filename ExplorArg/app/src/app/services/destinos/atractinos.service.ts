import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class AtractinosService {

  constructor(
    private http: HttpClient,
    private url: UrlService
  ) { }

  getAtractinos(){
    return this.http.get(this.url.urlAtractinos);
  }
}
