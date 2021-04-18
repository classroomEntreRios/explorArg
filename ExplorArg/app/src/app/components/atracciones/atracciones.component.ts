import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from './../../services/registro.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-atracciones',
  templateUrl: './atracciones.component.html',
  styleUrls: ['./atracciones.component.css']
})
export class AtraccionesComponent implements OnInit {

  constructor(
    private registroS: RegistroService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  registroForm : FormGroup = this.fb.group({
    Nombre: ["", [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z ]*")]],
    ID: ["", [Validators.required, Validators.minLength(1)]],
});

  ngOnInit(): void {
  }

}
