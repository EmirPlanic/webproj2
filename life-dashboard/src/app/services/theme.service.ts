import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  primijeni(tema: string): void {
    if (!tema) {
      tema = 'plava';
    }
    document.body.setAttribute('data-tema', tema);
    localStorage.setItem('ipiTema', tema);
  }

  ucitaj(): string {
    const izSesije = localStorage.getItem('ipiTema');
    return izSesije || 'plava';
  }
}
