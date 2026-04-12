// Configuration
const SYMBOLS = ['🚀', '🤖', '💾', '🧠', '⚡️', '💎'];
const SPIN_COST = 1000;
const INITIAL_BUDGET = 10000;
const REWARD_MULTIPLIER = {
    '🚀': 50000, // AGI
    '💎': 20000, // GPU Cluster
    '🧠': 10000, // Neural Net
    '⚡️': 5000,  // High Bandwidth
    '🤖': 2000,  // LLM Instance
    '💾': 1000   // Dataset
};

const HUMOR_MESSAGES = {
    start: [
        "Calibrating neural weights...",
        "Scraping the internet for inspiration...",
        "Synthesizing tokens from thin air...",
        "Optimizing loss function...",
        "Prompting the latent space..."
    ],
    win: [
        "AGI confirmed! Re-allocating world resources.",
        "Emergent behavior detected: Profit.",
        "Validation loss: 0.000000. Perfect inference.",
        "Your prompt was highly effective.",
        "Scaling laws are working in your favor."
    ],
    loss: [
        "Hallucination detected. Balance decreased.",
        "Safety alignment prevented a win.",
        "Context window exceeded. Please upgrade.",
        "Rate limited by reality. Try again.",
        "Your compute was used to train a cat-recognizer.",
        "Stochastic parrot says: No rewards for you.",
        "Overfitting detected. Generalization failed."
    ]
};

// State
let balance = INITIAL_BUDGET;
let isSpinning = false;
let isAutoMode = false;

// Elements
const balanceEl = document.getElementById('token-balance');
const spinBtn = document.getElementById('spin-btn');
const autoBtn = document.getElementById('auto-btn');
const resetBtn = document.getElementById('reset-btn');
const messageLog = document.getElementById('message-log');
const reels = [
    document.querySelector('#reel1 .reel-strip'),
    document.querySelector('#reel2 .reel-strip'),
    document.querySelector('#reel3 .reel-strip')
];

// Initialization
function init() {
    reels.forEach(reel => {
        reel.innerHTML = `<div class="symbol">${getRandomSymbol()}</div>`;
    });
    updateUI();
}

function getRandomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function addLog(text, type = 'system') {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = `> ${text}`;
    messageLog.prepend(msg);
    if (messageLog.children.length > 50) messageLog.lastChild.remove();
}

function updateUI() {
    balanceEl.textContent = balance.toLocaleString();
    spinBtn.disabled = isSpinning || balance < SPIN_COST;
    
    if (balance < SPIN_COST && !isSpinning) {
        resetBtn.classList.remove('hidden');
        addLog("Compute budget exhausted. Pitching to VCs...", "loss");
    } else {
        resetBtn.classList.add('hidden');
    }

    if (isAutoMode) {
        autoBtn.classList.add('active');
        autoBtn.textContent = "Stop Autonomous Agent";
    } else {
        autoBtn.classList.remove('active');
        autoBtn.textContent = "Autonomous Agent Mode";
    }
}

async function spin() {
    if (isSpinning || balance < SPIN_COST) return;

    isSpinning = true;
    balance -= SPIN_COST;
    updateUI();

    addLog(HUMOR_MESSAGES.start[Math.floor(Math.random() * HUMOR_MESSAGES.start.length)]);

    const results = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    
    // Add multiple symbols to reel strips for a better spin effect
    reels.forEach((reel, i) => {
        let stripContent = '';
        for (let j = 0; j < 10; j++) {
            stripContent += `<div class="symbol">${getRandomSymbol()}</div>`;
        }
        reel.innerHTML = stripContent;
        reel.parentElement.classList.add('spinning');
    });

    // Simulate network latency (inference time)
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    reels.forEach((reel, i) => {
        reel.parentElement.classList.remove('spinning');
        reel.innerHTML = `<div class="symbol">${results[i]}</div>`;
    });

    checkResult(results);
    isSpinning = false;
    updateUI();

    if (isAutoMode && balance >= SPIN_COST) {
        setTimeout(spin, 1000);
    } else if (isAutoMode) {
        isAutoMode = false;
        updateUI();
    }
}

function checkResult(results) {
    if (results[0] === results[1] && results[1] === results[2]) {
        const symbol = results[0];
        const reward = REWARD_MULTIPLIER[symbol];
        balance += reward;
        addLog(`WINNER! ${reward.toLocaleString()} tokens granted by the algorithm.`, "win");
        addLog(HUMOR_MESSAGES.win[Math.floor(Math.random() * HUMOR_MESSAGES.win.length)], "win");
        // Visual flair
        document.querySelector('.reels-container').style.borderColor = 'var(--accent-green)';
        setTimeout(() => {
            document.querySelector('.reels-container').style.borderColor = '#30363d';
        }, 2000);
    } else {
        addLog(HUMOR_MESSAGES.loss[Math.floor(Math.random() * HUMOR_MESSAGES.loss.length)], "loss");
    }
}

// Event Listeners
spinBtn.addEventListener('click', spin);

autoBtn.addEventListener('click', () => {
    isAutoMode = !isAutoMode;
    updateUI();
    if (isAutoMode && !isSpinning) spin();
});

resetBtn.addEventListener('click', () => {
    balance = INITIAL_BUDGET;
    addLog("Series A funding secured. Burning cash again.", "system");
    updateUI();
});

init();
