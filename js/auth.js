var USERS_KEY = "ipiKorisnici";
var SESSION_KEY = "ipiPrijava";

function getKorisnici() {
    var podaci = localStorage.getItem(USERS_KEY);
    if (!podaci) {
        return [];
    }
    return JSON.parse(podaci);
}

function sacuvajKorisnike(lista) {
    localStorage.setItem(USERS_KEY, JSON.stringify(lista));
}

function pronadjiKorisnika(email) {
    var lista = getKorisnici();
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].email === email) {
            return lista[i];
        }
    }
    return null;
}

function postaviSesiju(korisnik) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
        ime: korisnik.ime,
        email: korisnik.email,
        tema: korisnik.tema
    }));
    localStorage.setItem("ipiTema", korisnik.tema);
    if (typeof primijeniTemu === "function") {
        primijeniTemu(korisnik.tema);
    }
}

function otvoriAngularApp() {
    window.open("http://localhost:4200", "_blank");
}

var registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var ime = document.getElementById("regIme").value.trim();
        var email = document.getElementById("regEmail").value.trim();
        var pass = document.getElementById("regPass").value;
        var tema = document.getElementById("regTema").value;
        var poruka = document.getElementById("regPoruka");

        if (pronadjiKorisnika(email)) {
            poruka.textContent = "Korisnik sa tim emailom vec postoji.";
            return;
        }

        var novi = {
            ime: ime,
            email: email,
            password: pass,
            tema: tema
        };

        var lista = getKorisnici();
        lista.push(novi);
        sacuvajKorisnike(lista);

        postaviSesiju(novi);
        poruka.textContent = "Registracija uspjesna. Otvaram Angular aplikaciju...";
        setTimeout(otvoriAngularApp, 600);
    });

    var goLogin = document.getElementById("goLogin");
    if (goLogin) {
        goLogin.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "login.html";
        });
    }
}

var loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var email = document.getElementById("loginEmail").value.trim();
        var pass = document.getElementById("loginPass").value;
        var poruka = document.getElementById("loginPoruka");

        var korisnik = pronadjiKorisnika(email);

        if (!korisnik || korisnik.password !== pass) {
            poruka.textContent = "Pogresan email ili lozinka.";
            return;
        }

        postaviSesiju(korisnik);
        poruka.textContent = "Prijava uspjesna. Otvaram Angular aplikaciju...";
        setTimeout(otvoriAngularApp, 600);
    });

    var goRegister = document.getElementById("goRegister");
    if (goRegister) {
        goRegister.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "register.html";
        });
    }
}
