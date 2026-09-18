var ploca = document.getElementById('ploca');
var ctx = ploca.getContext('2d');
var crtam = false;
var brisem = false;
var zadnjiX = 0;
var zadnjiY = 0;

var inputBoja = document.getElementById('boja');
var inputDebljina = document.getElementById('debljina');
var btnCrtaj = document.getElementById('btnCrtaj');
var btnBrisi = document.getElementById('btnBrisi');
var btnOcisti = document.getElementById('btnOcisti');
var btnPng = document.getElementById('btnPng');
var btnPdf = document.getElementById('btnPdf');

btnCrtaj.classList.add('aktivan');

function podesiVelicinu() {
    var sirina = window.innerWidth * 0.9;
    var visina = window.innerHeight * 0.65;

    if (sirina > 900) {
        sirina = 900;
    }
    if (visina > 500) {
        visina = 500;
    }

    ploca.width = sirina;
    ploca.height = visina;
}

podesiVelicinu();
window.addEventListener('resize', podesiVelicinu);

function koordinate(e) {
    var rect = ploca.getBoundingClientRect();
    var x, y;

    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    return { x: x, y: y };
}

function pocniCrtanje(e) {
    crtam = true;
    var poz = koordinate(e);
    zadnjiX = poz.x;
    zadnjiY = poz.y;
    e.preventDefault();
}

function crtajLiniju(e) {
    if (!crtam) {
        return;
    }

    var poz = koordinate(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = inputDebljina.value;

    if (brisem) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = inputBoja.value;
    }

    ctx.beginPath();
    ctx.moveTo(zadnjiX, zadnjiY);
    ctx.lineTo(poz.x, poz.y);
    ctx.stroke();

    zadnjiX = poz.x;
    zadnjiY = poz.y;
    e.preventDefault();
}

function zavrsiCrtanje() {
    crtam = false;
    ctx.globalCompositeOperation = 'source-over';
}

ploca.addEventListener('mousedown', pocniCrtanje);
ploca.addEventListener('mousemove', crtajLiniju);
ploca.addEventListener('mouseup', zavrsiCrtanje);
ploca.addEventListener('mouseleave', zavrsiCrtanje);

ploca.addEventListener('touchstart', pocniCrtanje);
ploca.addEventListener('touchmove', crtajLiniju);
ploca.addEventListener('touchend', zavrsiCrtanje);

btnCrtaj.addEventListener('click', function () {
    brisem = false;
    btnCrtaj.classList.add('aktivan');
    btnBrisi.classList.remove('aktivan');
});

btnBrisi.addEventListener('click', function () {
    brisem = true;
    btnBrisi.classList.add('aktivan');
    btnCrtaj.classList.remove('aktivan');
});

btnOcisti.addEventListener('click', function () {
    ctx.clearRect(0, 0, ploca.width, ploca.height);
});

btnPng.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = ploca.toDataURL('image/png');
    link.click();
});

btnPdf.addEventListener('click', function () {
    var slika = ploca.toDataURL('image/png');
    var win = window.open('', '_blank');

    win.document.write('<html><head><title>Whiteboard PDF</title></head><body style="margin:0;text-align:center;">');
    win.document.write('<img src="' + slika + '" style="max-width:100%;">');
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
});

var mailModal = document.getElementById('mailModal');
var mailInput = document.getElementById('mailInput');
var btnMail = document.getElementById('btnMail');

btnMail.addEventListener('click', function () {
    mailModal.style.display = 'block';
    mailInput.value = '';
    mailInput.focus();
});

document.getElementById('mailSend').addEventListener('click', function () {
    var email = mailInput.value.trim();
    if (email === '') {
        return;
    }

    var poruka = encodeURIComponent(
        'Whiteboard crtez sa IPI Akademija stranice.\n' +
        'PNG sliku mozete preuzeti dugmetom Spremi PNG prije slanja.'
    );

    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Whiteboard - IPI Akademija') + '&body=' + poruka;
    mailModal.style.display = 'none';
});

document.getElementById('mailCancel').addEventListener('click', function () {
    mailModal.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target === mailModal) {
        mailModal.style.display = 'none';
    }
});
