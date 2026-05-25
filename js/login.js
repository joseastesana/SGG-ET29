// js/login.js

// 1. "Semilla" de datos: Simulamos que el usuario ya existe en LocalStorage
// Esto lo hacemos para que el sistema tenga con qué comparar.
const USUARIO_MAESTRO = {
    email: "usuario1@gmail.com",
    pass: "$123ASD$"
};

// Guardamos al usuario maestro si no existe (Simulación de DB)
if (!localStorage.getItem(USUARIO_MAESTRO.email)) {
    localStorage.setItem(USUARIO_MAESTRO.email, USUARIO_MAESTRO.pass);
}

// 2. Captura del formulario
const loginForm = document.getElementById('loginForm');
const errorDisplay = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue (Ortogonalidad)

    // Obtenemos los valores (Nivel Sintáctico)
    const emailIngresado = document.getElementById('email').value;
    const passIngresada = document.getElementById('password').value;

    // Limpiamos errores previos
    errorDisplay.textContent = '';

    // 3. Validación Semántica (Lógica de negocio)
    if (validarCredenciales(emailIngresado, passIngresada)) {
        // Éxito pragmático: El usuario entra al sistema
        alert("¡Bienvenido al Sistema de Gastos!");
        localStorage.setItem("sesion_activa", emailIngresado);
        // window.location.href = "dashboard.html"; // Comentado hasta tener la otra pantalla
    } else {
        // Error de validación
        errorDisplay.textContent = "Correo o contraseña incorrectos. Inténtalo de nuevo.";
    }
});

/**
 * Función reutilizable para validar (Principio DRY)
 */
function validarCredenciales(email, pass) {
    const passwordGuardada = localStorage.getItem(email);
    return passwordGuardada === pass;
}

// --- LÓGICA DEL SWITCHER DE DISEÑO ---

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// 1. Verificar si ya hay un tema guardado en LocalStorage
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'vanguard') {
    body.classList.add('vanguard-theme');
    themeIcon.textContent = '☀️'; // Cambia a sol si está en modo oscuro/vanguard
}

// 2. Escuchar el click del botón
themeToggle.addEventListener('click', () => {
    // Alternar la clase en el body
    body.classList.toggle('vanguard-theme');

    // Cambiar el ícono y guardar la preferencia
    if (body.classList.contains('vanguard-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'vanguard');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'classic');
    }
});