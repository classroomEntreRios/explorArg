import { RegistroService } from './../../services/registro.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm = new FormGroup({
    Nombre: new FormControl(""),
      Password: new FormControl(""),
      Email: new FormControl("")
  });
  nuevoUsuario: Usuario = new Usuario;
  mensaje : any;

  
  constructor(private registroS: RegistroService) { }

  ngOnInit(): void {
    this.verUsuarios();
  }


  registro(registroForm : FormGroup){
     this.nuevoUsuario = this.registroForm.value;

     return new Promise((datos, error) => {
      this.registroS.registrarNuevoUsuario(this.nuevoUsuario).toPromise()
      .then(
        datos => {
          console.log(datos)
        },
        error => {
          this.mensaje = error;
          console.log(this.mensaje.error)
        }
      ).catch((error) => {
        console.log(error)
      }) 
    })
  }

  verUsuarios(){
    return new Promise((datos, error) => {
      this.registroS.obtenerUsuarios().toPromise()
      .then(
        datos => {
          console.log(datos);
        },
        error => {
          console.log(error)
        }
      )
    })
  }

}
