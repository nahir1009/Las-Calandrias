let currentIndex = 0;
const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
let startX = 0;
let startY = 0;
let isSwiping = false;

function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
    modalImg.src = images[currentIndex].src;
}

function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => (modal.style.display = "none"), 300);
}

function changeImage(direction) {
    modalImg.style.opacity = "0"; // Desvanece la imagen actual

    setTimeout(() => {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        modalImg.src = images[currentIndex].src;
        modalImg.style.opacity = "1"; // Muestra la nueva imagen con efecto fade
    }, 200);
}

function toggleMenu() {
    const menu = document.querySelector('.navbar-links');
    const hamburger = document.querySelector('.hamburger');

    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Cambia el icono ☰ a ✖ cuando el menú está activo
    if (menu.classList.contains('active')) {
        hamburger.innerHTML = '&#10006;'; // ✖
    } else {
        hamburger.innerHTML = '&#9776;'; // ☰
    }
}

// Detectar si el dispositivo es táctil antes de activar el deslizamiento
if ('ontouchstart' in window) {
    modalImg.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false; // Reiniciar la variable de deslizamiento
    });

    modalImg.addEventListener("touchmove", (e) => {
        if (isSwiping) return; // Evitar acciones repetidas de deslizamiento

        let moveX = e.touches[0].clientX - startX;
        let moveY = e.touches[0].clientY - startY;

        if (Math.abs(moveX) > 50 && Math.abs(moveX) > Math.abs(moveY)) {
            // Deslizar horizontalmente
            changeImage(moveX > 0 ? -1 : 1);
            startX = e.touches[0].clientX; // Actualizar la posición de inicio para el siguiente movimiento
            isSwiping = true; // Evitar múltiples detecciones de deslizamiento
        }
    });

    modalImg.addEventListener("touchend", () => {
        isSwiping = false; // Permitir que el deslizamiento se restablezca después de soltar el dedo
    });
}

// Variables para el navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

// Detectar el tamaño de la pantalla y solo aplica la animación en desktop
function handleScroll() {
    if (window.innerWidth > 768) { // Solo aplica el efecto en pantallas mayores a 768px (pc)
        let currentScroll = window.scrollY || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            navbar.style.top = '-120px'; // Ocultar navbar en scroll down
        } else {
            navbar.style.top = '0'; // Mostrar navbar en scroll up
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
        navbar.style.top = '0'; // Asegurar que el navbar siempre esté visible en móviles
    }
}

// Agregar evento de scroll
window.addEventListener('scroll', handleScroll);
