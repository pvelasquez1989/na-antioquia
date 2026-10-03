import { Routes } from '@angular/router';

const sectionRoute = {
  loadComponent: () => import('./route-marker').then((module) => module.RouteMarker),
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', ...sectionRoute },
  { path: 'informacion-publica', ...sectionRoute },
  { path: 'instituciones', ...sectionRoute },
  { path: 'eventos', ...sectionRoute },
  { path: 'mercaderia', ...sectionRoute },
  { path: '**', redirectTo: '' },
];
