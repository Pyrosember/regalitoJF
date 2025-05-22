document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');
    const thunderSound = document.getElementById('thunderSound');
    const startOverlay = document.getElementById('start-overlay');
    const startButton = document.getElementById('startButton');
    const body = document.body;

    // 1. Posiciona los destellos de forma aleatoria al cargar la página
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

    // 2. Función para iniciar todas las animaciones y el audio
    function startExperience() {
        body.classList.remove('paused'); // Quita la clase 'paused' para que las animaciones CSS comiencen
        
        // Intenta reproducir el audio inmediatamente (puede fallar si el navegador no lo permite sin interacción)
        thunderSound.play().catch(e => console.error("Error al reproducir el audio:", e));
        
        // Duración del ciclo de animación del rayo (15 segundos = 15000 milisegundos)
        const animationDuration = 15000; 

        // Momentos exactos de los flashes de rayo dentro del ciclo de 15 segundos (en milisegundos)
        // Estos deben coincidir lo más posible con los porcentajes de @keyframes relampago
        const flashTimings = [
            525,   // 3.5% de 15s
            2700,  // 18% de 15s
            4800,  // 32% de 15s
            8700,  // 58% de 15s
            11550, // 77% de 15s
            13575  // 90.5% de 15s (el flash más intenso)
        ];

        // Establece un bucle para reproducir el sonido en los momentos de los flashes
        setInterval(() => {
            flashTimings.forEach(time => {
                setTimeout(() => {
                    // Reinicia el audio al principio para permitir múltiples reproducciones rápidas
                    thunderSound.currentTime = 0; 
                    thunderSound.play().catch(e => console.error("Error al reproducir el trueno:", e));
                }, time);
            });
        }, animationDuration); // Repetir este conjunto de sonidos cada 15 segundos

        // 3. Oculta el overlay de inicio
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.remove(); // Elimina el overlay del DOM después de la transición
        }, 1000); // Espera a que la transición de opacidad termine (1 segundo)
    }

    // 4. Asocia la función startExperience al clic del botón
    startButton.addEventListener('click', startExperience);
});
