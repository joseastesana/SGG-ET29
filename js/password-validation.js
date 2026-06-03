// js/password-validation.js
// Módulo reutilizable para la validación de contraseñas en tiempo real

function configurarValidacionClave(inputId, rulesContainerId) {
    const passwordInput = document.getElementById(inputId);
    const passwordRulesContainer = document.getElementById(rulesContainerId);

    // Solo ejecutamos si ambos elementos existen en la página actual
    if (passwordInput && passwordRulesContainer) {
        
        const reqLength = document.getElementById('req-length');
        const reqUpper = document.getElementById('req-upper');
        const reqLower = document.getElementById('req-lower');
        const reqNumber = document.getElementById('req-number');
        const reqSpecial = document.getElementById('req-special');

        passwordInput.addEventListener('input', (e) => {
            const valor = e.target.value;

            // 1. Mostrar u ocultar contenedor
            if (valor.length > 0) {
                passwordRulesContainer.classList.add('show');
            } else {
                passwordRulesContainer.classList.remove('show');
            }

            // 2. Evaluar reglas (ETC: Si las reglas cambian, solo tocamos esto)
            evaluarRequisito(reqLength, valor.length >= 8);
            evaluarRequisito(reqUpper, /[A-Z]/.test(valor));
            evaluarRequisito(reqLower, /[a-z]/.test(valor));
            evaluarRequisito(reqNumber, /\d/.test(valor));
            evaluarRequisito(reqSpecial, /[\W_]/.test(valor));
        });

        // Función interna para pintar verde o rojo
        function evaluarRequisito(elemento, esValido) {
            if (!elemento) return;
            const icono = elemento.querySelector('.req-icon');

            if (esValido) {
                elemento.classList.remove('invalid');
                elemento.classList.add('valid');
                if (icono) icono.textContent = '✅';
            } else {
                elemento.classList.remove('valid');
                elemento.classList.add('invalid');
                if (icono) icono.textContent = '❌';
            }
        }
    }
}