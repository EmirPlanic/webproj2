function primijeniTemu(tema) {
    if (!tema) {
        tema = localStorage.getItem("ipiTema");
    }
    if (!tema) {
        tema = "plava";
    }
    document.body.setAttribute("data-tema", tema);
    localStorage.setItem("ipiTema", tema);
}

primijeniTemu();
