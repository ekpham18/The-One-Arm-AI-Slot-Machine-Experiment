const SYMBOLS = ['🧠', '💎', '🤖', '⚡', '📉', '💸', '🛠️', '🧬'];
const PAYOUTS = {
    '🧠': 500,
    '💎': 200,
    '🤖': 100,
    '⚡': 50,
    '💸': 25,
    '📉': -20 // Algorithmic Bias
};

let tokens = 100;
let isSpinning = false;

const tokenDisplay = document.getElementById('token-count');
const spinButton = document.getElementById('spin-button');
const resetButton = document.getElementById('reset-button');
const statusLog = document.getElementById('status-log');
const reels = [
    document.getElementById('reel-1').querySelector('.symbol-container'),
    document.getElementById('reel-2').querySelector('.symbol-container'),
    document.getElementById('reel-3').querySelector('.symbol-container')
];

function addLog(message) {
    const p = document.createElement('p');
    p.textContent = `> ${message}`;
    statusLog.appendChild(p);
    statusLog.scrollTop = statusLog.scrollHeight;
}

function updateTokens(amount) {
    tokens += amount;
    tokenDisplay.textContent = tokens;
    
    if (tokens < 10) {
        tokenDisplay.classList.add('low-tokens');
    } else {
        tokenDisplay.classList.remove('low-tokens');
    }
}

function getRandomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

async function spin() {
    if (isSpinning || tokens < 10) return;

    isSpinning = true;
    spinButton.disabled = true;
    updateTokens(-10);
    addLog('Training model on cluster alpha-9...');

    // Start spinning animation
    reels.forEach(reel => reel.classList.add('spinning'));

    const spinDurations = [1500, 2000, 2500];
    const results = [];

    const spinPromises = reels.map((reel, index) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const symbol = getRandomSymbol();
                results[index] = symbol;
                reel.classList.remove('spinning');
                reel.textContent = symbol;
                resolve();
            }, spinDurations[index]);
        });
    });

    await Promise.all(spinPromises);
    
    checkResult(results);
    isSpinning = false;
    spinButton.disabled = tokens < 10;
}

function checkResult(results) {
    const [s1, s2, s3] = results;
    
    // Check for jackpot (3 of a kind)
    if (s1 === s2 && s2 === s3) {
        const reward = PAYOUTS[s1] || 10;
        if (reward > 0) {
            addLog(`MODEL CONVERGENCE ACHIEVED: 3x ${s1}! Synthesized ${reward} tokens.`);
            updateTokens(reward);
        } else {
            addLog(`CRITICAL ERROR: Triple Bias Detected (${s1}). Dataset poisoned!`);
            updateTokens(reward * 2); // Double penalty for 3x bias
        }
        return;
    }

    // Check for individual "Bias" symbols
    const biasCount = results.filter(s => s === '📉').length;
    if (biasCount > 0) {
        const penalty = biasCount * PAYOUTS['📉'];
        addLog(`Hallucination detected! Algorithmic bias encountered. Lost ${Math.abs(penalty)} tokens.`);
        updateTokens(penalty);
    } else {
        addLog('Inference complete. Output is mediocre. No tokens synthesized.');
    }
}

function reset() {
    tokens = 100;
    updateTokens(0);
    addLog('System rebooted. Model weights re-initialized.');
    spinButton.disabled = false;
    reels.forEach((reel, i) => {
        const initialSymbols = ['🧠', '🤖', '💎'];
        reel.textContent = initialSymbols[i];
    });
}

spinButton.addEventListener('click', spin);
resetButton.addEventListener('click', reset);
