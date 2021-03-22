import { Routes, RouterModule } from '@angular/router';
import { RegistroService } from './services/registro.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DestinosComponent } from './components/destinos/destinos.component';
import { ContactoComponent } from './components/contacto/contacto.component';



const Routes: Routes =[
  { path: '', component: InicioComponent }, 
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    IngresoComponent,
    NavbarComponent,
    DashboardComponent,
    DestinosComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
