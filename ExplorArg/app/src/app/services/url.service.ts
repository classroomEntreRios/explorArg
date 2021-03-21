import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }



urlRegistro = 'https://localhost:44307/api/usuario';
urlLogin = 'https://localhost:44307/api/usuario/login';


}
