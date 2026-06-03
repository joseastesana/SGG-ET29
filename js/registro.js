// js/registro.js

// =================================================================
// 1. ESPERAMOS A QUE EL HTML ESTÉ TOTALMENTE CARGADO
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Capturamos el formulario y los contenedores de mensajes ACÁ ADENTRO
    const registroForm = document.getElementById('registroForm');
    const errorDisplay = document.getElementById('errorMessage');
    const successDisplay = document.getElementById('successMessage');

    // 2. Inicializamos el validador pasando los IDs de esta pantalla
    if (typeof configurarValidacionClave === "function") {
        configurarValidacionClave('password', 'passwordRules');
    }

    // 3. Lógica del Submit
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ortogonalidad: evitamos que HTML recargue la página

        // Captura de datos (Nivel Sintáctico)
        const apellido = document.getElementById('apellido').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const email = document.getElementById('email').value.trim();
        const repeatEmail = document.getElementById('repeatEmail').value.trim();
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;

        // Limpiamos mensajes anteriores en cada nuevo intento
        errorDisplay.textContent = '';
        successDisplay.textContent = '';

        // Validaciones Semánticas (Reglas de Negocio)

        // A. ¿Están todos los campos completos?
        if (!apellido || !nombre || !fechaNacimiento || !email || !repeatEmail || !password || !repeatPassword) {
            errorDisplay.textContent = "Por favor, completa todos los campos.";
            return; 
        }

        // B. ¿Los correos coinciden?
        if (email !== repeatEmail) {
            errorDisplay.textContent = "Los correos electrónicos no coinciden.";
            return;
        }

        // Validación Formato Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDisplay.textContent = "El formato del correo electrónico no es válido (ejemplo@correo.com).";
            return;
        }

        // C. El "Patovica" de la Contraseña (Expresión Regular - Regex)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!passwordRegex.test(password)) {
            errorDisplay.textContent = "La contraseña no cumple con los requisitos de seguridad indicados.";
            return;
        }

        // D. ¿Las contraseñas coinciden?
        if (password !== repeatPassword) {
            errorDisplay.textContent = "Las contraseñas no coinciden entre sí.";
            return;
        }

        // E. ¿El usuario ya existe en LocalStorage?
        if (localStorage.getItem(email)) {
            errorDisplay.textContent = "Este correo ya está registrado. Intenta iniciar sesión.";
            return;
        }

        // Éxito Pragmático: Guardado de Datos
        const datosUsuario = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            password: password 
        };

        // Guardamos en el navegador
        localStorage.setItem(email, JSON.stringify(datosUsuario));

        // Feedback de Usuario (UX) y Redirección
        successDisplay.textContent = "¡Registro exitoso! Preparando tu espacio...";
        
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2500);
    });

}); // <--- ¡ÉSTA ES LA LLAVE Y EL PARÉNTESIS QUE FALTABAN!