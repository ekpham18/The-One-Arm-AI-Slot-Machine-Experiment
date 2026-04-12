// Symbols and their rarity/value
const SYMBOLS = [
    { char: '🤖', value: 5, weight: 40 },  // LLM - Common
    { char: '🧠', value: 10, weight: 25 }, // Neural Net - Uncommon
    { char: '🖼️', value: 20, weight: 15 }, // AI Art - Uncommon
    { char: '📉', value: -50, weight: 10 },// Stock Crash - Rare/Bad
    { char: '🦄', value: 100, weight: 5 },  // Unicorn Startup - Jackpot
    { char: '🍕', value: 2, weight: 30 }    // Developer Fuel - Common
];

// Satirical AI jargon messages
const STATUS_MESSAGES = [
    "Optimizing weights...",
    "Hallucinating a win...",
    "Overfitting to your wallet...",
    "Fine-tuning foundation model...",
    "Reducing loss function...",
    "Scraping public data...",
    "Training on user input...",
    "Emergent behavior detected...",
    "Scaling parameters...",
    "Prompt engineering success...",
    "Awaiting human feedback...",
    "Compressing reality...",
    "Calculating GPU temperature...",
    "Burning venture capital..."
];

// App State
let credits = 1000;
let isSpinning = false;
let autoGPT = false;

// DOM Elements
const creditsEl = document.getElementById('credits');
const statusEl = document.getElementById('status');
const spinBtn = document.getElementById('spin-btn');
const maxBtn = document.getElementById('max-btn');
const autoBtn = document.getElementById('auto-btn');
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

// Utility: Weighted random selection
function getRandomSymbol() {
    const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    for (const s of SYMBOLS) {
        if (random < s.weight) return s;
        random -= s.weight;
    }
    return SYMBOLS[0];
}

function updateCredits(amount) {
    credits += amount;
    creditsEl.textContent = credits;
    if (credits <= 0) {
        credits = 100; // Bailout
        updateStatus("Series A Funding Secured! (Credits Reset)");
    }
}

function updateStatus(msg) {
    statusEl.textContent = msg;
}

async function spin() {
    if (isSpinning || credits < 10) return;

    isSpinning = true;
    updateCredits(-10);
    spinBtn.disabled = true;
    maxBtn.disabled = true;
    
    updateStatus(STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)]);

    // Start spin animation
    reels.forEach(reel => reel.classList.add('spinning'));

    const finalSymbols = [];
    
    // Stop reels one by one with delay
    for (let i = 0; i < reels.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500 + i * 400));
        const symbol = getRandomSymbol();
        finalSymbols.push(symbol);
        reels[i].classList.remove('spinning');
        reels[i].innerHTML = `<div class="symbol">${symbol.char}</div>`;
    }

    checkWin(finalSymbols);
    
    isSpinning = false;
    spinBtn.disabled = false;
    maxBtn.disabled = false;

    if (autoGPT && credits >= 10) {
        setTimeout(spin, 1000);
    }
}

function checkWin(results) {
    const s1 = results[0].char;
    const s2 = results[1].char;
    const s3 = results[2].char;

    if (s1 === s2 && s2 === s3) {
        const winAmount = results[0].value * 10;
        updateCredits(winAmount);
        updateStatus(`HYPER-SCALED SUCCESS! +${winAmount} Tokens`);
        reels.forEach(r => r.classList.add('win'));
        setTimeout(() => reels.forEach(r => r.classList.remove('win')), 2000);
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        const winAmount = 15;
        updateCredits(winAmount);
        updateStatus(`Slight Correlation Detected. +${winAmount} Tokens`);
    } else if (results.some(s => s.char === '📉')) {
        updateStatus("Model Collapse! Venture Capital Revoked.");
    } else {
        updateStatus("Inference Failed. Try a better prompt.");
    }
}

// Event Listeners
spinBtn.addEventListener('click', spin);

maxBtn.addEventListener('click', () => {
    if (credits >= 100) {
        // Max bet logic (simplified for this prototype)
        updateStatus("Injecting 100B Parameters...");
        spin(); 
    }
});

autoBtn.addEventListener('click', () => {
    autoGPT = !autoGPT;
    autoBtn.textContent = autoGPT ? "STOP AUTO-GPT" : "AUTO-GPT (AUTO-SPIN)";
    autoBtn.classList.toggle('danger');
    if (autoGPT && !isSpinning) spin();
});

// Initial Status
updateStatus("Awaiting Venture Capital...");
