const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const spinBtn = document.getElementById('spin-btn');
const creditsDisplay = document.getElementById('credits');
const hallucinationsDisplay = document.getElementById('hallucinations');
const messageDisplay = document.getElementById('message');

const SYMBOLS = ['🤖', '🧠', '📉', '🚀', '💰', '⚡', '☁️'];
const JARGON = [
    "Leveraging synergistic blockchain neural networks...",
    "Optimizing multi-modal LLM architecture...",
    "Disrupting the disruption of disruption...",
    "Scaling serverless edge compute...",
    "Hallucinating high-value deliverables...",
    "Vectorizing decentralized cloud infrastructure...",
    "Synthesizing hyper-local data lakes...",
    "Aligning AGI with quarterly KPIs..."
];

let credits = 100;
let hallucinations = 0;
const SPIN_COST = 10;

function getRandomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function getRandomJargon() {
    return JARGON[Math.floor(Math.random() * JARGON.length)];
}

function updateUI() {
    creditsDisplay.textContent = credits;
    hallucinationsDisplay.textContent = hallucinations;
}

async function spin() {
    if (credits < SPIN_COST) {
        messageDisplay.textContent = "INSUFFICIENT COMPUTE CREDITS. PLEASE UPGRADE SUBSCRIPTION.";
        messageDisplay.className = "console-text loss";
        return;
    }

    credits -= SPIN_COST;
    updateUI();
    
    spinBtn.disabled = true;
    messageDisplay.textContent = "Inference in progress...";
    messageDisplay.className = "console-text";

    // Start spinning animation
    reels.forEach(reel => reel.classList.add('spinning'));

    // Simulation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = reels.map(reel => {
        const symbol = getRandomSymbol();
        reel.textContent = symbol;
        reel.classList.remove('spinning');
        return symbol;
    });

    checkResults(results);
    spinBtn.disabled = false;
}

function checkResults(results) {
    const [r1, r2, r3] = results;
    
    // Win conditions
    if (r1 === r2 && r2 === r3) {
        // Jackpot
        const winAmount = 100;
        credits += winAmount;
        messageDisplay.innerHTML = `<span class="win">SENSATIONAL!</span> ${getRandomJargon()} +${winAmount} CR`;
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        // Small win
        const winAmount = 20;
        credits += winAmount;
        messageDisplay.innerHTML = `<span class="win">OPTIMAL.</span> ${getRandomJargon()} +${winAmount} CR`;
    } else {
        // Loss
        hallucinations++;
        messageDisplay.textContent = `FAILURE: ${getRandomJargon()}`;
        messageDisplay.className = "console-text loss";
    }

    updateUI();
}

spinBtn.addEventListener('click', spin);
