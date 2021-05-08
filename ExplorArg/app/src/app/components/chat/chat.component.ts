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

  email : any;
  mensaje : any;
  usuario: any = '';

  datosChat : Chat[] = []

  usuarioChat: Chat = new Chat;
  consultaExist : boolean = true;
  respuestaExist : boolean = true;
  isAdmin : boolean = false;

  localInfo: any = localStorage.getItem("Usuario");
  userInfo: any = JSON.parse(this.localInfo);

  constructor(
    private fb: FormBuilder,
    private chatS: ChatService,
  ) { }

  consultaForm : FormGroup = this.fb.group({
    Email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    Mensaje: ["", [Validators.maxLength(250)]]
  })



  ngOnInit(): void {
    this.adminStatus();
    this.mostrarInfo();
  }

  // COMPROBAR SI ES ADMIN
  adminStatus(){
    if (this.userInfo.DatosUsuario.isAdmin){
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // CLICK EN 'ENVIAR CONSULTA'
  consulta(consultaForm : FormGroup){
    this.email = this.consultaForm.value;
    this.consultaForm.reset();

    this.chatS.registraroNuevoUsuario(this.email).subscribe(resp => {
      console.log(resp);

    // this.chatS.registraroNuevoUsuario(this.datosChat[0]).subscribe(resp => {
    //   console.log(resp);
    })
  }

  // USUARIO REQUERIDO (Porque era un buen usuario, ciertamente)
  CampoValido(campo: string){
    return this.consultaForm.controls[campo].errors &&
           this.consultaForm.controls[campo].touched;
  }


  async mostrarInfo(){
      this.datosChat = this.consultaForm.value
      console.log(this.datosChat)
  }

  // CLICK EN 'VER CONSULTAS REALIZADAS'
  // 1. Toma el email ingresado
  // 2. Compara si para ese email respuestaChat != ''
  // 3. Si es verdadero, hace un ngFor con las consultas y respuestas (si las hubiera)

}
