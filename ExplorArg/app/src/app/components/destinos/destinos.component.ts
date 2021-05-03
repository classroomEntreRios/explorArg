import { DatosService } from 'src/app/services/datos.service';
import { Observable } from 'rxjs';
import { ApiService } from './../../services/openWeather/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinosService } from './../../services/destinos/destinos.service';
import { AtraccionesService } from './,,/../../../services/destinos/atracciones.service';
import { AtractinosService } from './,,/../../../services/destinos/atractinos.service';
import { isJSDocThisTag } from 'typescript';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {

  constructor(
    private serv: DestinosService,
    private fb: FormBuilder,
    private clima: ApiService,
    private serv2: AtraccionesService,
    private serv3: AtractinosService,
    private datos: DatosService
  ) { }

  ngOnInit(): void {
    // this.datosU = this.datos.mostrarDatos();
    this.getDestinos();
    this.mostrarAtracciones()
    // this.verificarRol();

  }

  datosU: any;
  isAdmin: boolean = false;

  // DESTINOS
  destinos: any = [];
  destinoSeleccionado: any;
  idDestino: any;
  infoClima: any;
  mostrarInfo: boolean = false;
  mostrarSpinner: boolean = false;

  // ATRACCIONES
  atracciones: any = []
  idAtracciones: any
  nombreAtracciones: any
  infoAtracciones: any

  // ATRACTINOS (Atracciones y Destinos)
  atractinos: any = []
  fk_atractivos: any
  fk_destinos: any


  // DESTINOS FUNCTIONS

  destinosForm = this.fb.group({
    nombreDestino: [[''], [Validators.required]]
  })


  getDestinos(){
    this.serv.getDestinos()
    .subscribe(resp =>
      {
        this.destinos = resp;
        console.log(this.destinos);
      },
      error => {
        console.log(error);
      })
  }

  async getInfoDestino(form: FormGroup){
   this.idDestino =  this.buscarIdDestino(form.value.nombreDestino);
   this.mostrarInfo = false;
   this.mostrarSpinner = true;
   this.clima.getClima(this.idDestino[0].Id_destino)
   .subscribe(resp =>
    {
      this.infoClima = resp;
      // console.log(this.infoClima);
      this.mostrarSpinner = false;
      this.mostrarInfo = true;

    }, error => {
      console.log(error);
    })

   this.infoAtracciones =  await this.getAtracciones(this.idDestino[0].Id);
  }

  buscarIdDestino(nombre: string){
    return this.destinos.filter((x: { Nombre: string; }) => x.Nombre === nombre)
  }


  // ATRACTIVOS FUNCTIONS
  mostrarAtracciones() {
    this.serv2.getAtracciones()
    .subscribe( resp =>{
      this.atracciones = resp;
      // console.log(this.atracciones)
    }, err => {
      console.log(err)
    })
    console.log(this.atracciones)
  }



  // ATRACTINOS FUNCTIONS
  mostrarAtractinos() {
    this.atractinos = this.atractinos.getAtractinos()
    // return
  }


  verificarRol(){
    if (this.datosU[0].isAdmin){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  async getAtracciones(id: number): Promise<any>{
    let resp = await this.serv.getAtracciones_Destinos(id)
    .toPromise()
    return resp;
  }
}
