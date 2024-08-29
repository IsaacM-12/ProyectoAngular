import { Routes } from '@angular/router';
import { BasicoComponent } from './pages/basico/basico.component';
import { ChargingComponent } from './pages/charging/charging.component';
import { StrategicPlanComponent } from './pages/StrategicPlan/StrategicPlan.component';

export const routes: Routes = [
  { path: 'basico', component: BasicoComponent },
  { path: 'notfound', component: ChargingComponent },
  { path: 'StrategicPlan', component: StrategicPlanComponent },
  { path: '', redirectTo: '/StrategicPlan', pathMatch: 'full' }, // Redirige la ruta si no hay nada
  { path: '**', redirectTo: '/notfound' }, // Redirige cualquier otra ruta a /notfound
];
