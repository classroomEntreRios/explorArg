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





@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
