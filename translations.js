// Sistema de traducciones para la aplicación LZ77
const translations = {
    es: {
        // Títulos principales
        'encoder.title': 'LZ77 Demo - Encoder',
        'decoder.title': 'LZ77 Demo - Decoder',
        
        // Controles Encoder
        'encoder.input.label': 'Entrada:',
        'encoder.btn.step': 'Paso siguiente ▶',
        'encoder.btn.auto': 'Auto play ▶▶',
        'encoder.btn.reset': 'Reiniciar ↺',
        
        // Inspector Encoder
        'encoder.inspector.action': 'Acción:',
        'encoder.inspector.buffer': 'Buffer actual:',
        
        // Leyenda Encoder
        'encoder.legend.window': 'Ventana (historia)',
        'encoder.legend.checking': 'Operando (comprobando)',
        'encoder.legend.found': 'Encontrado',
        'encoder.legend.fail': 'Fallo (no encontrado)',
        
        // Paneles Encoder
        'encoder.panel.log': 'Log de decisiones',
        'encoder.panel.output': 'Salida codificada',
        
        // Controles Decoder
        'decoder.input.label': 'Secuencia codificada:',
        'decoder.btn.step': 'Paso siguiente ▶',
        'decoder.btn.auto': 'Auto play ▶▶',
        'decoder.btn.reset': 'Reiniciar ↺',
        
        // Inspector Decoder
        'decoder.inspector.token': 'Token actual:',
        
        // Leyenda Decoder
        'decoder.legend.decoded': 'Texto decodificado',
        'decoder.legend.source': 'Origen (leyendo copia)',
        'decoder.legend.dest': 'Destino (escribiendo copia)',
        
        // Panel Decoder
        'decoder.panel.tokens': 'Tokens a procesar',
        
        // Mensajes dinámicos
        'msg.waiting': 'Esperando inicio...',
        'msg.ready': 'Listo. Ventana: {0} chars.',
        'msg.readyNext': 'Listo. Pulsa "Paso siguiente" para ver la lógica.',
        'msg.operating': 'Operando con el carácter: "{0}"',
        'msg.charSelected': 'Carácter seleccionado. Pulsa \'Paso siguiente\' para buscar en la ventana.',
        'msg.found': '"{0}" ENCONTRADO en ventana (Dist: {1}). Intentando extender...',
        'msg.notFound': '"{0}" NO encontrado en ventana. Fin de coincidencia.',
        'msg.coincidenceFound': 'Coincidencia encontrada. Pulsa \'Paso siguiente\' para ver si crece.',
        'msg.failExtend': 'Fallo al extender. Pulsa \'Paso siguiente\' para emitir resultado.',
        'msg.cursorAt': 'Cursor en {0}. Listo para siguiente carácter.',
        'msg.emittingBuffer': 'Emitiendo buffer: <{0}, {1}>',
        'msg.emittingRef': 'Emitiendo referencia (Dist: {0}, Long: {1})',
        'msg.noMatch': 'Sin coincidencia válida. Emitiendo literal \'{0}\'.',
        'msg.emittingLiteral': 'Emitiendo literal \'{0}\'',
        'msg.algorithmEnd': 'Fin del algoritmo.',
        'msg.completed': 'Completado.',
        'msg.end': 'FIN',
        'msg.pause': 'Pausar ■',
        'msg.decReady': 'Listo. Inicio de decodificación.',
        'msg.tokensLoaded': 'Tokens cargados: {0}. Pulsa "Paso siguiente".',
        'msg.decComplete': 'Decodificación completa.',
        'msg.processEnd': 'Fin del proceso.',
        'msg.lastToken': 'Último token procesado. Pulsa siguiente para finalizar.',
        'msg.tokenCount': 'Token {0} de {1}.',
        'msg.literal': 'Literal <b>\'{0}\'</b>: Se añade directamente.',
        'msg.reference': 'Referencia <b>&lt;{0}, {1}&gt;</b>: Copiando "{2}" desde posición {3}.',
        'msg.invalidRef': 'Error: Referencia inválida (distancia mayor que buffer).',
        'msg.decReadyTokens': 'Listo. Introduce tokens y pulsa "Paso siguiente".',
        
        // Selector de idioma y tema
        'lang.selector': 'Idioma',
        'theme.toggle': 'Cambiar tema',
        'theme.light': '☀️',
        'theme.dark': '🌙'
    },
    
    en: {
        // Main titles
        'encoder.title': 'LZ77 Demo - Encoder',
        'decoder.title': 'LZ77 Demo - Decoder',
        
        // Encoder Controls
        'encoder.input.label': 'Input:',
        'encoder.btn.step': 'Next step ▶',
        'encoder.btn.auto': 'Auto play ▶▶',
        'encoder.btn.reset': 'Reset ↺',
        
        // Encoder Inspector
        'encoder.inspector.action': 'Action:',
        'encoder.inspector.buffer': 'Current buffer:',
        
        // Encoder Legend
        'encoder.legend.window': 'Window (history)',
        'encoder.legend.checking': 'Operating (checking)',
        'encoder.legend.found': 'Found',
        'encoder.legend.fail': 'Fail (not found)',
        
        // Encoder Panels
        'encoder.panel.log': 'Decision log',
        'encoder.panel.output': 'Encoded output',
        
        // Decoder Controls
        'decoder.input.label': 'Encoded sequence:',
        'decoder.btn.step': 'Next step ▶',
        'decoder.btn.auto': 'Auto play ▶▶',
        'decoder.btn.reset': 'Reset ↺',
        
        // Decoder Inspector
        'decoder.inspector.token': 'Current token:',
        
        // Decoder Legend
        'decoder.legend.decoded': 'Decoded text',
        'decoder.legend.source': 'Source (reading copy)',
        'decoder.legend.dest': 'Destination (writing copy)',
        
        // Decoder Panel
        'decoder.panel.tokens': 'Tokens to process',
        
        // Dynamic messages
        'msg.waiting': 'Waiting to start...',
        'msg.ready': 'Ready. Window: {0} chars.',
        'msg.readyNext': 'Ready. Press "Next step" to see the logic.',
        'msg.operating': 'Operating with character: "{0}"',
        'msg.charSelected': 'Character selected. Press \'Next step\' to search in the window.',
        'msg.found': '"{0}" FOUND in window (Dist: {1}). Trying to extend...',
        'msg.notFound': '"{0}" NOT found in window. End of match.',
        'msg.coincidenceFound': 'Match found. Press \'Next step\' to see if it grows.',
        'msg.failExtend': 'Failed to extend. Press \'Next step\' to emit result.',
        'msg.cursorAt': 'Cursor at {0}. Ready for next character.',
        'msg.emittingBuffer': 'Emitting buffer: <{0}, {1}>',
        'msg.emittingRef': 'Emitting reference (Dist: {0}, Len: {1})',
        'msg.noMatch': 'No valid match. Emitting literal \'{0}\'.',
        'msg.emittingLiteral': 'Emitting literal \'{0}\'',
        'msg.algorithmEnd': 'End of algorithm.',
        'msg.completed': 'Completed.',
        'msg.end': 'END',
        'msg.pause': 'Pause ■',
        'msg.decReady': 'Ready. Starting decoding.',
        'msg.tokensLoaded': 'Tokens loaded: {0}. Press "Next step".',
        'msg.decComplete': 'Decoding complete.',
        'msg.processEnd': 'End of process.',
        'msg.lastToken': 'Last token processed. Press next to finish.',
        'msg.tokenCount': 'Token {0} of {1}.',
        'msg.literal': 'Literal <b>\'{0}\'</b>: Added directly.',
        'msg.reference': 'Reference <b>&lt;{0}, {1}&gt;</b>: Copying "{2}" from position {3}.',
        'msg.invalidRef': 'Error: Invalid reference (distance greater than buffer).',
        'msg.decReadyTokens': 'Ready. Enter tokens and press "Next step".',
        
        // Language and theme selector
        'lang.selector': 'Language',
        'theme.toggle': 'Toggle theme',
        'theme.light': '☀️',
        'theme.dark': '🌙'
    },
    
    gl: {
        // Títulos principais
        'encoder.title': 'LZ77 Demo - Encoder',
        'decoder.title': 'LZ77 Demo - Decoder',
        
        // Controis Encoder
        'encoder.input.label': 'Entrada:',
        'encoder.btn.step': 'Seguinte paso ▶',
        'encoder.btn.auto': 'Auto play ▶▶',
        'encoder.btn.reset': 'Reiniciar ↺',
        
        // Inspector Encoder
        'encoder.inspector.action': 'Acción:',
        'encoder.inspector.buffer': 'Buffer actual:',
        
        // Lenda Encoder
        'encoder.legend.window': 'Ventá (historia)',
        'encoder.legend.checking': 'Operando (comprobando)',
        'encoder.legend.found': 'Atopado',
        'encoder.legend.fail': 'Fallo (non atopado)',
        
        // Paneis Encoder
        'encoder.panel.log': 'Rexistro de decisións',
        'encoder.panel.output': 'Saída codificada',
        
        // Controis Decoder
        'decoder.input.label': 'Secuencia codificada:',
        'decoder.btn.step': 'Seguinte paso ▶',
        'decoder.btn.auto': 'Auto play ▶▶',
        'decoder.btn.reset': 'Reiniciar ↺',
        
        // Inspector Decoder
        'decoder.inspector.token': 'Token actual:',
        
        // Lenda Decoder
        'decoder.legend.decoded': 'Texto decodificado',
        'decoder.legend.source': 'Orixe (lendo copia)',
        'decoder.legend.dest': 'Destino (escribindo copia)',
        
        // Panel Decoder
        'decoder.panel.tokens': 'Tokens a procesar',
        
        // Mensaxes dinámicas
        'msg.waiting': 'Agardando inicio...',
        'msg.ready': 'Listo. Ventá: {0} chars.',
        'msg.readyNext': 'Listo. Preme "Seguinte paso" para ver a lóxica.',
        'msg.operating': 'Operando co carácter: "{0}"',
        'msg.charSelected': 'Carácter seleccionado. Preme \'Seguinte paso\' para buscar na ventá.',
        'msg.found': '"{0}" ATOPADO na ventá (Dist: {1}). Intentando estender...',
        'msg.notFound': '"{0}" NON atopado na ventá. Fin de coincidencia.',
        'msg.coincidenceFound': 'Coincidencia atopada. Preme \'Seguinte paso\' para ver se crece.',
        'msg.failExtend': 'Fallo ao estender. Preme \'Seguinte paso\' para emitir resultado.',
        'msg.cursorAt': 'Cursor en {0}. Listo para seguinte carácter.',
        'msg.emittingBuffer': 'Emitindo buffer: <{0}, {1}>',
        'msg.emittingRef': 'Emitindo referencia (Dist: {0}, Long: {1})',
        'msg.noMatch': 'Sen coincidencia válida. Emitindo literal \'{0}\'.',
        'msg.emittingLiteral': 'Emitindo literal \'{0}\'',
        'msg.algorithmEnd': 'Fin do algoritmo.',
        'msg.completed': 'Completado.',
        'msg.end': 'FIN',
        'msg.pause': 'Pausar ■',
        'msg.decReady': 'Listo. Inicio de decodificación.',
        'msg.tokensLoaded': 'Tokens cargados: {0}. Preme "Seguinte paso".',
        'msg.decComplete': 'Decodificación completa.',
        'msg.processEnd': 'Fin do proceso.',
        'msg.lastToken': 'Último token procesado. Preme seguinte para finalizar.',
        'msg.tokenCount': 'Token {0} de {1}.',
        'msg.literal': 'Literal <b>\'{0}\'</b>: Engádese directamente.',
        'msg.reference': 'Referencia <b>&lt;{0}, {1}&gt;</b>: Copiando "{2}" desde posición {3}.',
        'msg.invalidRef': 'Erro: Referencia inválida (distancia maior que buffer).',
        'msg.decReadyTokens': 'Listo. Introduce tokens e preme "Seguinte paso".',
        
        // Selector de idioma e tema
        'lang.selector': 'Idioma',
        'theme.toggle': 'Cambiar tema',
        'theme.light': '☀️',
        'theme.dark': '🌙'
    }
};

// Variables globales
let currentLanguage = localStorage.getItem('lz77-language') || 'es';
let currentTheme = localStorage.getItem('lz77-theme') || 'dark';

// Función para obtener una traducción
function t(key, ...args) {
    let text = translations[currentLanguage][key] || translations['es'][key] || key;
    
    // Reemplazar placeholders {0}, {1}, etc.
    args.forEach((arg, index) => {
        text = text.replace(`{${index}}`, arg);
    });
    
    return text;
}

// Función para cambiar el idioma
function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('lz77-language', lang);
    document.documentElement.lang = lang;
    
    // Actualizar selector
    const selector = document.getElementById('languageSelector');
    if (selector) selector.value = lang;
    
    // Traducir elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Traducir elementos con atributo data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Re-inicializar para actualizar mensajes dinámicos
    if (typeof init === 'function') init();
    if (typeof initDecoder === 'function') initDecoder();
}

// Función para cambiar el tema
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme();
}

function applyTheme() {
    localStorage.setItem('lz77-theme', currentTheme);
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Actualizar icono del botón
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'dark' ? t('theme.light') : t('theme.dark');
        themeToggle.title = t('theme.toggle');
    }
}

// Inicializar idioma y tema al cargar
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    setLanguage(currentLanguage);
});

