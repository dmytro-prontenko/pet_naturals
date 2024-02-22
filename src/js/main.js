import IMask from "imask";

const mobileMenu = document.querySelector(".js-menu-container");
const openMenuBtn = document.querySelector(".js-open-menu");
const closeMenuBtn = document.querySelector(".js-close-menu");
const menuLinks = document.querySelectorAll(".mobile-modal-link");
const phone = document.querySelector(".hero_form-phone");
const body = document.body;

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", toggleMenu);
});
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  const isMenuOpen =
    openMenuBtn.getAttribute("aria-expanded") === "true" || false;
  openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
  mobileMenu.classList.toggle("is-open");
  body.classList.toggle("mobile-shown");
}

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (!e.matches) return;
  mobileMenu.classList.remove("is-open");
  openMenuBtn.setAttribute("aria-expanded", false);
  bodyScrollLock.enableBodyScroll(document.body);
  body.classList.toggle("mobile-shown");
});

const mask = new IMask(phone, {
  mask: "+{38}(000)000-00-00",
});


const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})
