import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-atracciones',
  templateUrl: './atracciones.component.html',
  styleUrls: ['./atracciones.component.css']
})
export class AtraccionesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) { }

  registroForm : FormGroup = this.fb.group({
    Nombre: ["", [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z ]*")]],
    ID: ["", [Validators.required, Validators.minLength(1), Validators.pattern("/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/")]],
});

  ngOnInit(): void {
  }

}
