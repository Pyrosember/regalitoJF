document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');
    const thunderSound = document.getElementById('thunderSound');

    // Posiciona los destellos de forma aleatoria al cargar la página
    destellos.forEach((destello) => {
        const randomTop = Math.random() * 90; // 0-90% para evitar que se salgan demasiado
        const randomLeft = Math.random() * 90; // 0-90%
        destello.style.top = `${randomTop}%`;
        destello.style.left = `${randomLeft}%`;

        const randomDelay = Math.random() * 8; // Delay aleatorio para la animación de flicker
        destello.style.animationDelay = `${randomDelay}s`;

        // Varía el tamaño aleatoriamente según el tamaño de la pantalla
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
    });

    // Función para reproducir el trueno de forma aleatoria (no sincronizada)
    function playRandomThunder() {
        // Reinicia el audio al principio para permitir múltiples reproducciones sin esperar
        thunderSound.currentTime = 0;
        // Intenta reproducir el trueno. Usamos .catch() para manejar si el navegador bloquea la reproducción automática.
        thunderSound.play().catch(e => {
            console.warn("Error al reproducir el trueno automáticamente. Es probable que necesites una interacción del usuario (clic, scroll, etc.) para permitir la reproducción de audio.", e);
        });

        // Calcula un nuevo delay aleatorio para la próxima reproducción
        // El trueno sonará entre 10 y 30 segundos después del anterior.
        const minDelay = 10000; // 10 segundos
        const maxDelay = 30000; // 30 segundos
        const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;

        // Programa la próxima reproducción del trueno
        setTimeout(playRandomThunder, nextDelay);
    }

    // Inicia la secuencia de truenos aleatorios
    // El primer trueno sonará después de 5 segundos de cargar la página.
    setTimeout(playRandomThunder, 5000);
});
