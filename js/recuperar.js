// js/recuperar.js

// 1. Inicializamos el ojito para esta pantalla (Reutilización de código / DRY)
if (typeof configurarOjito === "function") {
    configurarOjito('newPassword', 'toggleNewPassword');
}

// 2. Lógica principal de cambio de clave
document.addEventListener('DOMContentLoaded', () => {
    const recoverForm = document.getElementById('recoverForm');
    const mensajeDisplay = document.getElementById('recoverMessage');

    recoverForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('recoverEmail').value.trim();
        const nuevaClave = document.getElementById('newPassword').value;

        // Limpiamos mensajes anteriores
        mensajeDisplay.textContent = "";
        mensajeDisplay.style.color = "#e74c3c"; // Rojo para errores

        if (!email || !nuevaClave) {
            mensajeDisplay.textContent = "Por favor, completa ambos campos.";
            return;
        }

        // Paso A: Buscar al usuario
        const usuarioGuardado = localStorage.getItem(email);

        if (usuarioGuardado) {
            try {
                // Paso B: Deserializar (Sacarlo de la caja)
                const datosPersona = JSON.parse(usuarioGuardado);

                // Paso C: Actualizar el dato específico
                datosPersona.password = nuevaClave;

                // Paso D: Volver a Serializar y Guardar
                localStorage.setItem(email, JSON.stringify(datosPersona));

                // Éxito visual
                mensajeDisplay.style.color = "#2ecc71"; // Verde
                mensajeDisplay.textContent = "¡Contraseña actualizada con éxito!";

                // Redirigimos al login después de 2 segundos para que lea el mensaje
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);

            } catch (error) {
                mensajeDisplay.textContent = "Error al procesar los datos del usuario.";
            }
        } else {
            // Si el getItem devuelve null
            mensajeDisplay.textContent = "Este correo no está registrado en el sistema.";
        }
    });
});