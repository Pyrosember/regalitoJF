document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');
    const thunderSound = document.getElementById('thunderSound');

    // Posiciona los destellos de forma aleatoria al cargar la página
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

    // Función para reproducir el trueno
    function playThunder() {
        thunderSound.currentTime = 0;
        thunderSound.play().catch(e => {
            console.warn("La reproducción automática de audio fue bloqueada. Es posible que se requiera una interacción del usuario (clic, scroll, etc.) para que el audio comience a sonar.", e);
        });
    }

    // Reproduce el audio del trueno inmediatamente al cargar la página
    playThunder();

    // Programa la reproducción del trueno a intervalos regulares (cada 15 segundos)
    const regularInterval = 15000; // 15 segundos en milisegundos
    setInterval(playThunder, regularInterval);
});
