// Cuenta regresiva al 23 de agosto de 2025, 19:00 (Francia, CEST = UTC+2)
const EVENT_ISO = "2025-08-23T19:00:00+02:00";

function updateCountdown() {
  const target = new Date(EVENT_ISO).getTime();
  const now = Date.now();
  const diff = target - now;

  const elDays = document.getElementById("days");
  const elHours = document.getElementById("hours");
  const elMinutes = document.getElementById("minutes");
  const elSeconds = document.getElementById("seconds");

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  if (diff <= 0) {
    elDays.textContent = "0";
    elHours.textContent = "0";
    elMinutes.textContent = "0";
    elSeconds.textContent = "0";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  elDays.textContent = String(d);
  elHours.textContent = String(h).padStart(2, "0");
  elMinutes.textContent = String(m).padStart(2, "0");
  elSeconds.textContent = String(s).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
