import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestinosComponent } from './destinos/destinos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardpanelComponent } from './dashboardpanel/dashboardpanel.component';
import { AtractivosComponent } from './atractivos/atractivos.component';




@NgModule({

  declarations: [

  AtractivosComponent],

  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class ComponentsModule { }
