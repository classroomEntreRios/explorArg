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

  consultante: Chat = new Chat;
  consultaExist : boolean = true;
  respuestaExist : boolean = false;
  isAdmin : boolean = false;
  isUser: boolean = false;
  respExist: boolean = false;

  localInfo: any = localStorage.getItem("Usuario");
  userInfo: any = JSON.parse(this.localInfo);

  consultaList: any;
  idChat: any;


  constructor(
    private fb: FormBuilder,
    private chatS: ChatService,
    private DatosUsuario: DatosUsuarioService,
  ) { }

  consultaForm : FormGroup = this.fb.group({
    emailChat: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    mensajeChat: ["", [Validators.required, Validators.maxLength(250), Validators.minLength(10)]]
  })

  putForm: FormGroup = this.fb.group({
    respuestaChat: ["", [Validators.required]]
  })

  ngOnInit(): void {
     this.adminStatus()
    // this.chatS.obtenerDatos().subscribe(resp => {
    //   console.log(resp)
    // })
    this.adminList();
  }



  getConsulta(email: any){
    this.chatS.getEmail(email).toPromise()
    .then(resp => {
      this.consultaList = resp;
    })
  }
  // COMPROBAR SI ES ADMIN
  adminStatus(){
    console.log(this.userInfo);
    if (this.userInfo == null){
      this.isUser = true;
    }else{
       if (this.userInfo.DatosUsuario.isAdmin == true){
         this.isAdmin = true;
         console.log(this.isAdmin);
       }else {
         this.isUser = true;
       }
    }
    // if (this.userInfo.DatosUsuario.isAdmin == true){
    //   this.isAdmin = true;
    // }
    // else {
    //   this.isUser = true;
    // }

  }

  adminList(){
    if (this.isAdmin == true){
      this.getDatos();
    }
  }
  // Post
  consulta(consultaForm : FormGroup){
    this.consultante = this.consultaForm.value;
    this.consultaForm.reset();

    this.chatS.PostChat(this.consultante).subscribe(post=>{
      consultaForm.value;
      })

    // console.log(consultaForm.value)
    }


  // USUARIO REQUERIDO
  CampoValido(campo: string){
    return this.consultaForm.controls[campo].errors &&
           this.consultaForm.controls[campo].touched;
  }

  mostrarInfo(){
    this.datosChat = this.consultaForm.value
}


  // Obtiene objeto Email y Mensaje
    getDatos(){
      this.chatS.obtenerDatos().subscribe( resp=>{
      this.consultaList = resp;
     })
  }

  getEmails(email: string){
    this.chatS.getEmail(email).subscribe(resp =>{
      this.consultaList = resp;
    })
  }

  getRespuesta(){
    // Si existe, retorna: respuestaExist = true
  }

  putModal(id: number){
    this.idChat = id;
  }
  postRespuesta(resp: FormGroup){
    let respuesta: string = resp.value.respuestaChat;
    console.log(respuesta);
    this.chatS.responderConsulta(this.idChat, respuesta).subscribe
    (resp => {
      window.location.reload();
    })
  }

  deleteMensaje(id: number){
    this.chatS.delete(id).toPromise()
    .finally(() => {
      window.location.reload()
    })
  }

  deleteRespuesta(id: number){
    this.chatS.eliminarRespuesta(id).subscribe(resp => {
      window.location.reload();
    })
  }

  // CLICK EN 'VER CONSULTAS REALIZADAS'
  // 1. Toma el email ingresado
  // 2. Compara si para ese email respuestaChat != '' (o sea, si contiene algo)
  // 3. Si es verdadero, hace un ngFor con las consultas y respuestas (si las hubiera)

}
