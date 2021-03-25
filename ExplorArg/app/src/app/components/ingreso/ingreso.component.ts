import { DatosService } from './../../services/datos.service';
import { RegistroService } from './../../services/registro.service';
import { Usuario } from './../../models/usuario';
import { IngresoService } from './../../services/ingreso.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(private login: IngresoService, private router: Router, private datos: DatosService) { }

  usuario : Usuario = new Usuario;
  usuarioAutenticado = false;
  respuesta: any;
  datosU: any;

  ngOnInit(): void {
  }

  ingresoForm = new FormGroup({
    emailLogin: new FormControl(""),
    passwLogin: new FormControl("")
  });


  ingreso(form : FormGroup){
      return new Promise((resolve,reject) => {
    //    // pasar los inputs del form al objeto usuario
       this.usuario.Email = this.ingresoForm.value.emailLogin;
       this.usuario.Password = this.ingresoForm.value.passwLogin;

       // promesa login
         this.login.autenticarUsuario(this.usuario).toPromise()
         //si la api devuelve 1 como resultado: redirige al dashboard y modifica valor del bool
         .then(resolve => {
           this.respuesta = resolve;
           if (this.respuesta.Resultado == 1){
             this.login.obtenerUsuario(this.usuario.Email.toString()).toPromise()
             .then(res => {
               this.datosU = res;
               this.datos.agregarDatos(this.datosU);
             })
             // redirige al dashboard
             this.router.navigate(['dashboard']);
             this.usuarioAutenticado = true;

           }
           // si el resultado es 0, emite alerta y redirige a la página de inicio
           else {
             alert('El usuario ingresado no existe');
             this.router.navigate(['']);
             }

         }, reject => {
           alert('Ocurrió un error inesperado, por favor intente nuevamente más tarde')
         })
      })

  }


  cerrarModal(){
    this.ingresoForm.reset();
  }

  guardarDatosUsuario(val: Usuario){
    this.datos.agregarDatos(val);
  }
}
