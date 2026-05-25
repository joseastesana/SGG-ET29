// js/theme.js
// Este archivo se encarga ÚNICAMENTE de la parte visual. Principio de Responsabilidad Única.

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Al cargar cualquier página, revisamos la preferencia del usuario
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'vanguard') {
    body.classList.add('vanguard-theme');
    if(themeIcon) themeIcon.textContent = '☀️';
}

// Lógica del botón (si existe en la página actual)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('vanguard-theme');

        if (body.classList.contains('vanguard-theme')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'vanguard');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'classic');
        }
    });
}