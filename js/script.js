document.addEventListener('DOMContentLoaded', () => {
    // Lógica para los destellos (solo se aplicará en index.html donde existen los .destello)
    const destellos = document.querySelectorAll('.destello');
    destellos.forEach((destello) => {
        const randomTop = Math.random() * 90;
        const randomLeft = Math.random() * 90;
        destello.style.top = `${randomTop}%`;
        destello.style.left = `${randomLeft}%`;
        const randomDelay = Math.random() * 8;
        destello.style.animationDelay = `${randomDelay}s`;
        let minSize, maxSize;
        if (window.innerWidth < 768) {
            minSize = 60;
            maxSize = 120;
        } else {
            minSize = 100;
            maxSize = 200;
        }
        const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        destello.style.width = `${randomSize}px`;
        destello.style.height = `${randomSize}px`;
    });

    // Lógica para el sonido del trueno - ELIMINADA DE AQUÍ
    // La gestionará p5_rain_effect.js
});