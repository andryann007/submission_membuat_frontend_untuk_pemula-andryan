var navbarToggler = document.getElementById('navbarToggler');
var navbarMenu = document.getElementById('mainNavbar');

navbarToggler.addEventListener("click", function () {
    if (navbarMenu.classList.contains("collapse")) {
        navbarMenu.classList.remove("collapse");
    } else {
        navbarMenu.classList.add("collapse");
    }
})