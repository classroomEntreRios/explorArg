import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-agregardest',
  templateUrl: './agregardest.component.html',
  styleUrls: ['./agregardest.component.css']
})
export class AgregardestComponent implements OnInit {

  constructor(
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
