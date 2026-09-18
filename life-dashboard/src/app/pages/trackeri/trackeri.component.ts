import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SVI_MODULI, TrackerModul } from '../../models/tracker-moduli';
import { TrackerDataService } from '../../services/tracker-data.service';

@Component({
  selector: 'app-trackeri',
  imports: [RouterLink],
  templateUrl: './trackeri.component.html',
  styleUrl: './trackeri.component.scss'
})
export class TrackeriComponent implements OnInit {
  moduli: TrackerModul[] = SVI_MODULI;
  aktivni: string[] = [];

  constructor(private trackerData: TrackerDataService) {}

  ngOnInit(): void {
    this.aktivni = this.trackerData.getAktivniModuli();
  }

  ukljucen(id: string): boolean {
    return this.aktivni.indexOf(id) !== -1;
  }

  promjena(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (this.aktivni.indexOf(id) === -1) {
        this.aktivni.push(id);
      }
    } else {
      this.aktivni = this.aktivni.filter(function (x) { return x !== id; });
    }
    this.trackerData.sacuvajAktivne(this.aktivni);
  }

  prikaziNaDashboard(id: string): boolean {
    return this.aktivni.indexOf(id) !== -1;
  }
}
