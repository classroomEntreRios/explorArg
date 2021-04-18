import { DestinosComponent } from './components/destinos/destinos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AtraccionesComponent } from './components/atracciones/atracciones.component';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
{ path: '', component: InicioComponent },
{ path: 'dashboard', canActivate: [AuthGuardService] , component: DashboardComponent},
{path: 'registro', component: RegistroComponent},
{path: 'ingreso', component: IngresoComponent},
{path: 'destinos', component: DestinosComponent},
{path: 'atracciones', component: AtraccionesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
