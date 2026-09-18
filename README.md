# IPI Akademija — Web Programiranje, Projekat 2

Personal Life Dashboard je nastavak Projekta 1. IPI stranica ostaje u HTML/CSS/JS, a dashboard radi u Angularu. Prijava i registracija su na IPI-ju, pa se Angular otvara u novom tabu sa podacima korisnika.

---

## Setup projekta

Treba ti Node.js (npr. 20+), npm, Firefox ili Chrome.

### 1. IPI Akademija (statika)

```bash
cd ~/Desktop/webproj2
firefox index.html
```

Registracija ili login upisuju korisnika u `localStorage` (`ipiKorisnici`, `ipiPrijava`). Nakon uspješne prijave otvara se `http://localhost:4200/` sa parametrima `ime`, `email`, `tema`.

### 2. Angular dashboard

```bash
cd ~/Desktop/webproj2/life-dashboard
npm install
npm start
```

Aplikacija je na `http://localhost:4200/`. Prije toga moraš biti prijavljen preko IPI stranice (ili ručno otvoriti URL sa parametrima).

### Struktura projekta

```
webproj2/
│
├── index.html              IPI meni, login/register linkovi
├── css/                    site.css, themes.css
├── js/                     app.js, auth.js, theme.js
├── pages/                  pocetna, kontakt, login, register, ...
│
└── life-dashboard/         Angular 19 aplikacija
    ├── public/             whiteboard, kanban, vision (iframe u Fun Zone)
    └── src/app/
        ├── pages/          profil, trackeri, statistika, fun-zone, ...
        ├── services/       auth, theme, tracker-data
        └── models/         tracker-moduli
```

---

## Opis funkcija

### js/auth.js (IPI)

`registrujKorisnika()` i `prijaviKorisnika()` čitaju formu, provjeravaju email/lozinku, sprema u `localStorage` i pozivaju `otvoriDashboard()` koji radi `window.open` na Angular sa query parametrima.

### life-dashboard — AuthService

`procitajParametre()` na startu čita URL, sprema sesiju u `localStorage` pod ključem `ipiPrijava` (origin 4200).

### life-dashboard — ThemeService

`primijeniTemu(tema)` postavlja `data-tema` na `<body>` (plava, zelena, roza).

### life-dashboard — TrackerDataService

- `getAktivniModuli()` / `sacuvajAktivne()` — koji moduli su uključeni (`trackerAktivni_{email}`)
- `getUnosi(modulId)` / `sacuvajUnose()` — dnevni unosi (`tracker_{email}_{modulId}`)
- `getUnosiZaPeriod()`, `sumaZaPeriod()`, `prosjekZaPeriod()` — za Statistiku i PDF

### My Trackers

`TrackeriComponent` — checkbox lista modula i kartice ka pojedinačnom trackeru.

`TrackerPageComponent` — forma datum/vrijednost/napomena, Spremi/Uredi, historija, kratki tekst statistike po modulu.

### Statistika

`StatistikaComponent` — Chart.js bar (san), line (učenje), pie (voda/obroci/navike), filter sedmice, jednostavni savjeti (if/else), `exportPdf()` preko jsPDF (sažetak + slike grafikona).

### Student Fun Zone

`FunBingoComponent`, `FunKvizComponent` — igre u Angularu.

`FunAlatComponent` — iframe na `/whiteboard/`, `/kanbanboard/index1.html`, `/visionboard/` iz `public/`.

---

## Način korištenja

1. Otvori IPI `index.html`, registruj se ili prijavi (izaberi temu).
2. U novom tabu se otvara dashboard — meni: View Profile, Student Fun Zone, My Trackers, Statistika.
3. U My Trackers uključi module, otvori npr. Sleep Tracker, unesi datum i sate, Spremi.
4. Statistika — izaberi sedmicu, pogledaj grafove; Preuzmi PDF izvještaj.
5. Fun Zone — Bingo, Kviz ili alati iz Projekta 1 u iframeu.

Podaci tracker-a su u browser localStorage po emailu korisnika. Firebase nije uključen u ovu verziju — sve je lokalno kao u zadatku za razvoj bez oblaka.

---

## Napomene

- `xdg-open index.html` na nekim sistemima otvara Discord umjesto browsera — koristi `firefox index.html`.
- Kanban PNG u iframeu i dalje koristi html2canvas s interneta (CDN u `javascript1.js`).
- Za produkcijski build: `npm run build` u `life-dashboard/` (izlaz u `dist/life-dashboard`).
