const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const ime = document.getElementById("ime").value.trim();
    const email = document.getElementById("email").value.trim();
    const predmet = document.getElementById("predmet").value.trim();
    const poruka = document.getElementById("poruka").value.trim();

    const mailSubject = encodeURIComponent(predmet);
    const mailBody = encodeURIComponent(
        "Ime i prezime: " + ime + "\n" +
        "Email: " + email + "\n\n" +
        poruka
    );

    window.location.href = "mailto:info@ipiakademija.ba?subject=" + mailSubject + "&body=" + mailBody;
});
