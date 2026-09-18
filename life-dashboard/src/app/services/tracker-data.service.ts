import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface TrackerUnos {
  datum: string;
  vrijednost: string;
  napomena: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackerDataService {
  constructor(private auth: AuthService) {}

  private getEmail(): string {
    const k = this.auth.getKorisnik();
    return k ? k.email : 'gost';
  }

  getAktivniModuli(): string[] {
    const raw = localStorage.getItem('trackerAktivni_' + this.getEmail());
    if (!raw) {
      return ['water', 'habit', 'sleep', 'study', 'meal', 'mood'];
    }
    return JSON.parse(raw) as string[];
  }

  sacuvajAktivne(module: string[]): void {
    localStorage.setItem('trackerAktivni_' + this.getEmail(), JSON.stringify(module));
  }

  getUnosi(modulId: string): TrackerUnos[] {
    const raw = localStorage.getItem('tracker_' + this.getEmail() + '_' + modulId);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as TrackerUnos[];
  }

  sacuvajUnose(modulId: string, unosi: TrackerUnos[]): void {
    localStorage.setItem('tracker_' + this.getEmail() + '_' + modulId, JSON.stringify(unosi));
  }

  /** Unosi ciji je datum u intervalu [od, do] (YYYY-MM-DD). */
  getUnosiZaPeriod(modulId: string, od: string, doDatum: string): TrackerUnos[] {
    const svi = this.getUnosi(modulId);
    const lista: TrackerUnos[] = [];
    for (let i = 0; i < svi.length; i++) {
      const d = svi[i].datum;
      if (d >= od && d <= doDatum) {
        lista.push(svi[i]);
      }
    }
    return lista;
  }

  /** Suma numerickih vrijednosti za modul u periodu. */
  sumaZaPeriod(modulId: string, od: string, doDatum: string): number {
    const unosi = this.getUnosiZaPeriod(modulId, od, doDatum);
    let ukupno = 0;
    for (let j = 0; j < unosi.length; j++) {
      ukupno += Number(unosi[j].vrijednost) || 0;
    }
    return ukupno;
  }

  /** Prosjek numerickih vrijednosti; 0 ako nema unosa. */
  prosjekZaPeriod(modulId: string, od: string, doDatum: string): number {
    const unosi = this.getUnosiZaPeriod(modulId, od, doDatum);
    if (unosi.length === 0) {
      return 0;
    }
    return this.sumaZaPeriod(modulId, od, doDatum) / unosi.length;
  }
}
