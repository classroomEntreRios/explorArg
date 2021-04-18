import { DatosService } from './../../services/datos.service';
import { RegistroService } from './../../services/registro.service';
import { Usuario } from './../../models/usuario';
import { IngresoService } from './../../services/ingreso.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(
    private login: IngresoService,
    private router: Router,
    private datos: DatosService,
    private fb: FormBuilder,
    private cookieSvc : CookieService) { }

  usuario : Usuario = new Usuario;
  usuarioAutenticado = false;
  respuesta: any;
  datosU: any;
  cookieString : string = '';

  ngOnInit(): void {

  }

  ingresoForm : FormGroup = this.fb.group({
    emailLogin: [[""], [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    passwLogin: [[""], [Validators.required, Validators.minLength(8)]]
  });


  ingreso(form : FormGroup){
    // pasar los inputs del form al objeto usuario
    this.usuario.Email = this.ingresoForm.value.emailLogin;
    this.usuario.Password = this.ingresoForm.value.passwLogin;

    this.login.autenticarUsuario(this.usuario).subscribe(resp =>{
      this.respuesta = resp;
      if (this.respuesta.Resultado == 1){
        this.login.obtenerUsuario(this.usuario.Email.toString())
        .subscribe(resp => {
          this.datosU = resp;
          this.datos.agregarDatos(this.datosU);
          this.router.navigate(['dashboard']);
          this.usuarioAutenticado = true;
          this.cookieString = this.datosU.Token;
          this.cookieSvc.set('userCookie', this.cookieString , {expires: 15});
        })
      }
      // si el resultado es 0, emite alerta y redirige a la página de inicio
      else {
        alert('El usuario ingresado no existe');
        this.router.navigate(['']);
        }
    }, err =>{
      console.log(err)
      alert('Ocurrió un error inesperado, por favor intente nuevamente más tarde');
    })
  }



  registrate(){
    window.location.href = 'registro';
  }

  guardarDatosUsuario(val: Usuario){
    this.datos.agregarDatos(val);
  }


  CampoValido(campo: string){
    return this.ingresoForm.controls[campo].errors &&
           this.ingresoForm.controls[campo].touched;
  }


// userLog() {
//   let cookieString = this.cookieSvc.get('userCookie')
//   let tokenString = this.datos.mostrarToken()
//   if(tokenString == cookieString){
//     console.log('Sesión de usuario ON')
//   }else{
//     this.cookieSvc.delete('userCookie')
//     console.log('Sesión de usuario OFF')
//     alert('Sesión de usuario expirada')
//     setTimeout(() => {
//       this.router.navigate(['ingreso'])
//     }, 2000)
//   }
// }

}
