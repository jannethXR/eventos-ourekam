function countdown() {
  const eventDate = new Date("2025-08-23T19:00:00+02:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "¡El taller ya comenzó!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("countdown").innerHTML =
    `${days} Días ${hours} Horas ${minutes} Minutos ${seconds} Segundos`;

  setTimeout(countdown, 1000);
}

countdown();
