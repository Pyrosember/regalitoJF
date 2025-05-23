// --- p5.js RAIN AND THUNDER EFFECT ---

let gotas = [];
let cantidad = 800; // Can adjust this based on performance/desired density
let truenoSound; // Renamed to avoid conflict with HTML audio element ID if any

let ruidoLluvia;
let volumenMaximoLluvia = 0.2; // Max volume for rain ambient sound
let volumenLluvia = 0.05; // Starting volume, adjust for subtle background rain

function preload() {
    // Ensure these paths are correct relative to where your HTML files are
    // For example, if HTML is in root, and audio is in audio/ folder
    truenoSound = loadSound("audio/thunder.mp3"); // Use your existing thunder.mp3
}

function setup() {
    // Create canvas to cover the entire window
    // We'll set its position in CSS to be behind other content
    createCanvas(windowWidth, windowHeight);
    
    // Fill the array with rain drops
    for (let i = 0; i < cantidad; i++) {
        gotas.push(new Gota(random(width), random(height)));
    }
    
    // Set initial volumes
    truenoSound.setVolume(0.15); // Adjust based on desired impact
 
    
    // Setup rain ambient noise
    ruidoLluvia = new p5.Noise('pink');
    ruidoLluvia.start();
    ruidoLluvia.amp(volumenLluvia);

    // Set canvas position to absolute and z-index to -1 or similar
    // This makes sure it's behind your content.
    // We'll also add this to CSS for robustness.
    let p5Canvas = document.getElementById('defaultCanvas0'); // p5.js often names its canvas 'defaultCanvas0'
    if (p5Canvas) {
        p5Canvas.style.position = 'fixed';
        p5Canvas.style.top = '0';
        p5Canvas.style.left = '0';
        p5Canvas.style.zIndex = '-1'; // Ensure it's behind other content
    }
}

function draw() {
    clear(); // Semi-transparent black background to create a trail effect for rain,
                             // or just background(0) for clear drops.
                             // 50 is alpha value, range 0-255. Adjust for desired darkness/trail.

    
    // Occasional thunder and lightning
    // Reduced frequency to be less overwhelming on every page
    if (random(100) < 0.15) { // Adjusted probability for less frequent but impactful strikes
        tronar();
    }
    
    // Update and display each rain drop
    for (let g of gotas) {
        g.caer();
        g.mostrar();
    }
    
    // Adjust rain volume with Perlin Noise for dynamism
    volumenLluvia = map(noise(millis() * 0.00005), 0, 1, 0.01, volumenMaximoLluvia); // Slower noise variation
    ruidoLluvia.amp(volumenLluvia);
}

// Function to handle thunder and lightning
function tronar() {
    background(255); // Flash white screen for lightning
    truenoSound.rate(random(0.7, 1.5)); // Vary speed slightly
    truenoSound.play();

    // After a brief flash, return to semi-transparent black
    // This creates a quick flash effect. Adjust duration if needed.
    setTimeout(() => {
        clear(); // Return to normal drawing background
    }, 100); // Flash duration in milliseconds
}

// Resizing canvas if window size changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Re-initialize drops to adapt to new size, if needed,
    // or just let them loop naturally. For simplicity, we'll let them loop.
}

// Gota Class Definition
¡Entendido! Vamos a darle un toque más dinámico a esas gotas de lluvia, haciendo que roten ligeramente de manera aleatoria y que la mayoría se inclinen un poco hacia la izquierda, simulando el efecto del viento o la perspectiva.

Para esto, usaremos p5.js la función rotate() y translate(), que operan dentro del sistema de coordenadas de p5.js.

Modificación para Rotación y Dirección de Gotas en js/p5_rain_effect.js
Abre tu archivo js/p5_rain_effect.js y busca el método mostrar() dentro de la class Gota.

Aquí está el código modificado para la clase Gota:

JavaScript

// ... (resto del código sin cambios hasta la clase Gota) ...

class Gota {
    // Constructor (como un setup del objeto)
    constructor(posicionX, posicionY) {
        this.posX = posicionX;
        this.posY = posicionY;
        this.vel = random(4, 8);
        // Usa la opción de grises que preferiste:
        // Opción 1: Grises claros y suaves
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(100, 180));
        // Opción 2: Grises un poco más oscuros y atmosféricos
        // this.col = color(random(100, 150), random(100, 150), random(100, 150), random(80, 150));
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);
        
        // NUEVAS PROPIEDADES para la rotación
        this.anguloInicial = random(-0.2, 0.2); // Pequeña rotación base random
        this.inclinacion = random(-0.05, 0.01); // Mayormente hacia la izquierda (valores negativos)
                                                // Un pequeño rango positivo para variedad
    }
    
    mostrar() {
        strokeWeight(random(1, 2));
        stroke(this.col);

        // --- CAMBIOS CLAVE AQUÍ ---
        push(); // Guarda el estado actual de transformación del canvas
        
        // Mueve el origen de coordenadas al centro de la gota para rotar
        translate(this.posX, this.posY); 
        
        // Aplica la rotación. random(-0.05, 0.05) para un efecto de viento aleatorio
        // O: this.anguloInicial + this.inclinacion para una dirección más consistente
        rotate(this.anguloInicial + this.inclinacion); 
        
        // Dibuja la línea. Ahora se dibuja desde (0,0) relativo al translate.
        line(0, 0, 0, this.len); 
        
        pop(); // Restaura el estado de transformación anterior del canvas
        // --- FIN CAMBIOS CLAVE ---
    }
    
    caer() {
        this.vel += this.gravedad;
        this.posY += this.vel;
        
        // Mover la gota un poco a la izquierda mientras cae (simulando viento)
        // Puedes ajustar el 0.5 para más o menos desviación horizontal
        this.posX -= this.vel * random(0.01, 0.05); // Desviación proporcional a la velocidad

        if (this.posY > height) this.reiniciar();
    }
    
    reiniciar() {
        this.vel = random(4, 8);
        this.posY = random(-200, -50);
        this.posX = random(width);
        // Asegúrate de usar la misma opción de color aquí
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(100, 180)); // Grises suaves
        // this.col = color(random(100, 150), random(100, 150), random(100, 150), random(80, 150)); // Grises oscuros
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);

        // Reiniciar las propiedades de rotación también
        this.anguloInicial = random(-0.2, 0.2);
        this.inclinacion = random(-0.05, 0.01);
    }
}