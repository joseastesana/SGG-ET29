// js/registro.js

// =================================================================
// 1. ESPERAMOS A QUE EL HTML ESTÉ TOTALMENTE CARGADO
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Capturamos el formulario y los contenedores de mensajes
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

        // ¡ATENCIÓN! Aquí eliminamos la validación de LocalStorage porque 
        // ahora de eso se encarga nuestra base de datos SGG.

        // 3. Éxito Pragmático: Enviar al Backend (Node.js)
        const datosUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email, 
            fechaNacimiento: fechaNacimiento,
            password: password 
        };

        successDisplay.textContent = "Procesando registro en el servidor SGG...";

        // Llamamos a nuestro propio servidor SGG
        fetch('http://localhost:3000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Le decimos que le mandamos un JSON
            },
            body: JSON.stringify(datosUsuario) // Convertimos el objeto en texto para el viaje
        })
        .then(respuesta => respuesta.json()) // Node nos responde y abrimos su mensaje
        .then(data => {
            if (data.mensaje === '¡Registro exitoso en SGG!') {
                successDisplay.textContent = data.mensaje + " Redirigiendo...";
                setTimeout(() => {
                    window.location.href = "index.html"; // Lo mandamos al login
                }, 2000);
            } else {
                // Si el backend nos mandó un error (ej: el mail ya existe)
                errorDisplay.textContent = data.mensaje;
                successDisplay.textContent = "";
            }
        })
        .catch(error => {
            // Si el servidor de Node está apagado o explotó
            console.error("Error en el Fetch:", error);
            errorDisplay.textContent = "Error de conexión con el servidor. Intente más tarde.";
            successDisplay.textContent = "";
        });

    }); // <--- Cierra el registroForm.addEventListener

}); // <--- ¡ESTA ES LA LLAVE QUE FALTABA PARA CERRAR EL DOMContentLoaded!