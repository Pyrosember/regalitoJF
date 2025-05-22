document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');

    destellos.forEach((destello, index) => {
        // Generar posiciones aleatorias
        const randomTop = Math.random() * 90; // 0-90% para evitar que se salgan demasiado
        const randomLeft = Math.random() * 90; // 0-90%

        destello.style.top = `${randomTop}%`;
        destello.style.left = `${randomLeft}%`;

        // Generar un delay aleatorio para la animación de flicker (entre 0 y 8 segundos, por ejemplo)
        // Esto hará que cada destello empiece su ciclo en un momento diferente.
        const randomDelay = Math.random() * 8; // Max 8s, como la duración de la animación
        destello.style.animationDelay = `${randomDelay}s`;

        // Opcional: variar el tamaño aleatoriamente para un toque más orgánico
        // Ajustamos el rango de tamaño para móvil vs. desktop
        let minSize, maxSize;
        if (window.innerWidth < 768) { // Si es móvil
            minSize = 60;
            maxSize = 120;
        } else { // Si es desktop
            minSize = 100;
            maxSize = 200;
        }
        const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        destello.style.width = `${randomSize}px`;
        destello.style.height = `${randomSize}px`;

        // Opcional: Re-posicionar los destellos periódicamente para un efecto dinámico
        // Descomenta si quieres que se muevan constantemente
        /*
        setInterval(() => {
            const newRandomTop = Math.random() * 90;
            const newRandomLeft = Math.random() * 90;
            destello.style.top = `${newRandomTop}%`;
            destello.style.left = `${newRandomLeft}%`;
        }, (Math.random() * 10 + 10) * 1000); // Se mueven cada 10-20 segundos
        */
    });
});
