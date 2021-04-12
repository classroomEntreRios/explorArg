import { UrlService } from './../url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private url: UrlService ) { }


  getClima(id: string){
    return this.http.get(this.url.openWeathUrl +  id)
  }

}
