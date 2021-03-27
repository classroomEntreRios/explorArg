import { RegistroService } from './../../services/registro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private registroS: RegistroService) { }

  ngOnInit(): void {
    this.verUsuarios();
  }

  cerrarModal(){
    location.reload();
  }

  verUsuarios(){
    this.registroS.obtenerUsuarios().subscribe(data =>{
      console.log(data)
    })
  }
}
