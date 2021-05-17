import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }


// login y registro
urlRegistro = 'https://explorargdb.somee.com/api/usuario';
urlLogin = 'https://explorargdb.somee.com/api/usuario/login';

// dashboard usuario
putNombre = 'https://explorargdb.somee.com/api/usuario/editnombre';
putEmail = 'https://explorargdb.somee.com/api/usuario/editmail';
putPassw = 'https://explorargdb.somee.com/api/usuario/editpassw';
gettingToken = 'https://explorargdb.somee.com/api/usuario/token';

// destinos
urlDestinos = 'https://explorargdb.somee.com/api/destinos';
urlDestino_Atraccion = 'https://explorargdb.somee.com/api/destino_atraccion';

// atracciones
urlAtracciones = 'https://explorargdb.somee.com/api/atracciones';

// atractinos (atracciones y destinos)
urlAtractinos = 'https://explorargdb.somee.com/api/atractinos';

// openWeather
openWeathUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=9c52a24aa0e31859db10036c2852ef1f&units=metric&lang=sp&id=';

// Foro
urlForo = 'https://explorargdb.somee.com/api/foro';
urlForoTopic = 'https://explorargdb.somee.com/api/foroTopic';
urlForoCrud = 'https://explorargdb.somee.com/api/agregarTema';

// Chat
urlChat = 'https://explorargdb.somee.com/api/chat';
}
