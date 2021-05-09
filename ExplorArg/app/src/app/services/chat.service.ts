import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

datosUsuario : Chat = new Chat

  constructor(
    private url : UrlService,
    private http : HttpClient
  ) { }

  obtenerDatos(){
    return this.http.get(this.url.urlChat)
  }

  PostChat(resp: Chat){
    return this.http.post(this.url.urlChat, resp)
  }

}
