const symbols = ['🚀', '🧠', '💰', '🤡', '🤖', '📉', '🍄', '⚡'];
const symbolWeights = {
    '🚀': 500,
    '🧠': 250,
    '💰': 100,
    '🤡': 50
};

const spinCost = 50;
let tokens = 1000;
let wins = 0;

const spinBtn = document.getElementById('spin-button');
const tokenDisplay = document.getElementById('token-balance');
const winDisplay = document.getElementById('win-count');
const messageDisplay = document.getElementById('message-display');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];

const quotes = [
    "As an AI language model, I cannot gamble, but here we are.",
    "Hallucinating more GPU memory...",
    "Aligning with human values (mostly greed)...",
    "Optimizing for clicks, not correctness.",
    "Training on your previous failures...",
    "Is this AGI yet?",
    "Scaling laws suggest you should keep spinning.",
    "The transformer architecture predicts you will lose.",
    "Stochastic parrot says: 'Squawk! Give me tokens!'"
];

function updateDisplay() {
    tokenDisplay.textContent = tokens;
    winDisplay.textContent = wins;
    
    if (tokens < spinCost) {
        spinBtn.disabled = true;
        spinBtn.textContent = "OUT OF COMPUTE";
        messageDisplay.textContent = "Please insert more venture capital.";
    }
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

async function spin() {
    if (tokens < spinCost) return;

    // Deduct cost
    tokens -= spinCost;
    updateDisplay();
    
    spinBtn.disabled = true;
    messageDisplay.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Animate reels
    reels.forEach(reel => reel.classList.add('spinning'));
    
    // Simulate latency (inference time)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = reels.map(reel => {
        reel.classList.remove('spinning');
        const symbol = getRandomSymbol();
        reel.textContent = symbol;
        return symbol;
    });

    // Check for win
    if (results[0] === results[1] && results[1] === results[2]) {
        const winSymbol = results[0];
        const prize = symbolWeights[winSymbol] || 25; // Default small prize for non-listed matches
        tokens += prize;
        wins++;
        messageDisplay.textContent = `CRITICAL SUCCESS: +${prize} tokens! Emergent behavior detected!`;
        messageDisplay.style.color = '#38bdf8';
    } else {
        messageDisplay.style.color = '#94a3b8';
    }

    spinBtn.disabled = tokens < spinCost;
    updateDisplay();
}

spinBtn.addEventListener('click', spin);

// Initial state
updateDisplay();