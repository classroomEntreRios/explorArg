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

  email : any
  mensaje : any = 'Chespirito'
  usuario: any

  datosChat : Chat[] = []

  nuevoUsuario: Chat = new Chat;
  consultaExist : boolean = true;
  respuestaExist : string = 'algo';
  isAdmin : boolean = true;

  localInfo: any = localStorage.getItem("Usuario");
  userInfo: any = JSON.parse(this.localInfo);

  consultaList : Array<any> = [
    {mensaje: this.mensaje, respuesta: 'Recibir respuesta'},
    {mensaje: 'Segundo mensaje', respuesta: 'Segunda respuesta'}
    ]


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
    // this.adminStatus()
    this.chatS.obtenerDatos().subscribe(resp => {
      console.log(resp)
    })
    this.getDatos()
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
    this.nuevoUsuario = this.consultaForm.value;
    this.consultaForm.reset();

    this.chatS.PostChat(this.nuevoUsuario).subscribe(resp=>{
      console.log(resp);
      })
    }
  

  // USUARIO REQUERIDO
  CampoValido(campo: string){
    return this.consultaForm.controls[campo].errors &&
           this.consultaForm.controls[campo].touched;
  }

  mostrarInfo(){
    this.datosChat = this.consultaForm.value
    console.log(this.datosChat)
}


  // Obtiene objeto Email y Mensaje
  getDatos(){
      this.chatS.obtenerDatos().subscribe(resp=>{
      console.log(resp)
     })
  }

  getEmail(){
    
  }

  getRespuesta(){
    // Si existe, retorna: respuestaExist = true
  }

  postRespuesta(){
    // conectado
  }

  deleteMensaje(){
    // conectado
  }

  deleteRespuesta(){
    // conectado
  }

  // CLICK EN 'VER CONSULTAS REALIZADAS'
  // 1. Toma el email ingresado
  // 2. Compara si para ese email respuestaChat != '' (o sea, si contiene algo)
  // 3. Si es verdadero, hace un ngFor con las consultas y respuestas (si las hubiera)

}
