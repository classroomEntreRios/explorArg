import { Usuario } from './../../models/usuario';
import { DatosService } from './../../services/datos.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: any;
  nombreDeUsuario: string= '';
  

  constructor(private datos: DatosService) { }

  ngOnInit(): void {
    this.buscarDatos();
  }

  buscarDatos(){
    this.usuario = this.datos.mostrarDatos();
  }

  alerta(){
    alert("Funcionalidad no implementada");
  }
 
}