import { Routes } from '@angular/router';
import { BasicoComponent } from './pages/basico/basico.component';
import { ChargingComponent } from './pages/charging/charging.component';

export const routes: Routes = [
  { path: 'basico', component: BasicoComponent },
  { path: 'notfound', component: ChargingComponent },
  { path: '', redirectTo: '/basico', pathMatch: 'full' }, // Redirige la ruta raíz a /basico
  { path: '**', redirectTo: '/notfound' }, // Redirige cualquier otra ruta a /notfound
];
