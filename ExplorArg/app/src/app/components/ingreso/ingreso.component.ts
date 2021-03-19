import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ingresoForm = new FormGroup({
    Email: new FormControl(""),
      Password: new FormControl("")
  });

  ingreso(form: FormGroup){

  }

  cerrarModal(){
    this.ingresoForm.reset();
  }
}
