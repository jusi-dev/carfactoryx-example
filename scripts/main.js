const navBar = document.querySelector(".sticky");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

navMenu.style.marginTop = "-10px";

/*                                    */
        /* BURGER MENU */
/*                                    */

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navBar.classList.toggle("active");
});

document.querySelectorAll(".nav-elem").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
}));