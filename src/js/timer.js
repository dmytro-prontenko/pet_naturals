const orderBtn = document.querySelector(".hero__form-submit")
const todayNode = document.querySelector(".today-date")

const initialTime = 2 * 60 * 60 * 1000;
const timerElement = document.querySelector('.hero__form-timer');
let startTime = localStorage.getItem('timerStartTime');
let timerUsed = localStorage.getItem('timerUsed');
let remainingTime = initialTime;

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
    localStorage.setItem('remainingTime', remainingTime);
  } else {
    clearInterval(timerInterval);
    timerElement.textContent = 'Time\'s up!';
    orderBtn.disabled=true;
  }
}

if (startTime) {
  startTime = parseInt(startTime, 10);
  const elapsedTime = Date.now() - startTime;

  if (elapsedTime < initialTime) {
    remainingTime = initialTime - elapsedTime;
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