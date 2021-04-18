import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestinosComponent } from './destinos/destinos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardpanelComponent } from './dashboardpanel/dashboardpanel.component';
import { AtractivosComponent } from './atractivos/atractivos.component';
import { AtraccionesComponent } from './atracciones/atracciones.component';




@NgModule({

  declarations: [

  AtractivosComponent,

  AtraccionesComponent],

  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class ComponentsModule { }
