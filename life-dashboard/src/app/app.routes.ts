import { Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';
import { FunZoneComponent } from './pages/fun-zone/fun-zone.component';
import { TrackeriComponent } from './pages/trackeri/trackeri.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: ProfilComponent },
  { path: 'fun-zone', component: FunZoneComponent },
  { path: 'trackeri', component: TrackeriComponent },
  { path: 'trackeri/:id', component: TrackerPageComponent },
  { path: '**', redirectTo: 'profil' }
];
