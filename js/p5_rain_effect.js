// --- p5.js RAIN AND THUNDER EFFECT ---

let gotas = [];
let cantidad = 800;
let truenoSound;
let chanSound;

let ruidoLluvia;
let volumenMaximoLluvia = 0.2;
let volumenLluvia = 0.05;

// NEW: Flag to check if audio has started
let audioStarted = false;

function preload() {
    truenoSound = loadSound("audio/thunder.mp3");
    chanSound = loadSound("audio/chan.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < cantidad; i++) {
        gotas.push(new Gota(random(width), random(height)));
    }

    // NEW: Add a general event listener for any user interaction
    // We'll use mousePressed, but any interactive event works (e.g., keyPressed, touchStarted)
    // This will trigger a function to start the audio context.
    userStartAudio().then(() => {
        // This promise resolves once the audio context is resumed by a user gesture.
        // It's a good place to put initial ambient sounds if you want them to start
        // immediately after the user's first interaction.
        // However, we'll keep the `audioStarted` flag for broader control.
    });


    // Set canvas position to absolute and z-index to -1 or similar
    let p5Canvas = document.getElementById('defaultCanvas0');
    if (p5Canvas) {
        p5Canvas.style.position = 'fixed';
        p5Canvas.style.top = '0';
        p5Canvas.style.left = '0';
        p5Canvas.style.zIndex = '-1';
        // NEW: Add event listeners directly to the canvas for interaction
        p5Canvas.addEventListener('click', startAudioOnce);
        p5Canvas.addEventListener('touchstart', startAudioOnce);
        p5Canvas.addEventListener('keydown', startAudioOnce); // For keyboard interaction
    }

    // Audio setup moved into startAudioOnce function
}

// NEW: Function to start audio only once on user interaction
function startAudioOnce() {
    if (!audioStarted) {
        // It's good practice to resume AudioContext on interaction
        // p5.js's userStartAudio() does this implicitly, but ensuring it won't hurt.
        getAudioContext().resume(); 
        
        // Setup rain ambient noise
        ruidoLluvia = new p5.Noise('pink');
        ruidoLluvia.start();
        ruidoLluvia.amp(volumenLluvia);

        truenoSound.setVolume(0.15);
        chanSound.setVolume(0.5);

        // Play chan sound immediately upon first interaction
        chanSound.play();

        audioStarted = true;

        // Remove event listeners after audio has started to prevent multiple calls
        let p5Canvas = document.getElementById('defaultCanvas0');
        if (p5Canvas) {
            p5Canvas.removeEventListener('click', startAudioOnce);
            p5Canvas.removeEventListener('touchstart', startAudioOnce);
            p5Canvas.removeEventListener('keydown', startAudioOnce);
        }
    }
}


function draw() {
    clear(); // Makes the canvas background transparent

    // Only play thunder and adjust rain volume if audio has started
    if (audioStarted) {
        // Occasional thunder and lightning
        if (random(100) < 0.15) {
            tronar();
        }

        // Adjust rain volume with Perlin Noise for dynamism
        volumenLluvia = map(noise(millis() * 0.00005), 0, 1, 0.01, volumenMaximoLluvia);
        ruidoLluvia.amp(volumenLluvia);
    }
    
    // Update and display each rain drop (visuals are independent of audio)
    for (let g of gotas) {
        g.caer();
        g.mostrar();
    }
}

function tronar() {
    background(255);
    truenoSound.rate(random(0.7, 1.5));
    // Only play thunder if audio has started
    if (audioStarted) {
        truenoSound.play();
    }

    setTimeout(() => {
        clear();
    }, 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Gota Class Definition (no changes here, keeping your last updates)
class Gota {
    constructor(posicionX, posicionY) {
        this.posX = posicionX;
        this.posY = posicionY;
        this.vel = random(4, 8);
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(100, 180));
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
        this.col = color(random(180, 220), random(180, 220), random(180, 220), random(100, 180));
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);
        this.anguloInicial = random(-0.2, 0.2);
        this.inclinacion = random(-0.05, 0.01);
    }
}