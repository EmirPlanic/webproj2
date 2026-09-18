import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SVI_MODULI, TrackerModul } from '../../models/tracker-moduli';
import { TrackerDataService, TrackerUnos } from '../../services/tracker-data.service';

@Component({
  selector: 'app-tracker-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './tracker-page.component.html',
  styleUrl: './tracker-page.component.scss'
})
export class TrackerPageComponent implements OnInit {
  modul: TrackerModul | undefined;
  datum = '';
  vrijednost = '';
  napomena = '';
  zakljucano = false;
  unosi: TrackerUnos[] = [];
  editIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private trackerData: TrackerDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.modul = SVI_MODULI.find(function (m) { return m.id === id; });
    if (this.modul) {
      this.unosi = this.trackerData.getUnosi(this.modul.id);
    }
    this.datum = this.danas();
  }

  danas(): string {
    const d = new Date();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }

  spremi(): void {
    if (!this.modul || !this.datum || !this.vrijednost) {
      return;
    }

    const novi: TrackerUnos = {
      datum: this.datum,
      vrijednost: this.vrijednost,
      napomena: this.napomena
    };

    if (this.editIndex >= 0) {
      this.unosi[this.editIndex] = novi;
      this.editIndex = -1;
    } else {
      this.unosi.push(novi);
    }

    this.trackerData.sacuvajUnose(this.modul.id, this.unosi);
    this.zakljucano = true;
  }

  uredi(): void {
    this.zakljucano = false;
  }

  obrisi(i: number): void {
    if (!this.modul) {
      return;
    }
    this.unosi.splice(i, 1);
    this.trackerData.sacuvajUnose(this.modul.id, this.unosi);
  }

  urediUnos(i: number): void {
    const u = this.unosi[i];
    this.datum = u.datum;
    this.vrijednost = u.vrijednost;
    this.napomena = u.napomena;
    this.editIndex = i;
    this.zakljucano = false;
  }

  statistika(): string {
    if (this.unosi.length === 0) {
      return 'Nema unosa za prikaz.';
    }
    if (this.modul?.id === 'water') {
      let ukupno = 0;
      for (let i = 0; i < this.unosi.length; i++) {
        ukupno += Number(this.unosi[i].vrijednost) || 0;
      }
      return 'Ukupno casi vode (sve unose): ' + ukupno;
    }
    if (this.modul?.id === 'sleep' || this.modul?.id === 'study') {
      let ukupno = 0;
      for (let j = 0; j < this.unosi.length; j++) {
        ukupno += Number(this.unosi[j].vrijednost) || 0;
      }
      const prosjek = (ukupno / this.unosi.length).toFixed(1);
      return 'Prosjek sati: ' + prosjek;
    }
    if (this.modul?.id === 'meal') {
      let ukupno = 0;
      for (let k = 0; k < this.unosi.length; k++) {
        ukupno += Number(this.unosi[k].vrijednost) || 0;
      }
      return 'Ukupno obroka (svi unosi): ' + ukupno;
    }
    if (this.modul?.id === 'mood') {
      let ukupno = 0;
      for (let m = 0; m < this.unosi.length; m++) {
        ukupno += Number(this.unosi[m].vrijednost) || 0;
      }
      const prosjek = (ukupno / this.unosi.length).toFixed(1);
      return 'Prosjek raspolozenja (1-10): ' + prosjek;
    }
    return 'Broj unosa: ' + this.unosi.length;
  }
}
