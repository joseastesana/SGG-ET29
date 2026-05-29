// js/password-toggle.js
// Archivo exclusivo para la UX de las contraseñas

function configurarOjito(inputId, botonId) {
    const input = document.getElementById(inputId);
    const boton = document.getElementById(botonId);

    // Verificamos que ambos elementos existan en la página actual
    if (input && boton) {
        boton.addEventListener('click', () => {
            // Alternamos entre texto y password
            if (input.type === 'password') {
                input.type = 'text';
                boton.textContent = '🔒'; // Ojo cerrado
            } else {
                input.type = 'password';
                boton.textContent = '👁️'; // Ojo abierto
            }
        });
    }
}

// ==========================================
// INICIALIZACIÓN DE LOS COMPONENTES
// ==========================================

// Para el campo "Contraseña" (Existe tanto en Login como en Registro)
configurarOjito('password', 'togglePassword');

// Para el campo "Repetir Contraseña" (Existe SOLO en Registro)
// Nota: Tenemos que asegurarnos de darle este ID al botón en el HTML
configurarOjito('repeatPassword', 'toggleRepeatPassword');