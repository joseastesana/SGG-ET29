// js/login.js

// Capturamos los elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorDisplay = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // 1. Captura de datos
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;

    // Limpiamos mensajes de error previos
    errorDisplay.textContent = '';

    // 2. Validación de campos vacíos
    if (!emailInput || !passwordInput) {
        errorDisplay.textContent = "Por favor, completa todos los campos.";
        return;
    }

    // 3. Lógica de Verificación (Consultando nuestra "Base de Datos" LocalStorage)
    const datosGuardados = localStorage.getItem(emailInput);

    if (datosGuardados) {
        try {
            // DESERIALIZACIÓN: Convertimos el texto JSON en objeto JS
            const usuario = JSON.parse(datosGuardados);

            // Verificamos si la contraseña coincide
            if (usuario.password === passwordInput) {
                
                // ÉXITO: Guardamos el nombre en sessionStorage para saludarlo en el Dashboard
                sessionStorage.setItem('usuarioActivo', usuario.nombre);
                
                // Feedback visual antes de redirigir
                console.log("Login exitoso para:", usuario.nombre);
                
                // Redirección al Dashboard (Panel de Control)
                // Nota: Asegúrate de tener creado el archivo dashboard.html
                window.location.href = "dashboard.html";

            } else {
                // FALLA: Contraseña incorrecta
                errorDisplay.textContent = "La contraseña ingresada es incorrecta.";
            }
        } catch (error) {
            // Manejo de errores por si hay datos "sucios" (de pruebas anteriores sin formato JSON)
            console.error("Error al leer el usuario:", error);
            errorDisplay.textContent = "Error en el formato de datos. Por favor, regístrate de nuevo.";
        }
    } else {
        // FALLA: El email no existe en LocalStorage
        errorDisplay.textContent = "El correo electrónico no está registrado.";
    }
});