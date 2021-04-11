import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }


// login y registro
urlRegistro = 'https://localhost:44307/api/usuario';
urlLogin = 'https://localhost:44307/api/usuario/login';

// dashboard usuario
putNombre = 'https://localhost:44307/api/usuario/editnombre';
putEmail = 'https://localhost:44307/api/usuario/editmail';
putPassw = 'https://localhost:44307/api/usuario/editpassw';



}
