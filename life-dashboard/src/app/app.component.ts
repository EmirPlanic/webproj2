import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ime = '';

  constructor(
    private auth: AuthService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.auth.ucitajIzUrl();
    const korisnik = this.auth.getKorisnik();
    if (korisnik) {
      this.ime = korisnik.ime;
      this.theme.primijeni(korisnik.tema);
    } else {
      this.theme.primijeni(this.theme.ucitaj());
    }
  }
}
