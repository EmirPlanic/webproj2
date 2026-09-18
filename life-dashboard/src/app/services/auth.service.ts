import { Injectable } from '@angular/core';

export interface KorisnikSesija {
  ime: string;
  email: string;
  tema: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private kljuc = 'ipiPrijava';

  ucitajIzUrl(): void {
    const params = new URLSearchParams(window.location.search);
    const ime = params.get('ime');
    const email = params.get('email');
    const tema = params.get('tema');

    if (email && ime && tema) {
      this.sacuvaj({ ime, email, tema });
      window.history.replaceState({}, '', '/');
    }
  }

  sacuvaj(korisnik: KorisnikSesija): void {
    localStorage.setItem(this.kljuc, JSON.stringify(korisnik));
  }

  getKorisnik(): KorisnikSesija | null {
    const raw = localStorage.getItem(this.kljuc);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as KorisnikSesija;
  }

  prijavljen(): boolean {
    return this.getKorisnik() !== null;
  }
}
