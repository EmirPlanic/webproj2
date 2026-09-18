import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  ime = '';
  email = '';
  tema = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const k = this.auth.getKorisnik();
    if (k) {
      this.ime = k.ime;
      this.email = k.email;
      this.tema = k.tema;
    }
  }
}
