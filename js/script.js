document.addEventListener('DOMContentLoaded', () => {
    const destellos = document.querySelectorAll('.destello');
    const thunderSound = document.getElementById('thunderSound');
    const rainLayers = document.querySelectorAll('.rain-layer');

    // 1. Posiciona los destellos de forma aleatoria al cargar la página
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

    // 2. Función para generar las gotas de lluvia (usando box-shadow)
    function generateRain(layerCount, size, opacity) {
        let shadows = '';
        for (let i = 0; i < layerCount; i++) {
            const x = Math.floor(Math.random() * window.innerWidth); // Posición X aleatoria
            const y = Math.floor(Math.random() * window.innerHeight); // Posición Y aleatoria
            // Cada 'gota' es un box-shadow con 1px de ancho y 'size' de alto
            shadows += `${x}px ${y}px ${size}px 1px rgba(255, 255, 255, ${opacity}),`;
        }
        return shadows.slice(0, -1); // Eliminar la última coma
    }

    // 3. Aplicar las gotas de lluvia a cada capa
    const numDrops = 300; // Número de gotas por capa (ajusta para más/menos lluvia)

    // Capa 1: Lluvia lejana (más gotas, más finas, menos opacas)
    const layer1Shadows = generateRain(numDrops * 1.5, 1, 0.8); // Más gotas, 1px de alto
    rainLayers[0].style.boxShadow = layer1Shadows;
    rainLayers[0].style.width = '1px'; // La gota base es 1px de ancho
    rainLayers[0].style.height = '1px'; // Y 1px de alto (el tamaño real viene del box-shadow)


    // Capa 2: Lluvia media
    const layer2Shadows = generateRain(numDrops, 2, 0.9); // Menos gotas, 2px de alto
    rainLayers[1].style.boxShadow = layer2Shadows;
    rainLayers[1].style.width = '1px';
    rainLayers[1].style.height = '1px';


    // Capa 3: Lluvia cercana (menos gotas, más gruesas, más opacas)
    const layer3Shadows = generateRain(numDrops * 0.5, 3, 1); // Menos gotas, 3px de alto
    rainLayers[2].style.boxShadow = layer3Shadows;
    rainLayers[2].style.width = '1px';
    rainLayers[2].style.height = '1px';

    // 4. Función para reproducir el trueno
    function playThunder() {
        thunderSound.currentTime = 0;
        thunderSound.play().catch(e => {
            console.warn("La reproducción automática de audio fue bloqueada. Es posible que se requiera una interacción del usuario (clic, scroll, etc.) para que el audio comience a sonar.", e);
        });
    }

    // 5. Reproduce el audio del trueno inmediatamente al cargar la página
    playThunder();

    // 6. Programa la reproducción del trueno a intervalos regulares (cada 15 segundos)
    const regularInterval = 15000; // 15 segundos en milisegundos
    setInterval(playThunder, regularInterval);
});
