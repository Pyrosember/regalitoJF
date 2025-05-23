// --- p5.js RAIN AND THUNDER EFFECT ---

// Fix for browser autoplay policy:
// Resume audio context on first user interaction.
function resumeAudioContext() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(() => {
            console.log('Audio Context resumed successfully!');
            document.removeEventListener('click', resumeAudioContext);
            document.removeEventListener('touchend', resumeAudioContext);
        }).catch(e => console.error('Error resuming audio context:', e));
    } else {
        document.removeEventListener('click', resumeAudioContext);
        document.removeEventListener('touchend', resumeAudioContext);
    }
}

document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('touchend', resumeAudioContext, { once: true });


let gotas = [];
let cantidad = 800;
let truenoSound;
// NEW: Variable for the actual rain sound
let rainAmbientSound;

// Adjust max volume for the real rain sound
let volumenMaximoLluvia = 0.2; // You might need to fine-tune this volume
let volumenLluvia = 0.05; // Starting volume, keep it subtle

function preload() {
    truenoSound = loadSound("audio/thunder.mp3");
    // NEW: Load the real rain sound
    rainAmbientSound = loadSound("audio/rain.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    for (let i = 0; i < cantidad; i++) {
        gotas.push(new Gota(random(width), random(height)));
    }
    
    truenoSound.setVolume(0.15);
    
    // REPLACE PINK NOISE WITH ACTUAL RAIN SOUND
    // Start the rain sound and loop it
    rainAmbientSound.setVolume(volumenLluvia);
    rainAmbientSound.loop(); // Loop the sound so it plays continuously

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
    
    if (random(100) < 0.15) {
        tronar();
    }
    
    for (let g of gotas) {
        g.caer();
        g.mostrar();
    }
    
    // Still use Perlin Noise to vary the volume of the real rain sound
    volumenLluvia = map(noise(millis() * 0.00005), 0, 1, 0.01, volumenMaximoLluvia);
    rainAmbientSound.amp(volumenLluvia); // Control the volume of the loaded rain sound
}

function tronar() {
    background(255);
    // Briefly lower rain volume during thunder for effect
    rainAmbientSound.amp(volumenLluvia * 0.2); 
    truenoSound.rate(random(0.7, 1.5));
    truenoSound.play();

    setTimeout(() => {
        clear();
        // Restore rain volume after thunder
        rainAmbientSound.amp(volumenLluvia); 
    }, 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Gota {
    constructor(posicionX, posicionY) {
        this.posX = posicionX;
        this.posY = posicionY;
        this.vel = random(4, 8);
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(40, 100)); 
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);
        
        this.anguloInicial = random(-0.2, 0.2);
        this.inclinacion = random(-0.05, 0.01);
    }
    
    mostrar() {
        strokeWeight(random(1, 2));
        stroke(this.col);

        push(); 
        
        translate(this.posX, this.posY); 
        rotate(this.anguloInicial + this.inclinacion); 
        
        line(0, 0, 0, this.len); 
        
        pop();
    }
    
    caer() {
        this.vel += this.gravedad;
        this.posY += this.vel;
        
        this.posX -= this.vel * random(0.01, 0.05);

        if (this.posY > height) this.reiniciar();
    }
    
    reiniciar() {
        this.vel = random(4, 8);
        this.posY = random(-200, -50); 
        this.posX = random(width);
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(40, 100)); 
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);

        this.anguloInicial = random(-0.2, 0.2);
        this.inclinacion = random(-0.05, 0.01);
    }
}