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
class Gota {
    constructor(posicionX, posicionY) {
        this.posX = posicionX;
        this.posY = posicionY;
        this.vel = random(4, 8); // Slightly faster initial velocity
        this.col = color(random(150, 200), random(150, 200), random(200, 255), random(100, 200)); // Bluish-white, semi-transparent rain color
        this.gravedad = random(0.1, 0.2); // Slight variation in gravity for more natural fall
        this.len = random(10, 20); // Length of the rain drop (stroke)
    }
    
    mostrar() {
        strokeWeight(random(1, 2)); // Thinner or thicker drops
        stroke(this.col);
        line(this.posX, this.posY, this.posX, this.posY + this.len); // Draw as a line for better rain effect
    }
    
    caer() {
        this.vel += this.gravedad;
        this.posY += this.vel;
        
        if (this.posY > height) this.reiniciar();
    }
    
    reiniciar() {
        this.vel = random(4, 8);
        this.posY = random(-200, -50); // Start drops slightly above screen to appear smoothly
        this.posX = random(width);
        this.col = color(random(150, 200), random(150, 200), random(200, 255), random(100, 200));
        this.gravedad = random(0.1, 0.2);
        this.len = random(10, 20);
    }
}