import { Router } from '@angular/router';
import { DatosUsuarioService } from './../../services/datosUsuario/datos-usuario.service';
import { Usuario } from './../../models/usuario';
import { DatosService } from './../../services/datos.service';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgModel, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModalClose') modalClose: any;

  usuario: any = "";
  isAdmin: boolean = false;
  mostrarPanel: boolean = false;
  fechaActual: any = 0;
  fechaExp: any = 0;

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
    private router: Router,
    private datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    // obtiene datos del usuario logeado
    this.buscarDatos();
    // this.checkExpiration();


    // this.userLog();
  }

  buscarDatos(){
    // this.usuario = this.datos.mostrarDatos();
    let datos: any = localStorage.getItem("Usuario");
    this.usuario = JSON.parse(datos);
  }

  alerta(){
    alert("Funcionalidad no implementada");
  }


  switchPanel(){
    this.mostrarPanel = !this.mostrarPanel;
  }

  checkExpiration(){
    let TTE = this.usuario.FechaExpiracion;
    let fecha = new Date();
    // fecha.setDate(4);
    this.fechaActual = this.datepipe.transform(fecha, "yyyy-MM-dd");
    this.fechaExp = this.datepipe.transform(TTE, "yyyy-MM-dd")

    // fechaActual : fecha de hoy
    // fechaExp: fecha de vencimiento de la sesión
    if (this.fechaActual > this.fechaExp){
        console.log("la sesión expiró");
        localStorage.clear();
        this.router.navigateByUrl("/ingreso");
    } else {
        console.log("Sesión válida")
    }
  }
}
