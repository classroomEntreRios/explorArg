import { AtraccionesService } from './../../../../services/destinos/atracciones.service';
import { Destino } from './../../../../models/destino.model';
import { DestinosService } from './../../../../services/destinos/destinos.service';
import { Atraccion } from './../../../../models/atraccion.model';
import { DatosService } from 'src/app/services/datos.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-agregar-a',
  templateUrl: './agregar-a.component.html',
  styleUrls: ['./agregar-a.component.css']
})
export class AgregarAComponent implements OnInit {

  listaDestinos: any;
  oAtraccion: Atraccion | any = new Atraccion;
  oDestino: Destino | any = new Destino;

  constructor(
    private fb: FormBuilder,
    private datos: DatosService,
    private destinos: DestinosService,
    private atr: AtraccionesService
  ) { }

  ngOnInit(): void {
    this.getDestinos();

  }

  postAtraccion: FormGroup = this.fb.group({
    Id: [0, [Validators.required]],
    Info: ['', [Validators.required]],
    Nombre: ['', [Validators.required]],
    perteneceAlDestino: ['', [Validators.required]]
  })

  async onSubmit(form: FormGroup){

    // crear el objeto atraccion para el post
      this.oAtraccion.Id = form.value.Id;
      this.oAtraccion.Nombre = form.value.Nombre;
      this.oAtraccion.Info = form.value.Info;

    // buscar info destino en base al nombre
    this.oDestino = await this.getDestino(form.value.perteneceAlDestino);
    // console.log("DESTINO:");
    // console.log(this.oDestino);


    //post
    let atraccion = await this.crearAtraccion(this.oAtraccion);
    // console.log("ATR:");
    // console.log(atraccion);

    // relación
    let relacion = await this.relacionDestinoAtraccion(this.oDestino.Id, atraccion.Id)
    .finally(() =>
    {
      form.reset();
      alert("Atracción creada correctamente")
    });
    // console.log("Llegamos hasta el final");
    // console.log(relacion);
  }

  getDestinos(){
    this.destinos.getDestinos()
    .subscribe(resp =>{
      this.listaDestinos = resp;
    })
  }



  async getDestino(nombre: string): Promise<any>{
    let resp = await this.destinos.getDestino(nombre)
    .toPromise();
    return resp
  }
  async crearAtraccion(obj: Atraccion): Promise<any>{
    let resp = await this.atr.postAtracciones(obj)
    .toPromise();
    return resp;
  }

  async relacionDestinoAtraccion(id_Destino: number, id_Atraccion: number){
   let resp = await this.atr.Atraccion_Destino(id_Destino, id_Atraccion)
   .toPromise()
   return resp;
  }
}
