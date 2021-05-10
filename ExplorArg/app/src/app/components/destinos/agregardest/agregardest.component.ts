import { DestinosService } from './../../../services/destinos/destinos.service';
import { Destino } from './../../../models/destino.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateLocaleAndSetLanguage } from 'typescript';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';



@Component({
  selector: 'app-agregardest',
  templateUrl: './agregardest.component.html',
  styleUrls: ['./agregardest.component.css']
})
export class AgregardestComponent implements OnInit {

  postDestino: FormGroup = this.fb.group({
    Id: [0, [Validators.required]],
    Nombre: ['', [Validators.required]],
    Id_destino: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private serv: DestinosService
  ) { }


  dest: any;

  destinosPosibles: Destino[] = [
    {Id: 0, Nombre: "Paraná", Id_destino: 3841956},
    {Id: 0, Nombre: "Villa Paranacito", Id_destino: 3427386},
    {Id: 0, Nombre: "Federal", Id_destino: 3433956},
    {Id: 0, Nombre: "Rosario del Tala", Id_destino: 3429439},
    {Id: 0, Nombre: "Chajarí", Id_destino: 3435486},
    {Id: 0, Nombre: "San José", Id_destino: 3428928},
    {Id: 0, Nombre: "Villa Elisa", Id_destino: 3427443},
    {Id: 0, Nombre: "Crespo", Id_destino: 3427458},
    {Id: 0, Nombre: "Villa Hernandarias", Id_destino: 3427420},
    {Id: 0, Nombre: "Basavilbaso", Id_destino: 3436099},
    {Id: 0, Nombre: "Villa Larroque", Id_destino: 3431916},
    {Id: 0, Nombre: "Urdinarrain", Id_destino: 3427582},
    {Id: 0, Nombre: "Ibicuy", Id_destino: 3429778},
    {Id: 0, Nombre: "Lucas González", Id_destino: 3431005},
    {Id: 0, Nombre: "Santa Elena", Id_destino: 3428359},
    {Id: 0, Nombre: "Gualeguay", Id_destino: 3433661},
  ];



  ngOnInit(): void {
  }


  onSubmit(form: FormGroup){
    let nombre = form.value.Nombre;
    this.dest = this.destinosPosibles.find(d => d.Nombre == nombre);
    this.serv.postDestino(this.dest)
    .subscribe(resp =>{
      console.log(resp);
    }, error => {
      console.log(error);
    })
  }
}
