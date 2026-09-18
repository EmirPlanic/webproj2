const kvizForm = document.getElementById("kvizForm");
const kvizRezultat = document.getElementById("kvizRezultat");

const tocni = {
    p1: "a",
    p2: "b",
    p3: "b"
};

kvizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let bodovi = 0;

    for (let pitanje in tocni) {
        const odgovor = kvizForm.querySelector('input[name="' + pitanje + '"]:checked');
        if (odgovor && odgovor.value === tocni[pitanje]) {
            bodovi++;
        }
    }

    kvizRezultat.textContent = "Tvoj rezultat: " + bodovi + " / 3";
});
