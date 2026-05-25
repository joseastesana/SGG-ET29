// Capturamos el formulario y los contenedores de mensajes
const registroForm = document.getElementById('registroForm');
const errorDisplay = document.getElementById('errorMessage');
const successDisplay = document.getElementById('successMessage');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ortogonalidad: evitamos que HTML recargue la página

    // 1. Captura de datos (Nivel Sintáctico)
    // Usamos .trim() para limpiar espacios vacíos accidentales al inicio o al final
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

    // 2. Validaciones Semánticas (Reglas de Negocio)

    // A. ¿Están todos los campos completos?
    if (!apellido || !nombre || !fechaNacimiento || !email || !repeatEmail || !password || !repeatPassword) {
        errorDisplay.textContent = "Por favor, completa todos los campos.";
        return; // El "return" corta la ejecución al instante (Fail Fast)
    }

    // B. ¿Los correos coinciden?
    if (email !== repeatEmail) {
        errorDisplay.textContent = "Los correos electrónicos no coinciden.";
        return;
    }

    // NUEVA VALIDACIÓN: Formato de Email
    // Este regex verifica: texto + @ + texto + . + texto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorDisplay.textContent = "El formato del correo electrónico no es válido (ejemplo@correo.com).";
        return;
    }
    // C. El "Patovica" de la Contraseña (Expresión Regular - Regex)
    // Regla: 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo especial.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    
    // .test() devuelve true si la contraseña cumple, false si no.
    if (!passwordRegex.test(password)) {
        errorDisplay.textContent = "La contraseña no cumple con los requisitos de seguridad indicados.";
        return;
    }

    // D. ¿Las contraseñas coinciden?
    if (password !== repeatPassword) {
        errorDisplay.textContent = "Las contraseñas no coinciden entre sí.";
        return;
    }

    // E. ¿El usuario ya existe en nuestra "Base de Datos" (LocalStorage)?
    if (localStorage.getItem(email)) {
        errorDisplay.textContent = "Este correo ya está registrado. Intenta iniciar sesión.";
        return;
    }

    // 3. Éxito Pragmático: Guardado de Datos
    // Armamos un objeto (preparándonos para cuando usemos Node.js y MySQL)
    const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        password: password // (En la vida real, aquí guardaríamos un Hash encriptado)
    };

    // Transformamos el objeto a texto plano (JSON) para guardarlo en el navegador
    localStorage.setItem(email, JSON.stringify(datosUsuario));

    // 4. Feedback de Usuario (UX) y Redirección
    successDisplay.textContent = "¡Registro exitoso! Preparando tu espacio...";
    
    // Esperamos 2.5 segundos para que lean el éxito, y los enviamos al Login
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2500);
});