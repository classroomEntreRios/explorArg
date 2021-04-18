import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DatosUsuarioService } from 'src/app/services/datosUsuario/datos-usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { IngresoService } from 'src/app/services/ingreso.service';


@Component({
  selector: 'app-dashboardpanel',
  templateUrl: './dashboardpanel.component.html',
  styleUrls: ['./dashboardpanel.component.css']
})
export class DashboardpanelComponent implements OnInit {

  datosU: any;
  tokenString: string = '';

  @ViewChild('myModalClose') modalClose: any;

  usuario: any = [];
  isAdmin: boolean = false;
  mostrarPanel: boolean = false;
  fPerfil: string = '/src/assets/img/user.png';

  modifNombre: FormGroup = this.fb.group({});
  modifEmail: FormGroup = this.fb.group({});
  modifPassw: FormGroup = this.fb.group({});



  constructor(
    private datos: DatosService,
    private fb: FormBuilder,
    private serv: DatosUsuarioService,
    private cookieSvc : CookieService,
    private ingreso: IngresoService,
    private router: Router
  ) {
    let cookieString = this.cookieSvc.get('userCookie')
    let tokenString = this.datos.mostrarToken()
    console.log('El valor de cookie es: ' + cookieString)
    console.log('El valor del token es: ' + tokenString)
  }

  ngOnInit(): void {
    // obtiene datos del usuario logeado
    this.buscarDatos();
    // rellena los campos del form
   this.modifNombre = this.fb.group({
    Nombre: [[("")], [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z ]*")]],
  });
  this.modifEmail = this.fb.group({
    Email: [[("")], [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
  });
  this.modifPassw = this.fb.group({
    Password: [[''], [Validators.required, Validators.minLength(8)]],
  });

  this.verificarRol();
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
    this.cookieSvc.get('userCookie');
    this.cookieSvc.delete('userCookie');
    this.router.navigate(['ingreso']);
  }

  // checkAdminstatus(){
  //   if (this.usuario[0].isAdmin === true){
  //     this.isAdmin = true;
  //   } else {
  //     this.isAdmin = false;
  //   }
  // }

  verificarRol(){
    if (this.datosU[0].isAdmin){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }
}

