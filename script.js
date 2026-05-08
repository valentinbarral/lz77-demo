// ==========================================
// LÓGICA DEL CODIFICADOR (ENCODER)
// ==========================================
const WINDOW_SIZE = 16;
const MIN_MATCH_LENGTH = 1;

let inputData = [];
let cursor = 0;
let isFinished = false;
let autoPlayInterval = null; 

let currentTryLength = 1;
let bestMatchSoFar = null;
let emitPending = false;
let checkPending = false;

// DOM Encoder
const elTape = document.getElementById('tape');
const elInput = document.getElementById('inputStr');
const elLog = document.getElementById('logList');
const elTokens = document.getElementById('tokenList');
const elStatusBar = document.getElementById('statusBar');
const elInspector = document.getElementById('inspectorText');
const elBuffer = document.getElementById('bufferDisplay');
const btnStep = document.getElementById('btnStep');
const btnAuto = document.getElementById('btnAuto');

function init() {
    inputData = elInput.value.split('');
    cursor = 0;
    isFinished = false;
    autoPlayInterval = null;
    currentTryLength = 1;
    bestMatchSoFar = null;
    emitPending = false;
    checkPending = false;

    clearLogs();
    renderTape();
    updateStatus(t('msg.readyNext'));
    elInspector.textContent = t('msg.waiting');
    elBuffer.textContent = "[]";
    
    btnStep.disabled = false;
    btnAuto.disabled = false;
    elInput.disabled = false;
}

function reset() { stopAuto(); init(); }
function clearLogs() { elLog.innerHTML = ''; elTokens.innerHTML = ''; }
function updateStatus(msg) { elStatusBar.textContent = msg; }
function updateInspector(msg) { elInspector.textContent = msg; }
function updateBuffer(txt) { elBuffer.textContent = `[ "${txt}" ]`; }

function addLog(msg) {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerText = msg;
    elLog.appendChild(div);
    elLog.scrollTop = elLog.scrollHeight;
}

function addToken(type, content) {
    const span = document.createElement('span');
    span.className = `token ${type}`;
    if (type === 'literal') {
        span.innerText = `'${content}'`;
    } else {
        span.innerText = `<${content.distance}, ${content.length}>`;
    }
    elTokens.appendChild(span);
    elTokens.scrollTop = elTokens.scrollHeight;
}

function renderTape(state = {}) {
    elTape.innerHTML = '';
    const searchStart = Math.max(0, cursor - WINDOW_SIZE);
    
    inputData.forEach((char, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = char === ' ' ? '␣' : char;

        const idxLabel = document.createElement('span');
        idxLabel.className = 'index';
        idxLabel.innerText = index;
        cell.appendChild(idxLabel);

        if (index < cursor) {
            cell.classList.add('processed');
            if (index >= searchStart) {
                cell.classList.add('search-buffer');
                cell.classList.remove('processed');
            }
        } else {
            cell.classList.add('look-ahead');
        }

        if (state.checkingLen > 0) {
             if (index >= cursor && index < cursor + state.checkingLen) {
                cell.classList.add('highlight-checking');
            }
        }
        if (state.matchStart !== undefined && state.matchLen > 0) {
            if (index >= state.matchStart && index < state.matchStart + state.matchLen) {
                cell.classList.add('highlight-match');
            }
        }
        if (state.tryLen > 0) {
             if (index >= cursor && index < cursor + state.tryLen) {
                cell.classList.add('highlight-buffer');
            }
        }
        if (state.failIndex === index) {
            cell.classList.add('highlight-fail');
        }
        elTape.appendChild(cell);
    });

    if (elTape.children[cursor]) {
        elTape.children[cursor].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
}

function step() {
    if (isFinished) return;
    if (cursor === 0 && inputData.join('') !== elInput.value) {
        inputData = elInput.value.split('');
    }
    elInput.disabled = true;

    const searchStart = Math.max(0, cursor - WINDOW_SIZE);
    const searchStr = inputData.slice(searchStart, cursor).join('');
    const lookAheadStr = inputData.slice(cursor).join('');

    if (lookAheadStr.length === 0) {
        finishAlgorithm();
        return;
    }

    if (emitPending) {
        if (bestMatchSoFar && bestMatchSoFar.length >= MIN_MATCH_LENGTH) {
            const matchStr = inputData.slice(cursor, cursor + bestMatchSoFar.length).join('');
            updateInspector(t('msg.emittingBuffer', bestMatchSoFar.distance, bestMatchSoFar.length));
            addLog(t('msg.emittingRef', bestMatchSoFar.distance, bestMatchSoFar.length));
            addToken('reference', bestMatchSoFar);
            cursor += bestMatchSoFar.length;
        } else {
            const literal = lookAheadStr[0];
            updateBuffer(""); 
            updateInspector(t('msg.noMatch', literal));
            addLog(t('msg.emittingLiteral', literal));
            addToken('literal', literal);
            cursor += 1;
        }
        currentTryLength = 1;
        bestMatchSoFar = null;
        emitPending = false;
        checkPending = false;
        renderTape({});
        updateStatus(t('msg.cursorAt', cursor));
        if (cursor >= inputData.length) finishAlgorithm();
        return; 
    }

    if (!checkPending) {
        if (currentTryLength > lookAheadStr.length) {
            checkPending = true;
            step(); 
            return;
        }
        const subStr = lookAheadStr.substring(0, currentTryLength);
        updateInspector(t('msg.operating', subStr));
        renderTape({
            checkingLen: currentTryLength,
            matchStart: (bestMatchSoFar) ? (cursor - bestMatchSoFar.distance) : undefined,
            matchLen: (bestMatchSoFar) ? bestMatchSoFar.length : 0
        });
        checkPending = true; 
        updateStatus(t('msg.charSelected'));
        return;
    }

    checkPending = false; 
    if (currentTryLength === 1) updateBuffer(""); 

    const subStr = lookAheadStr.substring(0, currentTryLength);
    let foundIndexRel = -1;
    if (subStr.length === currentTryLength) {
        foundIndexRel = searchStr.lastIndexOf(subStr);
    } else {
        foundIndexRel = -1;
    }

    if (foundIndexRel !== -1) {
        const dist = searchStr.length - foundIndexRel;
        updateBuffer(subStr);
        updateInspector(t('msg.found', subStr, dist));
        bestMatchSoFar = { distance: dist, length: currentTryLength };
        renderTape({ 
            tryLen: currentTryLength, 
            matchStart: searchStart + foundIndexRel, 
            matchLen: currentTryLength 
        });
        currentTryLength++;
        updateStatus(t('msg.coincidenceFound'));
    } else {
        updateInspector(t('msg.notFound', subStr));
        renderTape({ 
            tryLen: currentTryLength - 1, 
            matchStart: (bestMatchSoFar) ? (cursor - bestMatchSoFar.distance) : undefined,
            matchLen: (bestMatchSoFar) ? bestMatchSoFar.length : 0,
            failIndex: cursor + currentTryLength - 1
        });
        emitPending = true;
        updateStatus(t('msg.failExtend'));
    }
}

function finishAlgorithm() {
    isFinished = true;
    stopAuto();
    renderTape({});
    addLog(t('msg.algorithmEnd'));
    updateStatus(t('msg.algorithmEnd'));
    updateInspector(t('msg.completed'));
    updateBuffer(t('msg.end'));
    btnStep.disabled = true;
    btnAuto.disabled = true;
    elInput.disabled = false;
}

function toggleAuto() {
    if (autoPlayInterval) { stopAuto(); } else { if (isFinished) reset(); startAuto(); }
}
function startAuto() {
    btnStep.disabled = true;
    btnAuto.textContent = t('msg.pause');
    btnAuto.classList.replace('btn-secondary', 'btn-primary');
    step(); 
    autoPlayInterval = setInterval(() => { if (!isFinished) { step(); } else { stopAuto(); } }, 1200); 
}
function stopAuto() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    btnAuto.textContent = t('encoder.btn.auto');
    btnAuto.classList.replace('btn-primary', 'btn-secondary');
    if (!isFinished) btnStep.disabled = false;
}

// ==========================================
// LÓGICA DEL DECODIFICADOR (DECODER)
// ==========================================

let decoderTokens = []; // [{type:'lit', val:'A'}, {type:'ref', dist:1, len:2}]
let decodedText = [];   // Caracteres reconstruidos
let decTokenIndex = 0;
let decIsFinished = false;
let decAutoInterval = null;

// DOM Decoder
const elDecInput = document.getElementById('decodeInput');
const elDecTape = document.getElementById('decTape');
const elDecInspector = document.getElementById('decInspectorText');
const elDecStatusBar = document.getElementById('decStatusBar');
const elDecTokenList = document.getElementById('decTokenList');
const btnDecStep = document.getElementById('btnDecStep');
const btnDecAuto = document.getElementById('btnDecAuto');

function initDecoder() {
    // Parsear entrada
    const rawInput = elDecInput.value;
    decoderTokens = parseTokens(rawInput);
    decodedText = [];
    decTokenIndex = 0;
    decIsFinished = false;
    decAutoInterval = null;

    renderDecoderTokens();
    renderDecoderTape();
    elDecInspector.textContent = t('msg.waiting');
    elDecStatusBar.textContent = t('msg.decReadyTokens');
    
    btnDecStep.disabled = false;
    btnDecAuto.disabled = false;
}

function resetDecoder() { stopAutoDecoder(); initDecoder(); }

// Parser simple: busca 'c' o <d, l>
function parseTokens(str) {
    const tokens = [];
    // Regex para capturar 'X' o <D,L>
    const regex = /'([^']+)'|<(\d+),\s*(\d+)>/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
        if (match[1]) {
            // Literal
            tokens.push({ type: 'lit', val: match[1] });
        } else {
            // Referencia
            tokens.push({ type: 'ref', dist: parseInt(match[2]), len: parseInt(match[3]) });
        }
    }
    return tokens;
}

function renderDecoderTokens() {
    elDecTokenList.innerHTML = '';
    decoderTokens.forEach((tok, idx) => {
        const span = document.createElement('span');
        span.className = `token ${tok.type === 'lit' ? 'literal' : 'reference'}`;
        if (idx === decTokenIndex && !decIsFinished) span.classList.add('active');
        
        if (tok.type === 'lit') {
            span.innerText = `'${tok.val}'`;
        } else {
            span.innerText = `<${tok.dist}, ${tok.len}>`;
        }
        elDecTokenList.appendChild(span);
    });
}

function renderDecoderTape(highlightInfo = {}) {
    elDecTape.innerHTML = '';
    decodedText.forEach((char, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell decoded';
        cell.innerText = char === ' ' ? '␣' : char;
        
        const idxLabel = document.createElement('span');
        idxLabel.className = 'index';
        idxLabel.innerText = index;
        cell.appendChild(idxLabel);

        // Highlights
        if (highlightInfo.copySource && 
            index >= highlightInfo.copySource.start && 
            index < highlightInfo.copySource.end) {
            cell.classList.add('copy-source');
        }
        
        if (highlightInfo.copyDest && 
            index >= highlightInfo.copyDest.start && 
            index < highlightInfo.copyDest.end) {
            cell.classList.add('copy-dest');
        }

        elDecTape.appendChild(cell);
    });
    
    // Scroll al final
    elDecTape.scrollLeft = elDecTape.scrollWidth;
}

function stepDecoder() {
    if (decIsFinished) return;
    if (decoderTokens.length === 0) initDecoder();

    if (decTokenIndex >= decoderTokens.length) {
        decIsFinished = true;
        stopAutoDecoder();
        elDecInspector.textContent = t('msg.decComplete');
        elDecStatusBar.textContent = t('msg.processEnd');
        btnDecStep.disabled = true;
        btnDecAuto.disabled = true;
        renderDecoderTokens(); // quitar active
        renderDecoderTape({}); // quitar colores de resaltado
        return;
    }

    const token = decoderTokens[decTokenIndex];
    renderDecoderTokens(); // Actualizar activo

    if (token.type === 'lit') {
        // PROCESAR LITERAL
        decodedText.push(token.val);
        elDecInspector.innerHTML = t('msg.literal', token.val);
        
        renderDecoderTape({
            copyDest: { start: decodedText.length - 1, end: decodedText.length }
        });

    } else {
        // PROCESAR REFERENCIA
        const startCopyIndex = decodedText.length - token.dist;
        
        if (startCopyIndex < 0) {
            elDecInspector.textContent = t('msg.invalidRef');
            return; 
        }

        let copiedString = "";
        const initialLength = decodedText.length;

        // Copiar carácter a carácter (permite overlap)
        for (let i = 0; i < token.len; i++) {
            // En LZ77 "standard", si dist < len, copiamos lo que acabamos de escribir
            // Accedemos a decodedText dinámicamente
            const charToCopy = decodedText[decodedText.length - token.dist];
            decodedText.push(charToCopy);
            copiedString += charToCopy;
        }

        elDecInspector.innerHTML = t('msg.reference', token.dist, token.len, copiedString, startCopyIndex);

        renderDecoderTape({
            copySource: { start: startCopyIndex, end: startCopyIndex + token.len }, // Visualización aproximada para source
            copyDest: { start: initialLength, end: decodedText.length }
        });
    }

    decTokenIndex++;
    
    // Check fin inmediato
    if (decTokenIndex >= decoderTokens.length) {
        elDecStatusBar.textContent = t('msg.lastToken');
    } else {
        elDecStatusBar.textContent = t('msg.tokenCount', decTokenIndex, decoderTokens.length);
    }
}

function toggleAutoDecoder() {
    if (decAutoInterval) { stopAutoDecoder(); } else { if (decIsFinished) resetDecoder(); startAutoDecoder(); }
}
function startAutoDecoder() {
    btnDecStep.disabled = true;
    btnDecAuto.textContent = t('msg.pause');
    btnDecAuto.classList.replace('btn-secondary', 'btn-primary');
    stepDecoder();
    decAutoInterval = setInterval(() => { 
        if (!decIsFinished) { stepDecoder(); } else { stopAutoDecoder(); } 
    }, 1200);
}
function stopAutoDecoder() {
    clearInterval(decAutoInterval);
    decAutoInterval = null;
    btnDecAuto.textContent = t('decoder.btn.auto');
    btnDecAuto.classList.replace('btn-primary', 'btn-secondary');
    if (!decIsFinished) btnDecStep.disabled = false;
}


// ==========================================
// HAMBURGER MENU
// ==========================================

function toggleMenu() {
    const controls = document.getElementById('headerControls');
    if (controls) controls.classList.toggle('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const controls = document.getElementById('headerControls');
    const hamburger = document.querySelector('.hamburger');
    if (!controls || !hamburger) return;
    if (!controls.contains(e.target) && e.target !== hamburger) {
        controls.classList.remove('open');
    }
});

// ==========================================
// THEME & LANGUAGE BRIDGE
// ==========================================

function changeLang(lang) {
    setLanguage(lang);
}

// ==========================================
// GLOBAL INIT
// ==========================================

elInput.addEventListener('change', () => { if(cursor===0) init(); });
elDecInput.addEventListener('change', () => initDecoder());

init();
initDecoder();

