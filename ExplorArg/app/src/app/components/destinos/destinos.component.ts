import { ApiService } from './../../services/openWeather/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DestinosService } from './../../services/destinos/destinos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {

  constructor(
    private serv: DestinosService,
    private fb: FormBuilder,
    private clima: ApiService
  ) { }

  ngOnInit(): void {
    this.getDestinos();
  }

  destinos: any = [];
  destinoSeleccionado: any;
  idDestino: any;
  infoClima: any;
  mostrarInfo: boolean = false;

  destinosForm = this.fb.group({
    nombreDestino: [[''], [Validators.required]]
  })


  getDestinos(){
    this.serv.getDestinos()
    .subscribe(resp =>
      {
        this.destinos = resp;
      },
      error => {
        console.log(error);
      })
  }

  getInfoDestino(form: FormGroup){
   this.idDestino =  this.buscarIdDestino(form.value.nombreDestino);

   this.clima.getClima(this.idDestino[0].Id_destino).subscribe(resp =>
    {
      this.infoClima = resp;
      console.log(this.infoClima); //propiedades importantes: main(todas) - name - weather[0].description/icon
      this.mostrarInfo = true;
    }, error => {
      console.log(error);
    })
  }

  buscarIdDestino(nombre: string){
    return this.destinos.filter((x: { Nombre: string; }) => x.Nombre === nombre)
  }



}
