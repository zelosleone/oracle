const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isOutside = false;

function initCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if (e.type.includes('touch')) {
        const touch = e.touches[0] || e.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    return {
        x: Math.min(Math.max(0, (clientX - rect.left) * scaleX), canvas.width),
        y: Math.min(Math.max(0, (clientY - rect.top) * scaleY), canvas.height)
    };
}

function startDrawing(e) {
    isDrawing = true;
    isOutside = false;
    const coords = getCanvasCoordinates(e);
    lastX = coords.x;
    lastY = coords.y;
    initCanvas();
}

function draw(e) {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    
    // Check if we're outside the canvas
    const rect = canvas.getBoundingClientRect();
    const rawX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const rawY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    if (rawX < rect.left || rawX > rect.right || rawY < rect.top || rawY > rect.bottom) {
        isOutside = true;
        return;
    }

    // If we were outside and now coming back in, move to the last position without drawing
    if (isOutside) {
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
        isOutside = false;
    } else {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    }

    lastX = coords.x;
    lastY = coords.y;
}

function stopDrawing() {
    isDrawing = false;
    isOutside = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners for canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);
window.addEventListener('mouseup', stopDrawing);

async function getRandomNumbers(min, max, count) {
    if (min >= max) {
        throw new Error("Parameter 'min' must be less than parameter 'max'");
    }

    try {
        const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "generateIntegers",
                "params": {
                    "apiKey": "b7e2d30e-28a0-4c92-b839-e278a26f1eb6",
                    "n": count,
                    "min": min,
                    "max": max,
                    "replacement": true
                },
                "id": 1
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get random numbers from Random.org');
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.result.random.data;
    } catch (error) {
        console.error('Random.org API Error:', error);
        throw new Error('Could not obtain true randomness from Random.org. Please try again later.');
    }
}

function processMagicPhrase(phrase) {
    return phrase.split('').reverse().join('');
}

function isPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}

function getNextPrime(num) {
    while(!isPrime(++num)) {} // Increment first to avoid checking the same number
    return num;
}

async function shuffleAnswers(answers) {
    try {
        // Guard against empty or single-item arrays
        if (!Array.isArray(answers) || answers.length < 2) {
            return answers;
        }

        const min = 0;
        const max = answers.length - 1;
        
        // Create a temporary array to store shuffled items
        const shuffledAnswers = [...answers];
        const indices = await getRandomNumbers(min, max, answers.length);
        
        // Use Fisher-Yates shuffle with the random indices
        for (let i = 0; i < indices.length; i++) {
            const j = indices[i];
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
        }
        
        return shuffledAnswers;
    } catch (error) {
        console.error('Error shuffling answers:', error);
        // If shuffling fails, return the original array instead of throwing
        return answers;
    }
}

function calculateComplexityIndex(numbers) {
    // Calculate statistical complexity using entropy and disequilibrium
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
    const entropy = -numbers.reduce((a, b) => {
        const p = Math.abs(b - mean) / Math.sqrt(variance);
        return a + (p > 0 ? p * Math.log(p) : 0);
    }, 0);
    return Math.exp(entropy) / numbers.length;
}

function calculateQuantumFluctuation(energy) {
    // Simulate quantum fluctuations using Planck's constant approximation
    const h = 6.62607015e-34;
    const scaledEnergy = energy * 1e-33;
    return Math.abs(Math.sin(scaledEnergy / h)) * energy;
}

function applyWaveFunction(value, phase) {
    // Apply quantum wave function transformation
    const psi = Math.sqrt(1 - Math.pow(value, 2));
    return Math.pow(Math.cos(phase * Math.PI), 2) * psi;
}

async function calculatePentagramEnergy(min = 1, max = 100) {
    // Get 5 random numbers for pentagram sides
    const sides = await getRandomNumbers(min, max, 5);
    
    // Calculate the golden ratio (phi) - key in pentagram geometry
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Calculate vertex angles (regular pentagram has 36° between lines)
    const baseAngle = Math.PI / 5;
    
    // Calculate energies for each point of the pentagram using advanced geometry
    let energyValues = sides.map((side, index) => {
        const angleInfluence = Math.sin(baseAngle * (index + 1));
        const sideEnergy = side * phi;
        const phaseShift = Math.cos(index * 2 * Math.PI / 5);
        
        // Apply quantum wave function
        const waveComponent = applyWaveFunction(sideEnergy / max, phaseShift);
        
        // Combine classical and quantum components
        return (sideEnergy * angleInfluence * waveComponent) / max;
    });
    
    // Add complexity index influence
    const complexityFactor = calculateComplexityIndex(energyValues);
    
    // Calculate quantum-influenced total energy
    const baseEnergy = energyValues.reduce((sum, energy) => sum + energy, 0) / 5;
    const quantumEnergy = calculateQuantumFluctuation(baseEnergy);
    
    // Combine all energy components
    return (baseEnergy + quantumEnergy + complexityFactor) / 3;
}

async function askOracleMultipleTimes() {
    const answersInput = document.getElementById('answers-input').value.trim();
    const processLog = document.getElementById('process-log');
    
    if (answersInput === '' || canvas.toDataURL() === document.createElement('canvas').toDataURL()) {
        alert('Please enter both answers and paint your question.');
        return;
    }

    const answers = answersInput.split('\n').filter(line => line.trim() !== '');
    if (answers.length < 2) {
        alert('Please enter at least two possible answers.');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').textContent = '';
    document.getElementById('user-question').textContent = '';
    document.getElementById('error-message').style.display = 'none';
    processLog.innerHTML = '<h3>Oracle Consultation Log</h3>';

    try {
        processLog.innerHTML += '<p>Randomizing answer positions...</p>';
        const shuffledAnswers = await shuffleAnswers(answers);
        
        processLog.innerHTML += '<p>Calculating quantum-enhanced pentagram energies...</p>';
        const pentagramEnergy = await calculatePentagramEnergy();
        const quantumInfluence = calculateQuantumFluctuation(pentagramEnergy);
        
        processLog.innerHTML += `<p>Pentagram energy level: ${(pentagramEnergy * 100).toFixed(2)}%</p>`;
        processLog.innerHTML += `<p>Quantum influence: ${(quantumInfluence * 100).toFixed(2)}%</p>`;

        const answerCounts = {};
        const baseRuns = shuffledAnswers.length === 2 ? 9 : getNextPrime(9 * shuffledAnswers.length);
        const totalRuns = Math.max(baseRuns, Math.floor(baseRuns * (pentagramEnergy + quantumInfluence) / 2));

        for (let i = 0; i < totalRuns; i++) {
            // Enhanced weight calculation using quantum influence
            const randomNumber = await getRandomNumbers(0, Math.max(0, shuffledAnswers.length - 1), 1);
            const quantumPhase = Math.sin(2 * Math.PI * i / totalRuns);
            const waveComponent = applyWaveFunction(pentagramEnergy, quantumPhase);
            const complexityIndex = calculateComplexityIndex([pentagramEnergy, quantumInfluence, waveComponent]);
            
            const energyInfluencedIndex = Math.floor(
                (randomNumber[0] * pentagramEnergy + waveComponent * quantumInfluence) * 
                complexityIndex
            ) % shuffledAnswers.length;
            
            const answer = shuffledAnswers[energyInfluencedIndex];
            answerCounts[answer] = (answerCounts[answer] || 0) + 1;
            
            if (i < 9) {
                processLog.innerHTML += `<p>Run ${i + 1}: ${answer}</p>`;
            } else if (i === 9) {
                processLog.innerHTML += "<p>...</p>";
            }
        }

        const mostFrequentAnswer = Object.entries(answerCounts)
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
        const frequency = answerCounts[mostFrequentAnswer];
        const percentage = ((frequency / totalRuns) * 100).toFixed(2);

        document.getElementById('user-question').textContent = 'Your painted question has been received.';
        document.getElementById('result').textContent = 
            `Oracle says (${percentage}% certainty): ${mostFrequentAnswer}`;
        
        processLog.innerHTML += `
            <div class="summary">
                <p>Total consultations: ${totalRuns}</p>
                <p>Pentagram influence: ${(pentagramEnergy * 100).toFixed(2)}%</p>
                <p>Magic phrase processed ${baseRuns} times</p>
                <p>Results distribution:</p>
            </div>
        `;

        for (const [answer, count] of Object.entries(answerCounts)) {
            const answerPercentage = ((count / totalRuns) * 100).toFixed(2);
            processLog.innerHTML += `
                <p>${answer}: ${count} times (${answerPercentage}%)</p>
            `;
        }

    } catch (error) {
        console.error('Error during oracle consultation:', error);
        document.getElementById('error-message').textContent = 
            'The oracle requires true randomness from Random.org to function. ' +
            'Please try again when the connection to the cosmic forces is restored.';
        document.getElementById('error-message').style.display = 'block';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}
// Initialize canvas settings
initCanvas();

// Prevent default touch behavior on canvas
canvas.addEventListener('touchstart', (e) => e.preventDefault());
canvas.addEventListener('touchmove', (e) => e.preventDefault());
canvas.addEventListener('touchend', (e) => e.preventDefault());

// Handle color picker changes
colorPicker.addEventListener('change', function() {
    ctx.strokeStyle = this.value;
});

// Handle brush size changes
brushSize.addEventListener('input', function() {
    ctx.lineWidth = this.value;
});

// Handle window resize
window.addEventListener('resize', function() {
    const rect = canvas.getBoundingClientRect();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colorPicker.value;
});

// Prevent scrolling while drawing on mobile
document.body.addEventListener('touchmove', function(e) {
    if (isDrawing) {
        e.preventDefault();
    }
}, { passive: false });

// Add support for high DPI displays
function setupHighDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    initCanvas();
}

// Call setupHighDPI on load and resize
const debouncedSetupHighDPI = debounce(setupHighDPI, 250);
window.addEventListener('load', setupHighDPI);
window.addEventListener('resize', debouncedSetupHighDPI);

function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments); 
        }, delay);
    };
}