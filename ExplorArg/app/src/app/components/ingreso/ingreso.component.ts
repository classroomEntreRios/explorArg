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
  usuarioAutenticado = false;

  ngOnInit(): void {
  }

  ingresoForm = new FormGroup({
    emailLogin: new FormControl(""),
    passwLogin: new FormControl("")
  });

  ingreso(form : FormGroup){

     return new Promise((resolve,reject) => {
      this.usuario.Email = this.ingresoForm.value.emailLogin;
      this.usuario.Password = this.ingresoForm.value.passwLogin;
        this.login.autenticarUsuario(this.usuario).toPromise()
        .then(resolve => {
          console.log(resolve);
          this.usuarioAutenticado = true;
          // hacer algo con esto
          
        }, reject => {
          console.log(reject)
        })
     })
  }

  cerrarModal(){
    this.ingresoForm.reset();
  }
}
