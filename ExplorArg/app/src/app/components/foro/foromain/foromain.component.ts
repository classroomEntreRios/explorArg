import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foro } from './../../../models/foro.model';
import { ForoService } from './../../../services/foro.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-foromain',
  templateUrl: './foromain.component.html',
  styleUrls: ['./foromain.component.css']
})
export class ForomainComponent implements OnInit {

  constructor(
    private route: Router,
    private service: ForoService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) { }

    show: boolean = true;
    showPostDetails: boolean = false;
    createPost: boolean = false;
    showEdit: boolean = false;
    activateBackArrow: boolean = false
    foroData: any = []
    postInfo: any = "";
    postBody: Foro = {
                    id_topico : 0,
                    fk_id_usuarioReg:0 ,
                    Titulo :'' ,
                    Contenido : ''
                    };
    localInfo: any = localStorage.getItem("Usuario");
    userInfo: any = JSON.parse(this.localInfo);
    fechaActual: any = 0;
    fechaExp: any = 0;
    showAdmBtn: boolean = false;


    putForm : FormGroup = this.fb.group({
      id_topico: ['', [Validators.required]],
      fk_id_usuarioReg: ['', [Validators.required]],
      Titulo: ['', [Validators.required]],
      Contenido: ['', [Validators.required]],
    });

    postForm : FormGroup = this.fb.group({
      Usuario: [this.userInfo.DatosUsuario.Nombre, [Validators.required]],
      fk_id_usuarioReg: [this.userInfo.DatosUsuario.id_usuarioReg, [Validators.required]],
      Titulo: ['', [Validators.required]],
      Contenido: ['', [Validators.required]],
    });

  ngOnInit(): void {
    this.getTemas();
    this.adminStatus();
  }



 async getTemas(){
    let request = await this.service.getForoData().toPromise()
    .then(resp => {
      this.foroData = resp;
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

    this.putForm =  this.fb.group({
      id_topico: [this.postInfo.id_topico, [Validators.required]],
      fk_id_usuarioReg: [this.postInfo.fk_id_usuarioReg, [Validators.required]],
      Titulo: [this.postInfo.Titulo, [Validators.required]],
      Contenido: [this.postInfo.Contenido, [Validators.required]],
    });
  }

   async editPost(form :FormGroup){
     this.postBody = form.value;
     let request = await this.service.editar(this.postBody)
     .toPromise()
     .then(res => {
        window.location.reload();
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
       .finally(() => {
         form.reset();
         window.location.reload();
       })
  }

  deleteModal(data: any){
    this.postInfo = data;
  }

  async delPost(id: number){
    let request = await this.service.eliminar(id).toPromise()
    .then(resp => {
      window.location.reload();
    })
  }

  showPostForm(){
    this.createPost = true;
    this.show = false;
  }

  deactivateEdit(){
    this.showEdit = false;
    this.createPost = false;
    this.show = true;
  }

  adminStatus(){
    if (this.userInfo.DatosUsuario.isAdmin){
      this.showAdmBtn = true;
    }
    else {
      this.showAdmBtn = false;
    }
  }


}
