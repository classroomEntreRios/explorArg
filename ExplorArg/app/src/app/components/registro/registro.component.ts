import { RegistroService } from './../../services/registro.service';
import { Usuario } from './../../models/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';


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
  usuarioCreado: boolean = false;
  mensajeError: any;
  usuarioExiste: boolean = false;


  constructor(private registroS: RegistroService) { }

  ngOnInit(): void {

  }


  registro(registroForm : FormGroup){
     this.nuevoUsuario = this.registroForm.value;
     this.registroForm.reset();

     this.registroS.registrarNuevoUsuario(this.nuevoUsuario).subscribe(resp =>{
      console.log(resp);
      this.usuarioExiste = false;
      this.usuarioCreado = true;
     })


    //  return new Promise((datos, error) => {
    //   this.registroS.registrarNuevoUsuario(this.nuevoUsuario).toPromise()
    //   .then(
    //     datos => {
    //       console.log(datos)
    //       this.usuarioExiste = false;
    //       this.usuarioCreado = true;
    //     },
    //     error => {
    //       this.mensaje = error;
    //       console.log(this.mensaje.error)
    //       this.usuarioExiste = true;
    //       if (this.mensaje.error){
    //         this.mensajeError = 'El usuario ya existe!'
    //       }
    //     }
    //   ).catch((error) => {
    //     console.log(error)
    //   })
    // })
  }



  cerrarModal(){
    window.location.reload();
  }


}
