const symbols = ['🤖', '🧠', '⚡️', '💸', '☁️', '💩'];
const symbolWeights = {
    '🤖': 10,
    '🧠': 6,
    '⚡️': 4,
    '💸': 2,
    '☁️': 8,
    '💩': 5
};

const winMultipliers = {
    '🤖': 2,
    '🧠': 5,
    '⚡️': 10,
    '💸': 50,
    '☁️': 1,
    '💩': -2 // Penalty for hallucination
};

const statusMessages = [
    "Aligning with user preferences...",
    "Injecting synthetic data...",
    "Optimizing loss function...",
    "Compressing weights...",
    "Querying the vector DB...",
    "Refining prompt parameters...",
    "Scaling parameters to 175B...",
    "Ignoring safety guardrails..."
];

const winMessages = [
    "SOTA Achievement! New benchmarks reached.",
    "Emergent behavior detected! Take your tokens.",
    "User feedback positive. Reward function maximized.",
    "Zero-shot success! You're a prompt engineer.",
    "Chain-of-thought complete. Here is the payout."
];

const lossMessages = [
    "Model hallucinated. Tokens lost in latent space.",
    "Safety filter triggered. Payout censored.",
    "Context window exceeded. Memory wiped.",
    "Out of memory error. Please upgrade your GPU.",
    "Training data contaminated. Result: Garbage."
];

let balance = 1000;
const costPerSpin = 50;

const tokenBalanceDisplay = document.getElementById('token-balance');
const spinBtn = document.getElementById('spin-btn');
const statusMessageDisplay = document.getElementById('status-message');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];

function getRandomSymbol() {
    const totalWeight = Object.values(symbolWeights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    for (const symbol of symbols) {
        if (random < symbolWeights[symbol]) return symbol;
        random -= symbolWeights[symbol];
    }
    return symbols[0];
}

async function spin() {
    if (balance < costPerSpin) {
        statusMessageDisplay.textContent = "Insufficient Tokens. Please watch an ad to train me.";
        return;
    }

    // Deduct cost
    balance -= costPerSpin;
    updateDisplay();
    
    spinBtn.disabled = true;
    statusMessageDisplay.textContent = statusMessages[Math.floor(Math.random() * statusMessages.length)];
    statusMessageDisplay.classList.remove('win', 'loss');

    // Start spinning animation
    reels.forEach(reel => {
        reel.querySelector('.reel-inner').classList.add('spinning');
    });

    // Simulate "Generation" time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const results = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    // Stop animation and show results
    reels.forEach((reel, i) => {
        const inner = reel.querySelector('.reel-inner');
        inner.classList.remove('spinning');
        inner.textContent = results[i];
    });

    evaluateResult(results);
    spinBtn.disabled = false;
}

function evaluateResult(results) {
    const [s1, s2, s3] = results;
    let winAmount = 0;

    if (s1 === s2 && s2 === s3) {
        // Triple match
        const symbol = s1;
        const multiplier = winMultipliers[symbol];
        
        if (multiplier > 0) {
            winAmount = costPerSpin * multiplier;
            statusMessageDisplay.textContent = winMessages[Math.floor(Math.random() * winMessages.length)];
            statusMessageDisplay.classList.add('win');
        } else {
            winAmount = costPerSpin * multiplier; // This will be negative for 💩
            statusMessageDisplay.textContent = "TRIPLE HALLUCINATION! Token burn initiated.";
            statusMessageDisplay.classList.add('loss');
        }
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        // Double match
        const match = (s1 === s2) ? s1 : s3;
        winAmount = Math.floor(costPerSpin * (winMultipliers[match] / 2));
        
        if (winAmount > 0) {
            statusMessageDisplay.textContent = "Partial alignment found. Small reward granted.";
        } else if (winAmount < 0) {
            statusMessageDisplay.textContent = "Minor hallucination detected. Token leak.";
        } else {
            statusMessageDisplay.textContent = "No significant patterns found in noise.";
        }
    } else {
        // No match
        statusMessageDisplay.textContent = lossMessages[Math.floor(Math.random() * lossMessages.length)];
        statusMessageDisplay.classList.add('loss');
    }

    balance += winAmount;
    updateDisplay();
}

function updateDisplay() {
    tokenBalanceDisplay.textContent = balance;
    if (balance <= 0) {
        statusMessageDisplay.textContent = "AI Safety Violation: Bankrupt. Token count at zero.";
        spinBtn.disabled = true;
    }
}

spinBtn.addEventListener('click', spin);

// Initialization
updateDisplay();
console.log("AI Slot Machine initialized. Prepare for inference.");
