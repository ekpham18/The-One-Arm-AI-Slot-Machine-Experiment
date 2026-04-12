const symbols = ['🤖', '💸', '😵', '🔋', '🧠'];
const winMessages = [
    "Hallucinated a profit!",
    "Model weights successfully biased.",
    "Convergence achieved! (Statistically unlikely)",
    "Deep learning pays off... this time.",
    "O(1) win complexity detected."
];
const lossMessages = [
    "Optimized for failure.",
    "Backpropagating your losses.",
    "Infinite loop of disappointment.",
    "Training data suggests you will never win.",
    "Parameters misaligned. Try burning more tokens."
];

let credits = 100;
let tokens = 0;

const creditsEl = document.getElementById('credits');
const tokensEl = document.getElementById('tokens');
const reelEls = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const spinBtn = document.getElementById('spin-btn');
const statusMsgEl = document.getElementById('status-msg');

function updateUI() {
    creditsEl.textContent = credits;
    tokensEl.textContent = tokens;
    spinBtn.disabled = credits < 10;
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

async function spin() {
    if (credits < 10) return;

    // Deduct cost
    credits -= 10;
    updateUI();

    // Start animation
    statusMsgEl.textContent = "COMPUTING INFRASTRUCTURE BURNING...";
    spinBtn.disabled = true;
    reelEls.forEach(reel => reel.classList.add('spinning'));

    // Wait for "compute" (simulated delay)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Stop animation and set results
    const results = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    reelEls.forEach((reel, index) => {
        reel.classList.remove('spinning');
        reel.textContent = results[index];
    });

    // Calculate win
    if (results[0] === results[1] && results[1] === results[2]) {
        const winAmount = 50;
        tokens += winAmount;
        statusMsgEl.textContent = `WIN: ${getRandomMessage(winMessages)} (+${winAmount} Tokens)`;
        statusMsgEl.style.color = "var(--neon-green)";
    } else {
        statusMsgEl.textContent = `LOSS: ${getRandomMessage(lossMessages)}`;
        statusMsgEl.style.color = "#888";
    }

    updateUI();
}

spinBtn.addEventListener('click', spin);

// Initial UI state
updateUI();
