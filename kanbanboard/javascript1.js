// Dodaj zadatak
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});

function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

document.getElementById("saveBoardBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById("savePdfBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const slika = canvas.toDataURL("image/png");
        const win = window.open("", "_blank");
        win.document.write("<html><head><title>Kanban PDF</title></head><body style='margin:0;text-align:center;'>");
        win.document.write("<img src='" + slika + "' style='max-width:100%;'>");
        win.document.write("</body></html>");
        win.document.close();
        win.focus();
        win.print();
    });
});

const mailModal = document.getElementById("mailModal");
const mailInput = document.getElementById("mailInput");

function getKanbanTekst() {
    let tekst = "Kanban ploca - IPI Akademija\n\n";
    document.querySelectorAll(".column").forEach(col => {
        const naslov = col.querySelector("h2").textContent;
        tekst += naslov + ":\n";
        col.querySelectorAll(".task").forEach(task => {
            tekst += "- " + task.textContent + "\n";
        });
        tekst += "\n";
    });
    return tekst;
}

document.getElementById("sendMailBtn").addEventListener("click", () => {
    mailModal.style.display = "block";
    mailInput.value = "";
    mailInput.focus();
});

document.getElementById("mailSend").addEventListener("click", () => {
    const email = mailInput.value.trim();
    if (email === "") return;

    const body = encodeURIComponent(getKanbanTekst());
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent("Kanban Board - IPI Akademija") + "&body=" + body;
    mailModal.style.display = "none";
});

document.getElementById("mailCancel").addEventListener("click", () => {
    mailModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === mailModal) {
        mailModal.style.display = "none";
    }
});

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
