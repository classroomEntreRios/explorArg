import { Router } from '@angular/router';
import { RegistroService } from './../../services/registro.service';
import { Usuario } from './../../models/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private registroS: RegistroService,
    private fb: FormBuilder,
    private route: Router) { }

  registroForm : FormGroup = this.fb.group({
      Nombre: ["", [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z ]*")]],
      Password: ["", [Validators.required, Validators.minLength(8)]],
      Email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
  });

  nuevoUsuario: Usuario = new Usuario;
  mensaje : any;
  usuarioCreado: boolean = false;
  mensajeError: any;
  usuarioExiste: boolean = false;


  ngOnInit(): void {
  }

  registro(registroForm : FormGroup){
     this.nuevoUsuario = this.registroForm.value;
     this.registroForm.reset();

     this.registroS.registrarNuevoUsuario(this.nuevoUsuario).subscribe(resp =>{
      console.log(resp);
      this.usuarioExiste = false;
      this.usuarioCreado = true;
      setTimeout(() => {
        this.route.navigate(['ingreso']);
      }, 2000)
     })
  }


  CampoValido(campo: string){
    return this.registroForm.controls[campo].errors &&
           this.registroForm.controls[campo].touched;
  }

  cerrarModal(){
    window.location.reload();
  }


}
