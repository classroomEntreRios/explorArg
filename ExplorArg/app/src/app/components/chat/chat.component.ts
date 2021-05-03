import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import { ChatService } from './../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private chatS: ChatService,
  ) { }

  consultaForm : FormGroup = this.fb.group({
    Email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    Mensaje: ["", [Validators.maxLength(250)]]
  })

  usuarioChat: Chat = new Chat;
  usuarioCreado: boolean = false;

  ngOnInit(): void {
  }

  consulta(consultaForm : FormGroup){
    this.usuarioChat = this.consultaForm.value;
    this.consultaForm.reset();

    this.chatS.registraroNuevoUsuario(this.usuarioChat).subscribe(resp => {
      console.log(resp);
      this.usuarioCreado = true;
    })
  }

  CampoValido(campo: string){
    return this.consultaForm.controls[campo].errors &&
           this.consultaForm.controls[campo].touched;
  }

}
