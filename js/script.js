document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');
    const thunderSound = document.getElementById('thunderSound');

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

    function playThunder() {
        thunderSound.currentTime = 0;
        thunderSound.play().catch(e => {
            console.warn("La reproducción automática de audio fue bloqueada. Es posible que se requiera una interacción del usuario (clic, scroll, etc.) para que el audio comience a sonar.", e);
        });
    }

    playThunder();
    const regularInterval = 15000;
    setInterval(playThunder, regularInterval);
});
