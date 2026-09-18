# IPI Akademija — Web Programiranje, Projekat 1

Ovo je dokumentacija mog projekta. Stranica je radjena u HTML-u, CSS-u i JavaScriptu kroz semestar web programiranja.

Glavna ideja je da imas jednu stranicu sa menijem, a sve ostalo se otvara u sredini ekrana. Tu su i alati iz lab vjezbe 7: whiteboard, vision board i kanban.

---

## Setup projekta

Da pokrenes projekat treba ti samo browser, najbolje Firefox ili Chrome.

Skines repo sa GitHuba, nadjes fajl index.html i otvoris ga u browseru. Desni klik pa Open With Firefox, ili iz terminala firefox index.html.

Kad se otvori vidis meni na vrhu. Kliknes sta hoces i stranica se ucita u sredini. Ne otvara se novi tab.

### Struktura projekta

```
webproj/
│
├── index.html                  glavna stranica, meni i iframe
├── README.md                   ova dokumentacija
│
├── css/
│   ├── site.css                stil menija, headera i iframe okvira
│   └── page.css                stil za pocetnu, kontakt, bingo i kviz
│
├── js/
│   ├── app.js                  navigacija, ucitava stranice u iframe
│   ├── kontakt.js              mailto za kontakt formu
│   ├── bingo.js                logika bingo igre
│   └── kviz.js                 provjera odgovora u kvizu
│
├── pages/
│   ├── pocetna.html            uvodna stranica
│   ├── onama.html              o akademiji
│   ├── kontakt.html            kontakt forma
│   ├── bingo.html              bingo igra
│   └── kviz.html               kviz pitanja
│
├── whiteboard/
│   ├── index.html              stranica whiteboarda
│   ├── style.css               izgled whiteboarda
│   ├── javascript.js           crtanje, brisanje, png, pdf, mail
│   └── marker.png              slika kursora za crtanje
│
├── visionboard/
│   ├── index.html              stranica vision boarda
│   ├── style.css               izgled ploce
│   ├── javascript.js           biljeske, slike, citati, spremanje
│   └── slike/
│       ├── pluto.png           pozadina pluta
│       ├── slika1.png
│       ├── slika2.png
│       ├── slika3.png
│       └── slika4.png
│
└── kanbanboard/
    ├── index1.html             stranica kanban ploce
    ├── style1.css              izgled kolona i modala
    └── javascript1.js          zadaci, drag and drop, png, pdf, mail
```

Navigacija radi preko iframe-a. Kad kliknes link, app.js promijeni sta se prikazuje u sredini. Funkcija koja to radi zove se loadPage i nalazi se u js/app.js.

---

## Opis funkcija

### js/app.js

loadPage(page) ucitava stranicu u iframe. Pozove se kad kliknes bilo koji link u meniju.

setActiveLink(clickedLink) oznaci koji link u meniju je trenutno aktivan.

Na kraju fajla ima event listeneri na linkove u meniju i na Student Fun Zone za mobitel.

### js/kontakt.js

Kad submitas kontakt formu, skripta procita polja i napravi mailto link. Otvori ti se email program sa vec popunjenom porukom. Ti samo posaljes.

Forma je u pages/kontakt.html.

### js/bingo.js

napuniBrojeve() napuni listu brojeva od 1 do 75.

izvuciBroj() izvuce jedan slucajan broj i prikaze ga. Isti broj se ne moze dva puta dok ne resetujes.

Reset dugme ponovo pozove napuniBrojeve.

Stranica je pages/bingo.html.

### js/kviz.js

Kad kliknes provjeri odgovore, skripta usporedi tvoje odgovore sa tacnim i ispise rezultat tipa 2 / 3.

Stranica je pages/kviz.html.

### whiteboard/javascript.js

podesiVelicinu() podesi velicinu canvasa.

koordinate(e) izracuna gdje si kliknuo na platnu.

pocniCrtanje, crtajLiniju i zavrsiCrtanje rade crtanje misem. Koriste canvas API.

Dugme Crtaj ukljucuje crtanje, Brisi ukljucuje brisanje, Ocisti brise sve.

Spremi PNG preuzme sliku. Snimi kao PDF otvori print i tamo sacuvas kao pdf.

Posalji mailom otvori mali prozor, uneses email i otvara se mailto.

HTML je whiteboard/index.html, stil whiteboard/style.css, kursor je marker.png.

### visionboard/javascript.js

makeDraggable(el) omoguci da povlacis element i da ga obrises pin ikonom.

Post It dodaje biljesku, Slika dodaje sliku, Citat dodaje citat.

saveBoard spremi plocu u localStorage. loadBoard je ucita kad opet otvoris stranicu.

Ocisti plocu brise sve.

Snimi kao PDF koristi window.print. Posalji mailom radi isto kao na whiteboardu.

Fajlovi su u visionboard/ folderu, slike su u visionboard/slike/.

### kanbanboard/javascript1.js

createTask(text) napravi novi zadatak koji mozes prevlaciti.

Dodaj zadatak otvara modal, upises tekst i zadatak ide u To Do kolonu.

Drag and drop radi preko draggable i dragover eventa. Uhvatis zadatak i prevuces u In Progress ili Done.

Ocisti plocu pita te da li si siguran pa brise sve.

Snimi PNG koristi html2canvas, treba ti internet. Snimi kao PDF isto ali kroz print.

getKanbanTekst() slozi tekst sa svim zadacima po kolonama za email.

Posalji mailom otvara popup kao na ostalim stranicama.

HTML je kanbanboard/index1.html, stil kanbanboard/style1.css.

---

## Nacin koristenja

### Opce

Otvoris index.html i koristis meni. Sve ostaje u istom prozoru.

Student Fun Zone ima padajuci meni sa Bingo, Kviz, Whiteboard, Visual Board i Kanban.

### Kontakt

Ides na Kontakt, popunis formu i kliknes Posalji poruku. Otvori se tvoj mail, ti posaljes.

### Bingo

Klikces Izvuci broj dok ne izvuces sve. Resetuj igru ako hoces ispocetka.

### Kviz

Odaberes odgovore i kliknes Provjeri odgovore.

### Whiteboard

Odaberes boju i debljinu, kliknes Crtaj i crtas misem. Brisi radi kao gumica. Spremi PNG ako hoces sliku, Snimi kao PDF ako hoces pdf. Posalji mailom ako hoces poslati nekom opis preko maila.

### Vision Board

Dodajes biljeske slike i citate. Povlacis ih misem. Spremi da sacuvas u browseru. Kad opet otvoris stranicu sve je tu. Pin ikona brise pojedinacni element.

### Kanban

Dodajes zadatke, prevlacis ih izmedju To Do, In Progress i Done. Snimi PNG ili PDF ako hoces sacuvati plocu. Posalji mailom salje listu zadataka na email.

### PDF na svim trima stranicama

Kliknes Snimi kao PDF, otvori se print, izaberes Save to PDF i sacuvas.

### Mail na svim trima stranicama

Kliknes Posalji mailom, upises email u popup, kliknes Posalji. Otvori se tvoj mail program, ti posaljes rucno.

---

## Ostalo

Projekat koristi HTML, CSS i JavaScript. Nema baze ni servera, sve radi u browseru.

Kanban png i pdf ne rade bez interneta zbog html2canvas biblioteke.

Ako ti se html otvara u Discordu umjesto browsera, otvori rucno u Firefoxu.

Prije predaje provjeri da sve stranice rade, da se otvaraju u sredini, i da pdf i mail dugmad rade na whiteboard vision i kanban.

Web programiranje 2025/2026
