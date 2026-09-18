import { Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';
import { FunZoneComponent } from './pages/fun-zone/fun-zone.component';
import { TrackeriComponent } from './pages/trackeri/trackeri.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: ProfilComponent },
  { path: 'fun-zone', component: FunZoneComponent },
  { path: 'trackeri', component: TrackeriComponent },
  { path: '**', redirectTo: 'profil' }
];
