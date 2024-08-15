import { Routes } from '@angular/router';
import { BasicoComponent } from './pages/basico/basico.component';

export const routes: Routes = [
  { path: 'basico', component: BasicoComponent },
  { path: '', redirectTo: '/basico', pathMatch: 'full' }, // Redirige la ruta raíz a /basico
];
