import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private service: ForoService,
    private fb: FormBuilder
  ) { }

    show: boolean = true;

    showPostDetails: boolean = false;
    createPost: boolean = false;
    showEdit: boolean = false;
    activateBackArrow: boolean = false
    foroData: any = []
    postInfo: any;
    postBody: Foro = {
                    id_topico : 0,
                    fk_id_usuarioReg:0 ,
                    Titulo :'' ,
                    Contenido : ''
                    };



    putForm : FormGroup = this.fb.group({
      id_topico: ['', [Validators.required]],
      fk_id_usuarioReg: ['', [Validators.required]],
      Titulo: ['', [Validators.required]],
      Contenido: ['', [Validators.required]],
    });

    postForm : FormGroup = this.fb.group({
      id_topico: ['', [Validators.required]],
      fk_id_usuarioReg: ['', [Validators.required]],
      Titulo: ['', [Validators.required]],
      Contenido: ['', [Validators.required]],
    });

  ngOnInit(): void {
    this.getTemas();
  }



 async getTemas(){
    let request = await this.service.getForoData().toPromise()
    .then(resp => {
      this.foroData = resp;
      console.log(this.foroData);
    }, error => {
      console.log(error)
    })
  }

  showDetails(info: any){
    this.show = false;
    this.showPostDetails = true;
    this.postInfo = info;
    this.activateBackArrow = true;
  }

  goBack(){
    this.show = true;
    this.showEdit = false;
    this.showPostDetails = false;
    this.createPost = false;
  }

  activateEdit(data: any){
    this.show = false;
    this.showEdit = !this.showEdit;
    this.postInfo = data;
    console.log(this.postInfo)

    this.putForm =  this.fb.group({
      id_topico: [this.postInfo.id_topico, [Validators.required]],
      fk_id_usuarioReg: [this.postInfo.fk_id_usuarioReg, [Validators.required]],
      Titulo: [this.postInfo.Titulo, [Validators.required]],
      Contenido: [this.postInfo.Contenido, [Validators.required]],
    });
  }

   async editPost(form :FormGroup){
     this.postBody = form.value;


    console.log(form.value);
     let request = await this.service.editar(this.postBody)
     .toPromise()
     .then(res => {
        this.route.navigateByUrl("foro")
     }, error => console.log(error))
  }

    async postPost(form: FormGroup){
     let request = await this.service.postForo(form.value)
     .toPromise()
     .then(res => {
       console.log(res)
     }, error => {
       console.log(error)
     })
  } // Continuar con esto 01/05

  showPostForm(){
    this.createPost = true;
    this.show = false;
  }

  deactivateEdit(){
    this.showEdit = false;
    this.createPost = false;
    this.show = true;

  }
}
