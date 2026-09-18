import { Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';
import { FunZoneComponent } from './pages/fun-zone/fun-zone.component';
import { TrackeriComponent } from './pages/trackeri/trackeri.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { FunBingoComponent } from './pages/fun-bingo/fun-bingo.component';
import { FunKvizComponent } from './pages/fun-kviz/fun-kviz.component';
import { FunAlatComponent } from './pages/fun-alat/fun-alat.component';
import { StatistikaComponent } from './pages/statistika/statistika.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: ProfilComponent },
  { path: 'fun-zone', component: FunZoneComponent },
  { path: 'fun-zone/bingo', component: FunBingoComponent },
  { path: 'fun-zone/kviz', component: FunKvizComponent },
  { path: 'fun-zone/alat/:alat', component: FunAlatComponent },
  { path: 'trackeri', component: TrackeriComponent },
  { path: 'trackeri/:id', component: TrackerPageComponent },
  { path: 'statistika', component: StatistikaComponent },
  { path: '**', redirectTo: 'profil' }
];
