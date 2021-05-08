import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestinosComponent } from './destinos/destinos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardpanelComponent } from './dashboardpanel/dashboardpanel.component';
import { AtraccionesComponent } from './atracciones/atracciones.component';
import { AgregardestComponent } from './destinos/agregardest/agregardest.component';
import { AgregarAComponent } from './atracciones/agregar/agregar-a/agregar-a.component';
import { ForomainComponent } from './foro/foromain/foromain.component';
import { ForotopicComponent } from './foro/forotopic/forotopic.component';
import { ForocrudComponent } from './foro/forocrud/forocrud.component';
import { FooterComponent } from './footer/footer.component';
import { FooterabsoluteComponent } from './footer/footerabsolute/footerabsolute.component';
import { TerminosComponent } from './terminos/terminos.component';




@NgModule({

  declarations: [

TerminosComponent],

  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class ComponentsModule { }
