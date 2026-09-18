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
}
