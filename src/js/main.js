import IMask from "imask";

const mobileMenu = document.querySelector(".js-menu-container");
const openMenuBtn = document.querySelector(".js-open-menu");
const closeMenuBtn = document.querySelector(".js-close-menu");
const menuLinks = document.querySelectorAll(".mobile-modal-link");
const phone = document.querySelector(".hero_form-phone");
const orderBtn = document.querySelector(".hero__form-submit")
const body = document.body;

const todayNode = document.querySelector(".today-date")

const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

todayNode.textContent=formattedDate


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


const initialTime = 20 * 1000; // 20 секунд в миллисекундах
const timerElement = document.querySelector('.hero__form-timer');
let startTime = localStorage.getItem('timerStartTime');
let timerUsed = localStorage.getItem('timerUsed');
let remainingTime = initialTime; // Инициализируем оставшееся время значением по умолчанию

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  remainingTime = initialTime - elapsedTime;

  if (remainingTime > 0) {
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    orderBtn.disabled=false;
    timerElement.textContent = formattedTime;
    localStorage.setItem('remainingTime', remainingTime); // Сохраняем оставшееся время
  } else {
    clearInterval(timerInterval);
    timerElement.textContent = 'Time\'s up!';
    orderBtn.disabled=true;
    // localStorage.removeItem('timerStartTime');
  }
}

if (startTime) {
  startTime = parseInt(startTime, 10);
  const elapsedTime = Date.now() - startTime;

  if (elapsedTime < initialTime) {
    remainingTime = initialTime - elapsedTime; // Устанавливаем оставшееся время на основе прошедшего времени
  } else {
    startTime = null;
    localStorage.removeItem('timerStartTime');
  }
}

if (!startTime && !timerUsed) {
  startTime = Date.now();
  localStorage.setItem('timerStartTime', startTime);
  localStorage.setItem('timerUsed', true);
}

const timerInterval = setInterval(updateTimer, 1000);

updateTimer();





