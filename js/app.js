const contentFrame = document.getElementById("contentFrame");
const navLinks = document.querySelectorAll(".nav-link[data-page]");
const submenuToggle = document.querySelector(".submenu-toggle");
const submenuParent = document.querySelector(".has-submenu");

function loadPage(page) {
    contentFrame.src = page;
}

function setActiveLink(clickedLink) {
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.classList.remove("active");
    });
    clickedLink.classList.add("active");
}

navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        loadPage(page);
        setActiveLink(link);
    });
});

if (submenuToggle && submenuParent) {
    submenuToggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            submenuParent.classList.toggle("open");
        }
    });
}
