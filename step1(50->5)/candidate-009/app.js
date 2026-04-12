const symbols = ['🤖', '🧠', '💰', '📉', '🍄', '🤡', '⚡', '👁️'];
const winCombos = {
    '🤖🤖🤖': { prize: 500, msg: "AGI ACHIEVED! (Actually just a better autocomplete)" },
    '🧠🧠🧠': { prize: 300, msg: "Neural scaling laws confirmed!" },
    '💰💰💰': { prize: 1000, msg: "Series Z funding secured!" },
    '⚡⚡⚡': { prize: 200, msg: "H100 clusters overclocked!" },
    '👁️👁️👁️': { prize: 2000, msg: "SAM ALTMAN IS WATCHING." },
    '📉📉📉': { prize: -500, msg: "Market crash: AI bubble burst." },
    '🤡🤡🤡': { prize: 10, msg: "Prompt Engineering degree awarded." },
    '🍄🍄🍄': { prize: 50, msg: "Model hallucination detected. It's beautiful." }
};

const spinCosts = 50;
let tokens = 1000;
let pDoom = 0.1;

const reelElements = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const spinButton = document.getElementById('spin-button');
const tokenDisplay = document.getElementById('token-count');
const pDoomDisplay = document.getElementById('p-doom');
const statusDisplay = document.getElementById('status-message');
const logs = document.getElementById('logs');

function addLog(message) {
    const div = document.createElement('div');
    div.textContent = `> ${message}`;
    logs.appendChild(div);
    logs.scrollTop = logs.scrollHeight;
}

function updateUI() {
    tokenDisplay.textContent = tokens;
    pDoomDisplay.textContent = pDoom.toFixed(2) + '%';
    
    if (tokens < spinCosts) {
        spinButton.disabled = true;
        statusDisplay.textContent = "Out of tokens. Please request more VC funding.";
    }
}

async function spin() {
    if (tokens < spinCosts) return;

    // Deduct tokens
    tokens -= spinCosts;
    pDoom += 0.05;
    updateUI();
    
    spinButton.disabled = true;
    statusDisplay.textContent = "Running Inference...";
    addLog(`Deducting ${spinCosts} tokens for compute...`);

    // Add spinning class
    reelElements.forEach(reel => reel.classList.add('spinning'));

    // Simulation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Result calculation
    const results = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Stop spinning and set results
    reelElements.forEach((reel, i) => {
        reel.classList.remove('spinning');
        reel.textContent = results[i];
    });

    const combo = results.join('');
    checkWin(combo);
    spinButton.disabled = false;
}

function checkWin(combo) {
    if (winCombos[combo]) {
        const result = winCombos[combo];
        tokens += result.prize;
        statusDisplay.textContent = result.msg;
        statusDisplay.className = result.prize > 0 ? 'win' : 'loss';
        addLog(`SUCCESS: ${result.msg} (+${result.prize} tokens)`);
        
        if (combo === '👁️👁️👁️') {
            document.body.style.filter = 'invert(1)';
            setTimeout(() => document.body.style.filter = 'none', 500);
        }
    } else {
        // Partial wins or just loss
        if (combo.includes('🤖🤖')) {
            tokens += 20;
            statusDisplay.textContent = "Stochastic partial match.";
            addLog("Minor alignment success (+20 tokens)");
        } else {
            statusDisplay.textContent = "Loss of alignment. Hallucination occurred.";
            statusDisplay.className = '';
            addLog("Inference yielded noise.");
        }
    }

    // Check for "Game Over" by p(doom)
    if (pDoom > 99) {
        tokens = 0;
        statusDisplay.textContent = "EXTINCTION EVENT: AI turned us into paperclips.";
        spinButton.disabled = true;
        addLog("CRITICAL FAILURE: Alignment lost permanently.");
    }
    
    updateUI();
}

spinButton.addEventListener('click', spin);
updateUI();
