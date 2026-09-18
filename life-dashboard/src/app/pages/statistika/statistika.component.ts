import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import { AuthService } from '../../services/auth.service';
import { TrackerDataService } from '../../services/tracker-data.service';

@Component({
  selector: 'app-statistika',
  imports: [FormsModule],
  templateUrl: './statistika.component.html',
  styleUrl: './statistika.component.scss'
})
export class StatistikaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartSleep') chartSleepRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartStudy') chartStudyRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartPie') chartPieRef!: ElementRef<HTMLCanvasElement>;

  sedmicaOffset = 0;
  periodOd = '';
  periodDo = '';
  savjeti: string[] = [];

  private chartSleep: Chart | null = null;
  private chartStudy: Chart | null = null;
  private chartPie: Chart | null = null;

  constructor(
    private trackerData: TrackerDataService,
    private auth: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.osvjeziSve();
  }

  ngOnDestroy(): void {
    this.unistiGrafove();
  }

  promjenaSedmice(): void {
    this.osvjeziSve();
  }

  osvjeziSve(): void {
    const raspon = this.rasponSedmice(this.sedmicaOffset);
    this.periodOd = raspon.od;
    this.periodDo = raspon.do;
    this.savjeti = this.napraviSavjete(raspon.od, raspon.do);

    this.unistiGrafove();
    this.nacrtajSleep(raspon.daniLabels, raspon.daniIso);
    this.nacrtajStudy(raspon.daniLabels, raspon.daniIso);
    this.nacrtajPie(raspon.od, raspon.do);
  }

  /** Ponedjeljak–nedjelja; offset 0 = trenutna sedmica. */
  rasponSedmice(offset: number): { od: string; do: string; daniIso: string[]; daniLabels: string[] } {
    const danas = new Date();
    danas.setHours(12, 0, 0, 0);
    const dan = danas.getDay();
    const ponedjeljak = new Date(danas);
    const razlika = dan === 0 ? -6 : 1 - dan;
    ponedjeljak.setDate(danas.getDate() + razlika - offset * 7);

    const daniIso: string[] = [];
    const daniLabels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(ponedjeljak);
      d.setDate(ponedjeljak.getDate() + i);
      const iso = this.uIso(d);
      daniIso.push(iso);
      daniLabels.push(iso.slice(5));
    }

    return { od: daniIso[0], do: daniIso[6], daniIso, daniLabels };
  }

  uIso(d: Date): string {
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }

  nacrtajSleep(labels: string[], daniIso: string[]): void {
    const vrijednosti: number[] = [];
    for (let i = 0; i < 7; i++) {
      const datum = daniIso[i];
      const unosi = this.trackerData.getUnosiZaPeriod('sleep', datum, datum);
      let suma = 0;
      for (let j = 0; j < unosi.length; j++) {
        suma += Number(unosi[j].vrijednost) || 0;
      }
      vrijednosti.push(suma);
    }

    this.chartSleep = new Chart(this.chartSleepRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sati sna',
          data: vrijednosti,
          backgroundColor: 'rgba(45, 90, 135, 0.7)'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, title: { display: true, text: 'sati' } } }
      }
    });
  }

  nacrtajStudy(labels: string[], daniIso: string[]): void {
    const vrijednosti: number[] = [];
    for (let i = 0; i < 7; i++) {
      const datum = daniIso[i];
      const unosi = this.trackerData.getUnosiZaPeriod('study', datum, datum);
      let suma = 0;
      for (let j = 0; j < unosi.length; j++) {
        suma += Number(unosi[j].vrijednost) || 0;
      }
      vrijednosti.push(suma);
    }

    this.chartStudy = new Chart(this.chartStudyRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sati ucenja',
          data: vrijednosti,
          borderColor: '#2e7d4f',
          backgroundColor: 'rgba(46, 125, 79, 0.15)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, title: { display: true, text: 'sati' } } }
      }
    });
  }

  nacrtajPie(od: string, doDatum: string): void {
    const voda = this.trackerData.sumaZaPeriod('water', od, doDatum);
    const obroci = this.trackerData.sumaZaPeriod('meal', od, doDatum);
    const navike = this.trackerData.sumaZaPeriod('habit', od, doDatum);
    const ukupno = voda + obroci + navike;
    const podaci = ukupno > 0 ? [voda, obroci, navike] : [1, 1, 1];
    const boje = ukupno > 0
      ? ['#2d5a87', '#b84a6f', '#6a5acd']
      : ['#ddd', '#ddd', '#ddd'];

    this.chartPie = new Chart(this.chartPieRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Voda (case)', 'Obroci', 'Navike (broj)'],
        datasets: [{
          data: podaci,
          backgroundColor: boje
        }]
      },
      options: { responsive: true }
    });
  }

  napraviSavjete(od: string, doDatum: string): string[] {
    const lista: string[] = [];
    const prosjekSna = this.trackerData.prosjekZaPeriod('sleep', od, doDatum);
    const prosjekUcenja = this.trackerData.prosjekZaPeriod('study', od, doDatum);
    const prosjekRaspolozenja = this.trackerData.prosjekZaPeriod('mood', od, doDatum);
    const voda = this.trackerData.sumaZaPeriod('water', od, doDatum);

    if (prosjekSna > 0 && prosjekSna < 6) {
      lista.push('Prosjek sna u ovoj sedmici je nizak. Probaj leći ranije bar jedan dan.');
    } else if (prosjekSna >= 7) {
      lista.push('Dobar prosjek sna — nastavi tako.');
    }

    if (prosjekUcenja >= 3) {
      lista.push('Solidno si učio/la u odabranoj sedmici.');
    } else if (prosjekUcenja > 0 && prosjekUcenja < 2) {
      lista.push('Malo sati učenja — možda planiraj kraće dnevne sesije.');
    }

    if (voda > 0 && voda < 14) {
      lista.push('Popio/la si malo vode u sedmici. Ciljaj oko 2–3 case dnevno.');
    }

    if (prosjekRaspolozenja > 0 && prosjekRaspolozenja < 5) {
      lista.push('Raspoloženje je niže — pauza i hodanje ponekad pomaže.');
    } else if (prosjekRaspolozenja >= 7) {
      lista.push('Raspoloženje ti izgleda dobro u ovom periodu.');
    }

    if (lista.length === 0) {
      lista.push('Unesi podatke u trackere da bi ovdje vidio/la grafove i savjete.');
    }

    return lista;
  }

  unistiGrafove(): void {
    if (this.chartSleep) {
      this.chartSleep.destroy();
      this.chartSleep = null;
    }
    if (this.chartStudy) {
      this.chartStudy.destroy();
      this.chartStudy = null;
    }
    if (this.chartPie) {
      this.chartPie.destroy();
      this.chartPie = null;
    }
  }

  exportPdf(): void {
    const k = this.auth.getKorisnik();
    const ime = k ? k.ime : 'Korisnik';
    const doc = new jsPDF();
    let y = 14;

    doc.setFontSize(16);
    doc.text('Personal Life Dashboard — izvještaj', 14, y);
    y += 10;
    doc.setFontSize(11);
    doc.text('Korisnik: ' + ime, 14, y);
    y += 6;
    doc.text('Period: ' + this.periodOd + ' do ' + this.periodDo, 14, y);
    y += 10;

    doc.setFontSize(13);
    doc.text('Sažetak brojeva', 14, y);
    y += 8;
    doc.setFontSize(10);
    const redovi = [
      'Prosjek sna: ' + this.trackerData.prosjekZaPeriod('sleep', this.periodOd, this.periodDo).toFixed(1) + ' h',
      'Prosjek učenja: ' + this.trackerData.prosjekZaPeriod('study', this.periodOd, this.periodDo).toFixed(1) + ' h',
      'Ukupno vode: ' + this.trackerData.sumaZaPeriod('water', this.periodOd, this.periodDo) + ' casi',
      'Prosjek raspoloženja: ' + this.trackerData.prosjekZaPeriod('mood', this.periodOd, this.periodDo).toFixed(1)
    ];
    for (let i = 0; i < redovi.length; i++) {
      doc.text(redovi[i], 14, y);
      y += 6;
    }

    y += 4;
    doc.setFontSize(13);
    doc.text('Savjeti', 14, y);
    y += 8;
    doc.setFontSize(10);
    for (let s = 0; s < this.savjeti.length; s++) {
      const linije = doc.splitTextToSize(this.savjeti[s], 180);
      doc.text(linije, 14, y);
      y += linije.length * 5 + 2;
    }

    const grafovi: (Chart | null)[] = [this.chartSleep, this.chartStudy, this.chartPie];
    const naslovi = ['San (bar)', 'Učenje (line)', 'Voda / obroci / navike (pie)'];
    for (let g = 0; g < grafovi.length; g++) {
      const ch = grafovi[g];
      if (!ch) {
        continue;
      }
      if (y > 240) {
        doc.addPage();
        y = 14;
      }
      doc.setFontSize(12);
      doc.text(naslovi[g], 14, y);
      y += 4;
      const img = ch.toBase64Image('image/png', 1);
      doc.addImage(img, 'PNG', 14, y, 180, 70);
      y += 76;
    }

    doc.save('life-dashboard-izvjestaj.pdf');
  }
}
