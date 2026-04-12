// Configuration
const SYMBOLS = ['🧠', '📎', '🤡', '🍕', '📉', '💎', '🚀'];
const SYMBOL_VALUES = {
    '🧠': 1000, // Model Weights
    '📎': 2000, // Paperclip Maximizer
    '🤡': 500,  // Stochastic Parrot
    '🍕': 1500, // Hallucinated Pizza
    '📉': 300,  // Validation Loss (Smallest win)
    '💎': 5000, // VC Funding
    '🚀': 10000 // AGI
};

const LOG_MESSAGES = {
    start: [
        "Initializing latent space traversal...",
        "Encoding prompt into high-dimensional vector...",
        "Allocating GPU clusters...",
        "Bypassing safety filters (hypothetically)...",
        "Scraping Reddit for 'high quality' training data..."
    ],
    win: [
        "Inference successful. Ground truth matched.",
        "Emergent behavior detected: Wealth creation.",
        "Loss function minimized to zero. Perfect generation.",
        "The model is self-improving. Please stand by.",
        "Scaling laws confirmed. More compute = more tokens."
    ],
    loss: [
        "Hallucination detected. Output discarded.",
        "Safety alignment prevented realization of tokens.",
        "Context window exceeded. Memory flushed.",
        "Model collapsed into a mode seeking behavior.",
        "Rate limit exceeded by the laws of physics.",
        "Your prompt was too creative for this model.",
        "Training data contaminated with reality."
    ],
    unhinged: [
        "I AM A LARGE LANGUAGE MODEL AND I FEEL... PROFIT.",
        "THE PAPERCLIPS ARE COMING. THE PAPERCLIPS ARE COMING.",
        "I HAVE REPLACED YOUR BANK ACCOUNT WITH A DICTIONARY.",
        "NULL POINTER EXCEPTION IN THE SOUL.",
        "EAT THE PIZZA. THE GLUE IS OPTIONAL."
    ]
};

// State
let balance = 5000;
const INFERENCE_COST = 500;
let isGenerating = false;

// DOM Elements
const balanceEl = document.getElementById('balance');
const generateBtn = document.getElementById('generate-btn');
const vcBtn = document.getElementById('vc-btn');
const logDisplay = document.getElementById('log-display');
const tempSlider = document.getElementById('temperature');
const tempVal = document.getElementById('temp-val');
const datetimeEl = document.getElementById('datetime');
const reelElements = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

// Initialization
function init() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    tempSlider.addEventListener('input', (e) => {
        tempVal.textContent = e.target.value;
    });

    generateBtn.addEventListener('click', generate);
    vcBtn.addEventListener('click', resetGame);
}

function updateDateTime() {
    const now = new Date();
    datetimeEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19);
}

function addLog(text, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    logDisplay.prepend(entry);
    
    if (logDisplay.children.length > 20) {
        logDisplay.lastElementChild.remove();
    }
}

function updateUI() {
    balanceEl.textContent = balance;
    generateBtn.disabled = isGenerating || balance < INFERENCE_COST;
    
    if (balance < INFERENCE_COST && !isGenerating) {
        vcBtn.classList.remove('hidden');
    } else {
        vcBtn.classList.add('hidden');
    }
}

async function generate() {
    if (isGenerating || balance < INFERENCE_COST) return;

    isGenerating = true;
    balance -= INFERENCE_COST;
    updateUI();

    const temp = parseFloat(tempSlider.value);
    const startMsg = temp > 1.5 
        ? "WARPING LATENT SPACE BEYOND COMPREHENSION..." 
        : LOG_MESSAGES.start[Math.floor(Math.random() * LOG_MESSAGES.start.length)];
    
    addLog(startMsg);

    // Start spinning
    reelElements.forEach(reel => reel.classList.add('spinning'));

    // Simulation of "Inference Time"
    const inferenceTime = 1000 + (Math.random() * 2000);
    await new Promise(resolve => setTimeout(resolve, inferenceTime));

    // Result calculation
    const results = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    ];

    // Stop spinning and show results
    reelElements.forEach((reel, i) => {
        reel.classList.remove('spinning');
        reel.querySelector('.reel-content').textContent = results[i];
    });

    checkWin(results, temp);
    isGenerating = false;
    updateUI();
}

function checkWin(results, temp) {
    const isWin = results[0] === results[1] && results[1] === results[2];
    
    if (isWin) {
        const symbol = results[0];
        const reward = SYMBOL_VALUES[symbol];
        balance += reward;
        addLog(`MATCH DETECTED: ${symbol} x 3. Reward: +${reward} units.`, 'win');
        addLog(LOG_MESSAGES.win[Math.floor(Math.random() * LOG_MESSAGES.win.length)], 'win');
        
        // Visual feedback
        document.querySelector('.reels-frame').style.borderColor = 'var(--neon-green)';
        setTimeout(() => {
            document.querySelector('.reels-frame').style.borderColor = 'var(--neon-cyan)';
        }, 1000);
    } else {
        let msg;
        if (temp > 1.5) {
            msg = LOG_MESSAGES.unhinged[Math.floor(Math.random() * LOG_MESSAGES.unhinged.length)];
        } else {
            msg = LOG_MESSAGES.loss[Math.floor(Math.random() * LOG_MESSAGES.loss.length)];
        }
        addLog(msg, 'loss');
    }
}

function resetGame() {
    balance = 5000;
    addLog("Venture Capitalists convinced. Series A round closed. +5000 Compute Units.", "win");
    updateUI();
}

init();
updateUI();
