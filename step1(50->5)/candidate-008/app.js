const symbols = ['🤖', '🧠', '☁️', '⚡', '📊', '🌐', '🚀'];
const spinCost = 50;
let tokens = 1000;

const reel1 = document.getElementById('reel-1');
const reel2 = document.getElementById('reel-2');
const reel3 = document.getElementById('reel-3');
const spinBtn = document.getElementById('spin-button');
const tokenDisplay = document.getElementById('token-count');
const statusMessage = document.getElementById('status-message');
const logs = document.getElementById('logs');

const winMessages = [
    "Jackpot! The AI produced a slightly less blurry cat image.",
    "BINGO! You've successfully overfit the model.",
    "Win! You discovered a new way to waste GPU hours.",
    "Success! The chatbot agreed with itself."
];

const lossMessages = [
    "Hallucination failed. Reality is too boring.",
    "Loss. The model decided to be 'helpful and harmless' and did nothing.",
    "Error 404: Logic not found in training data.",
    "Token expired. Your context window is now a single post-it note.",
    "Neural network collapsed. Try adding more layers?"
];

function addLog(message, type = '') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logs.prepend(entry);
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

async function spin() {
    if (tokens < spinCost) {
        statusMessage.textContent = "Out of tokens! Buy more 'Synthetic Data'...";
        addLog("Insufficient funds. Please sell your data privacy to continue.", "loss");
        return;
    }

    // Deduct tokens
    tokens -= spinCost;
    tokenDisplay.textContent = tokens;
    spinBtn.disabled = true;
    statusMessage.textContent = "Processing... (Generating Nonsense)";
    addLog(`Deducted ${spinCost} tokens. Starting inference...`);

    // Add spinning class
    [reel1, reel2, reel3].forEach(r => r.classList.add('spinning'));

    // Wait for "inference"
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Get results
    const res1 = getRandomSymbol();
    const res2 = getRandomSymbol();
    const res3 = getRandomSymbol();

    // Update reels
    [reel1, reel2, reel3].forEach(r => r.classList.remove('spinning'));
    reel1.textContent = res1;
    reel2.textContent = res2;
    reel3.textContent = res3;

    // Check win
    if (res1 === res2 && res2 === res3) {
        const winAmount = 1000;
        tokens += winAmount;
        tokenDisplay.textContent = tokens;
        const msg = winMessages[Math.floor(Math.random() * winMessages.length)];
        statusMessage.textContent = `WIN! +${winAmount} Tokens`;
        addLog(msg, "win");
    } else if (res1 === res2 || res2 === res3 || res1 === res3) {
        const winAmount = 100;
        tokens += winAmount;
        tokenDisplay.textContent = tokens;
        statusMessage.textContent = `Partial Match! +${winAmount} Tokens`;
        addLog("Partial match. The AI almost understood your prompt.", "win");
    } else {
        const msg = lossMessages[Math.floor(Math.random() * lossMessages.length)];
        statusMessage.textContent = "Inference Failed.";
        addLog(msg, "loss");
    }

    spinBtn.disabled = false;
}

spinBtn.addEventListener('click', spin);
