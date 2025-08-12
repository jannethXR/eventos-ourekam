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

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // First, ensure the result container exists
  if (!result) return;
  
  // Create success and error messages if they don't exist
  if (!document.getElementById('success-message')) {
    const successDiv = document.createElement('div');
    successDiv.id = 'success-message';
    successDiv.innerHTML = `
      <div class="text-center py-8">
        <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">¡Inscripción Exitosa!</h3>
        <p class="text-gray-600 mb-6">Tu registro ha sido confirmado.</p>
        <a href="https://wa.me/your-number" class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"/>
          </svg>
          Únete al grupo WhatsApp para validar tu inscripción
        </a>
      </div>
    `;
    successDiv.classList.add('hidden');
    result.appendChild(successDiv);
  }

  if (!document.getElementById('error-message')) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.innerHTML = `
      <div class="text-center py-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Error en la Inscripción</h3>
        <p class="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
      </div>
    `;
    errorDiv.classList.add('hidden');
    result.appendChild(errorDiv);
  }

  // Get references to success and error elements
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  
  // Fade out form fields
  const formFields = form.querySelectorAll('.grid, button[type="submit"]');
  formFields.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s ease';
  });

  // Show loading state
  setTimeout(() => {
    formFields.forEach(el => el.style.display = 'none');
    result.classList.remove('hidden');
  }, 300);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    const json = await response.json();
    
    if (response.status == 200) {
      errorMessage.classList.add('hidden');
      successMessage.classList.remove('hidden');
    } else {
      successMessage.classList.add('hidden');
      errorMessage.classList.remove('hidden');
      console.log(response);
    }
  })
  .catch(error => {
    console.log(error);
    successMessage.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  });
});
