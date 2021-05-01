import { Router } from '@angular/router';
import { DatosUsuarioService } from './../../services/datosUsuario/datos-usuario.service';
import { Usuario } from './../../models/usuario';
import { DatosService } from './../../services/datos.service';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgModel, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModalClose') modalClose: any;

  usuario: any = [];
  isAdmin: boolean = false;
  mostrarPanel: boolean = false;



  modifNombre: FormGroup = this.fb.group({
    Nombre: [[''], [Validators.required]]
  });
  modifEmail: FormGroup = this.fb.group({});
  modifPassw: FormGroup = this.fb.group({});


  constructor(
    private datos: DatosService,
    private fb: FormBuilder,
    private serv: DatosUsuarioService,
    private cookieSvc : CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // obtiene datos del usuario logeado
    this.buscarDatos();
    console.log(this.usuario);

    // rellena los campos del form
    this.modifNombre = this.fb.group({
      Nombre: [[this.usuario[0].Nombre], [Validators.required]],
    });
    this.modifEmail = this.fb.group({
      Email: [[this.usuario[0].Email], [Validators.required]],
    });
    this.modifPassw = this.fb.group({
      Password: [[''], [Validators.required]],
    });

    // muestra las opciones de administrador
    this.checkAdminstatus();

    this.userLog();
  }

  buscarDatos(){
    this.usuario = this.datos.mostrarDatos();
  }

  alerta(){
    alert("Funcionalidad no implementada");
  }


  putNombre(form: FormGroup){
      this.serv.modifNombre(
        this.usuario[0].id_usuarioReg,
        form.value.Nombre
      ).subscribe(resp =>
        {
          console.log(resp);
          this.modalClose.nativeElement.click();

        }, error => {
          console.log(error)
        }
        );

  }

  putEmail(form: FormGroup){
    this.serv.modifEmail(
      this.usuario[0].id_usuarioReg,
      form.value.Email
    ).subscribe(resp => {
      console.log(resp);
      this.modalClose.nativeElement.click();

    }, error => {
      console.log(error)
    })
  }

  putPassword(form: FormGroup){
    this.serv.modifPassw(
      this.usuario[0].id_usuarioReg,
      form.value.Password
    ).subscribe(resp => {
      console.log(resp)
      this.modalClose.nativeElement.click();
    }, error => {
      console.log(error)
    })
  }

  cerrarSesion() {
    this.cookieSvc.delete('userCookie');
  }

  checkAdminstatus(){
    if (this.usuario[0].isAdmin === true){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  switchPanel(){
    this.mostrarPanel = !this.mostrarPanel;
  }

  userLog() {
    let cookieString = this.cookieSvc.get('userCookie')
    let tokenString = this.datos.mostrarToken()
    if(tokenString == cookieString){
      console.log('Sesión de usuario ON')
    }else{
      this.cookieSvc.delete('userCookie')
      console.log('Sesión de usuario OFF')
      alert('Sesión de usuario expirada')
      setTimeout(() => {
        this.router.navigate(['ingreso'])
      }, 2000)
    }
  }

}
