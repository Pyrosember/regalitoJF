// --- p5.js RAIN AND THUNDER EFFECT ---

// ... (código para resumir el contexto de audio sin cambios) ...

let gotas = [];
let cantidad = 800;
let truenoSound;
// ELIMINAR ESTA LÍNEA (o comentar):
// let chanSound; 

let ruidoLluvia;
let volumenMaximoLluvia = 0.2;
let volumenLluvia = 0.05;

function preload() {
    truenoSound = loadSound("audio/thunder.mp3");
    // ELIMINAR ESTA LÍNEA (o comentar):
    // chanSound = loadSound("audio/chan.mp3"); 
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    for (let i = 0; i < cantidad; i++) {
        gotas.push(new Gota(random(width), random(height)));
    }
    
    truenoSound.setVolume(0.15);
    // ELIMINAR ESTA LÍNEA (o comentar):
    // chanSound.setVolume(0.5); 
    
    ruidoLluvia = new p5.Noise('pink');
    ruidoLluvia.start();
    ruidoLluvia.amp(volumenLluvia);

    let p5Canvas = document.getElementById('defaultCanvas0');
    if (p5Canvas) {
        p5Canvas.style.position = 'fixed';
        p5Canvas.style.top = '0';
        p5Canvas.style.left = '0';
        p5Canvas.style.zIndex = '-1';
    }
}

function draw() {
    clear();

    // ELIMINAR ESTE BLOQUE (o comentar):
    // if (frameCount === 60) {
    //     chanSound.play();
    // }
    
    if (random(100) < 0.15) {
        tronar();
    }
    
    for (let g of gotas) {
        g.caer();
        g.mostrar();
    }
    
    volumenLluvia = map(noise(millis() * 0.00005), 0, 1, 0.01, volumenMaximoLluvia);
    ruidoLluvia.amp(volumenLluvia);
}

// ... (resto del código sin cambios, incluyendo la función tronar, windowResized y la clase Gota) ...