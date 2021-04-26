import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foro } from './../../../models/foro.model';
import { ForoService } from './../../../services/foro.service';


@Component({
  selector: 'app-foromain',
  templateUrl: './foromain.component.html',
  styleUrls: ['./foromain.component.css']
})
export class ForomainComponent implements OnInit {

  constructor(
    private route: Router,
    private service: ForoService
  ) { }


    foroData: any= []


  ngOnInit(): void {
    this.foroData = this.foroData.getForoData();
    console.log(this.foroData)
  }

}
