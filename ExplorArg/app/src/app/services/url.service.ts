import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }


// login y registro
urlRegistro = 'http://explorargdb.somee.com/api/usuario';
urlLogin = 'http://explorargdb.somee.com/api/usuario/login';

// dashboard usuario
putNombre = 'http://explorargdb.somee.com/api/usuario/editnombre';
putEmail = 'http://explorargdb.somee.com/api/usuario/editmail';
putPassw = 'http://explorargdb.somee.com/api/usuario/editpassw';
gettingToken = 'http://explorargdb.somee.com/api/usuario/token';

// destinos
urlDestinos = 'http://explorargdb.somee.com/api/destinos';
urlDestino_Atraccion = 'http://explorargdb.somee.com/api/destino_atraccion';

// atracciones
urlAtracciones = 'http://explorargdb.somee.com/api/atracciones';

// atractinos (atracciones y destinos)
urlAtractinos = 'http://explorargdb.somee.com/api/atractinos';

// openWeather
openWeathUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=9c52a24aa0e31859db10036c2852ef1f&units=metric&lang=sp&id=';

// Foro
urlForo = 'http://explorargdb.somee.com/api/foro';
urlForoTopic = 'http://explorargdb.somee.com/api/foroTopic';
urlForoCrud = 'http://explorargdb.somee.com/api/agregarTema';

// Chat
urlChat = 'http://explorargdb.somee.com/api/chat';
}
