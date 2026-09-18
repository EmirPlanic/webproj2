const bingoBtn = document.getElementById("bingoBtn");
const bingoReset = document.getElementById("bingoReset");
const bingoBroj = document.getElementById("bingoBroj");
const bingoInfo = document.getElementById("bingoInfo");

let preostali = [];

function napuniBrojeve() {
    preostali = [];
    for (let i = 1; i <= 75; i++) {
        preostali.push(i);
    }
}

function izvuciBroj() {
    if (preostali.length === 0) {
        bingoInfo.textContent = "Svi brojevi su izvuceni. Resetuj igru.";
        return;
    }

    const index = Math.floor(Math.random() * preostali.length);
    const broj = preostali[index];
    preostali.splice(index, 1);

    bingoBroj.textContent = broj;
    bingoInfo.textContent = "Preostalo brojeva: " + preostali.length;
}

bingoBtn.addEventListener("click", izvuciBroj);

bingoReset.addEventListener("click", function () {
    napuniBrojeve();
    bingoBroj.textContent = "?";
    bingoInfo.textContent = "Brojevi se ne ponavljaju dok se ne resetuje igra.";
});

napuniBrojeve();
