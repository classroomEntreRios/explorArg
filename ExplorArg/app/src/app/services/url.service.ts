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
gettingToken = 'https://localhost:44307/api/usuario/token';

// destinos
urlDestinos = 'https://localhost:44307/api/destinos';
urlDestino_Atraccion = 'https://localhost:44307/api/destino_atraccion';

// atracciones
urlAtracciones = 'https://localhost:44307/api/atracciones';

// atractinos (atracciones y destinos)
urlAtractinos = 'https://localhost:44307/api/atractinos';

// openWeather
openWeathUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=9c52a24aa0e31859db10036c2852ef1f&units=metric&lang=sp&id=';

// Foro
urlForo = 'https://localhost:44307/api/foro';
urlForoTopic = 'https://localhost:44307/api/foroTopic';
urlForoCrud = 'https://localhost:44307/api/agregarTema';

// Chat
urlChat = 'https://localhost:44307/api/chat';
}
