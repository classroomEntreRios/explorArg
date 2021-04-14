import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DatosUsuarioService } from 'src/app/services/datosUsuario/datos-usuario.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboardpanel',
  templateUrl: './dashboardpanel.component.html',
  styleUrls: ['./dashboardpanel.component.css']
})
export class DashboardpanelComponent implements OnInit {



  @ViewChild('myModalClose') modalClose: any;

  usuario: any = [];
  isAdmin: boolean = false;
  mostrarPanel: boolean = false;
  fPerfil: string = '/src/assets/img/user.png';

  modifNombre: FormGroup = this.fb.group({
    Nombre: [[''], [Validators.required]]
  });
  modifEmail: FormGroup = this.fb.group({});
  modifPassw: FormGroup = this.fb.group({});



  constructor(
    private datos: DatosService,
    private fb: FormBuilder,
    private serv: DatosUsuarioService,
    private cookieSvc : CookieService
  ) { }

  ngOnInit(): void {
    // obtiene datos del usuario logeado
    this.buscarDatos();
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

  this.checkAdminstatus();
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

  gettingToken() {
    this.serv.getToken
    }


  cerrarSesion() {
    this.cookieSvc.get('userCookie');
    this.cookieSvc.delete('userCookie');
  }

  checkAdminstatus(){
    if (this.usuario[0].isAdmin === true){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
