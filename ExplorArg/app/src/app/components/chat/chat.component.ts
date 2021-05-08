import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import { DatosUsuarioService } from 'src/app/services/datosUsuario/datos-usuario.service';
import { ChatService } from './../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  email : any = 'todos putos'
  mensaje : any;
  usuario: any = '';

  mensajeList : Array<any> = [
    {mensajeChat: 'Mensaje random'},
    {mensajeChat2: 'Otro mensaje'}
    ]
  respuestaList : Array<any> = [
    {respuestaChat: 'Respuesta uno'}
    ]

    consultaList : Array<any> = [
      {mensaje: 'Recibir mensaje', respuesta: 'Recibir respuesta'},
      {mensaje: 'Segundo mensaje', respuesta: 'Segunda respuesta'}
    ]

  alternativeList : Array<any> = [
    {men1: 'Mensaje', men2: 'otra cosa'}
    // {res1: 'Respuesta'}
  ]

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
    private DatosUsuario: DatosUsuarioService,
  ) { }

  consultaForm : FormGroup = this.fb.group({
    Email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    Mensaje: ["", [Validators.maxLength(250)]]
  })



  ngOnInit(): void {
    // this.adminStatus(); Comentado porque me tira error
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


  // CLICK EN 'ENVIAR CONSULTA' (NO FUNCIONAAAAAAAAAAAAAAAAAAAAAAA)
  consulta(consultaForm : FormGroup){
    this.usuarioChat = this.consultaForm.value;
    this.consultaForm.reset();
 

    // this.chatS.registraroNuevoUsuario(this.datosChat[0]).subscribe(resp => {
    //   console.log(resp);
    }


  // USUARIO REQUERIDO (Porque era un buen usuario, ciertamente)
  CampoValido(campo: string){
    return this.consultaForm.controls[campo].errors &&
           this.consultaForm.controls[campo].touched;
  }


  // Obtiene objeto Email y Mensaje (vacíos)
  obtenerEmail(){
    // no anda
  }

  obtenerMensaje(){
    // 
  }

  postRespuesta(){

  }

  getRespuesta(){

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
