import { Usuario } from './../../models/usuario';
import { IngresoService } from './../../services/ingreso.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(private login: IngresoService) { }

  usuario : Usuario = new Usuario;

  ngOnInit(): void {
  }

  ingresoForm = new FormGroup({
    emailLogin: new FormControl(""),
    passwLogin: new FormControl("")
  });

  ingreso(form : FormGroup){

     return new Promise((resp,error) => {
      this.usuario.Email = this.ingresoForm.value.emailLogin;
      this.usuario.Password = this.ingresoForm.value.passwLogin;
      // setear nueva ruta controlador login
        this.login.autenticarUsuario(this.usuario).toPromise()
        .then(resp => {
          console.log(resp)
        }, error => {
          console.log(error)
        })
     })
  }

  cerrarModal(){
    this.ingresoForm.reset();
  }
}
