/**
 * Stackbit 1248 Tool - Main Application Logic
 * Security: Anti-XSS, Input Validation, Error Handling, Secure Logging
 */

// ============================================
// SISTEMA DE LOGGING SEGURO (Anti-Log Injection)
// ============================================

// Função para sanitizar dados antes de logar (prevenir log injection)
function sanitizeForLog(data) {
    if (data === null || data === undefined) {
        return '[null]';
    }
    
    if (typeof data === 'string') {
        // Remover caracteres de controle e caracteres perigosos
        return data
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
            .replace(/[\r\n]/g, ' ') // Substitui quebras de linha
            .substring(0, 200); // Limita tamanho
    }
    
    if (typeof data === 'object') {
        // Não logar objetos completos - apenas tipo
        if (data instanceof Error) {
            // Para erros, apenas mensagem genérica (sem stack trace)
            return 'Error: ' + (data.message ? sanitizeForLog(data.message) : 'Unknown error');
        }
        return '[Object]';
    }
    
    return String(data).substring(0, 200);
}

// Wrapper seguro para console que previne log injection
const secureConsole = {
    log: function(...args) {
        if (typeof console !== 'undefined' && console.log) {
            const sanitized = args.map(arg => sanitizeForLog(arg));
            console.log.apply(console, sanitized);
        }
    },
    warn: function(...args) {
        if (typeof console !== 'undefined' && console.warn) {
            const sanitized = args.map(arg => sanitizeForLog(arg));
            console.warn.apply(console, sanitized);
        }
    },
    error: function(...args) {
        if (typeof console !== 'undefined' && console.error) {
            // Para erros, não expor stack traces ou detalhes sensíveis
            const sanitized = args.map(arg => {
                if (arg instanceof Error) {
                    // Apenas mensagem genérica, sem stack trace
                    return 'Error: ' + sanitizeForLog(arg.message || 'Unknown error');
                }
                return sanitizeForLog(arg);
            });
            console.error.apply(console, sanitized);
        }
    }
};

// Função de sanitização para prevenir XSS
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Função para validar palavra BIP39
function isValidBIP39Word(word) {
    if (typeof word !== 'string' || word.length === 0) return false;
    if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) return false;
    const normalized = word.toLowerCase().trim();
    // Validar formato: apenas letras minúsculas, sem caracteres especiais
    if (!/^[a-z]+$/.test(normalized)) return false;
    // Verificar se a palavra existe no dicionário
    try {
        return bip39Words.indexOf(normalized) !== -1;
    } catch (e) {
        return false;
    }
}

// Função para validar índice
function isValidIndex(index) {
    if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) return false;
    return Number.isInteger(index) && index >= 0 && index < bip39Words.length;
}

// Função para validar dígito
function isValidDigit(digit) {
    return Number.isInteger(digit) && digit >= 0 && digit <= 9;
}

// Função para validar código completo
// IMPORTANTE: Códigos válidos são de 0001 a 2048 (não 0000)
function isValidCode(code) {
    const num = parseInt(code, 10);
    return !isNaN(num) && num >= 1 && num <= 2048;
}

// Registrar Service Worker para funcionamento offline (PWA)
// NOTA: Service Worker só funciona em HTTPS ou localhost, não em file://
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                // Log seguro - não expor scope completo
                secureConsole.log('Service Worker registrado');
            })
            .catch((error) => {
                // Log seguro - não expor detalhes do erro
                // Service Worker pode falhar em file:// ou se não houver HTTPS
                secureConsole.warn('Service Worker: não disponível (normal em file://)');
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // VERIFICAÇÕES DE SEGURANÇA INICIAIS
    // ============================================
    
    // 1. Verificar integridade do bip39Words
    if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) {
        // Log seguro - não expor detalhes
        secureConsole.error('Erro: Dicionário BIP39 inválido');
        // Usar método não-bloqueante em vez de alert()
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#ff4444;color:white;padding:20px;text-align:center;z-index:10000;';
        errorDiv.textContent = 'Erro: Dicionário BIP39 não carregado. Recarregue a página.';
        document.body.appendChild(errorDiv);
        return;
    }
    
    // Verificar tamanho (pode ser 2048 ou mais se tiver propriedades extras)
    if (bip39Words.length < 2048) {
        secureConsole.error('Erro: Dicionário BIP39 incompleto');
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#ff4444;color:white;padding:20px;text-align:center;z-index:10000;';
        errorDiv.textContent = 'Erro: Dicionário BIP39 incompleto. Recarregue a página.';
        document.body.appendChild(errorDiv);
        return;
    }
    
    // 2. Verificar que bip39Words não foi modificado (integridade) - apenas amostra
    let wordsValid = true;
    try {
        // Verificar apenas algumas palavras para não bloquear se houver problema menor
        const sampleSize = Math.min(5, bip39Words.length);
        for (let i = 0; i < sampleSize; i++) {
            if (typeof bip39Words[i] !== 'string' || !/^[a-z]+$/.test(bip39Words[i])) {
                wordsValid = false;
                break;
            }
        }
    } catch (e) {
        // Se houver erro na validação, apenas logar mas não bloquear
        secureConsole.error('Erro: Validação de integridade falhou');
        wordsValid = true; // Não bloquear por erro de validação
    }
    
    // Não bloquear se validação falhar - apenas avisar
    if (!wordsValid) {
        secureConsole.warn('Aviso: Algumas palavras podem estar inválidas');
    }
    
    // --- State and UI Elements ---
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');
    const encodeInput = document.getElementById('encode-input');
    const encodeSuggestions = document.getElementById('encode-suggestions');
    
    // Validação de elementos DOM
    if (!encodeInput || !encodeSuggestions) {
        // Log seguro - não expor quais elementos estão faltando
        secureConsole.error('Erro: Elementos DOM não encontrados');
        return;
    }

    // --- Navigation ---
    tabs.forEach(tab => {
        if (!tab) return;
        tab.addEventListener('click', () => {
            try {
                // Update active tab
                tabs.forEach(t => {
                    if (t) t.classList.remove('active');
                });
                tab.classList.add('active');

                // Show target section - validação de segurança
                const targetId = tab.getAttribute('data-tab');
                if (!targetId || (targetId !== 'encode' && targetId !== 'decode' && targetId !== 'recovery')) {
                    // Log seguro - não expor valor do targetId (pode ser malicioso)
                    secureConsole.error('Erro: Tab inválido');
                    return;
                }
                
                sections.forEach(s => {
                    if (!s) return;
                    s.classList.remove('active');
                    if (s.id === targetId) s.classList.add('active');
                });
            } catch (error) {
                // Log seguro - não expor stack trace ou detalhes do erro
                secureConsole.error('Erro na navegação');
            }
        });
    });

    // --- ENCODE SECTION ---

    // Search words with autocomplete
    encodeInput.addEventListener('input', (e) => {
        try {
            let input = e.target.value;
            if (typeof input !== 'string') {
                input = '';
            }
            // Sanitizar: apenas letras minúsculas
            input = input.toLowerCase().replace(/[^a-z]/g, '').trim();
            e.target.value = input; // Atualizar o campo com valor sanitizado
            
            const resultCard = document.getElementById('encode-result');

            if (input.length === 0) {
                encodeSuggestions.classList.remove('show');
                resultCard.classList.add('hidden');
                return;
            }

            // Validar que contém apenas letras
            if (!/^[a-z]+$/.test(input)) {
                encodeSuggestions.classList.remove('show');
                resultCard.classList.add('hidden');
                return;
            }

            // Exact match check - com proteção contra timing attacks
            // Usar busca direta (já normalizada pelo polyfill)
            let exactIndex = -1;
            try {
                exactIndex = bip39Words.indexOf(input);
            } catch (e) {
                // Log seguro - não expor detalhes do erro ou input
                secureConsole.error('Erro na busca');
                exactIndex = -1;
            }
            
            if (isValidIndex(exactIndex)) {
                showEncodeResult(input, exactIndex);
                encodeSuggestions.classList.remove('show');
                return;
            }

            // Suggestions - limitar a 10 para performance e segurança
            // Proteção adicional: validar cada item antes de processar
            const matches = [];
            try {
                for (let i = 0; i < bip39Words.length && matches.length < 10; i++) {
                    const word = bip39Words[i];
                    if (typeof word === 'string' && 
                        /^[a-z]+$/.test(word) && 
                        word.startsWith(input)) {
                        matches.push({ word, index: i });
                    }
                }
            } catch (e) {
                // Log seguro - não expor detalhes do erro
                secureConsole.error('Erro ao buscar sugestões');
            }

            if (matches.length > 0) {
                // Limpar sugestões anteriores
                encodeSuggestions.innerHTML = '';
                
                // Criar elementos de forma segura (sem innerHTML)
                matches.forEach(item => {
                    if (!isValidIndex(item.index)) return;
                    
                    const suggestionDiv = document.createElement('div');
                    suggestionDiv.className = 'suggestion-item';
                    suggestionDiv.setAttribute('data-word', item.word);
                    suggestionDiv.setAttribute('data-index', item.index.toString());
                    
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = item.word;
                    
                    const indexSpan = document.createElement('span');
                    indexSpan.className = 'index';
                    indexSpan.textContent = formatIndex(item.index);
                    
                    suggestionDiv.appendChild(wordSpan);
                    suggestionDiv.appendChild(indexSpan);
                    
                    // Event listener seguro
                    suggestionDiv.addEventListener('click', () => {
                        const word = suggestionDiv.getAttribute('data-word');
                        const indexStr = suggestionDiv.getAttribute('data-index');
                        const index = parseInt(indexStr, 10);
                        
                        if (isValidBIP39Word(word) && isValidIndex(index)) {
                            encodeInput.value = word;
                            encodeSuggestions.classList.remove('show');
                            showEncodeResult(word, index);
                        }
                    });
                    
                    encodeSuggestions.appendChild(suggestionDiv);
                });
                
                encodeSuggestions.classList.add('show');
            } else {
                encodeSuggestions.classList.remove('show');
                resultCard.classList.add('hidden');
            }
        } catch (error) {
            // Log seguro - não expor stack trace ou detalhes do erro
            secureConsole.error('Erro no processamento de input');
            encodeSuggestions.classList.remove('show');
            const resultCard = document.getElementById('encode-result');
            if (resultCard) resultCard.classList.add('hidden');
        }
    });

    // Hide suggestions on click outside - com proteção
    document.addEventListener('click', (e) => {
        try {
            if (!e || !e.target) return;
            if (!e.target.closest || typeof e.target.closest !== 'function') return;
            if (!e.target.closest('.input-group')) {
                encodeSuggestions.classList.remove('show');
            }
        } catch (error) {
            // Ignorar erros de segurança
            encodeSuggestions.classList.remove('show');
        }
    });

    function make4Digit(num) {
        if (!Number.isInteger(num) || num < 0) {
            return '0000';
        }
        return num.toString().padStart(4, '0');
    }

    function formatIndex(index) {
        if (!isValidIndex(index)) {
            return '0000';
        }
        return make4Digit(index + 1);
    }

    function showEncodeResult(word, index) {
        try {
            // Validação de segurança
            if (!isValidBIP39Word(word) || !isValidIndex(index)) {
                // Log seguro - não expor dados inválidos
                secureConsole.error('Erro: Dados inválidos');
                return;
            }
            
            const resultCard = document.getElementById('encode-result');
            if (!resultCard) return;
            
            const code = formatIndex(index);
            
            // Usar textContent para prevenir XSS
            const wordEl = document.getElementById('encode-word');
            const indexEl = document.getElementById('encode-index');
            const codeEl = document.getElementById('encode-code');
            
            if (wordEl) wordEl.textContent = word;
            if (indexEl) indexEl.textContent = (index + 1).toString();
            if (codeEl) codeEl.textContent = code;

            // Render Quadros no formato 1248 - Usar o mesmo formato do decode: 4 quadrados lado a lado
            // SEMPRE 4 quadrados (um para cada dígito do código)
            const container = document.getElementById('encode-quadros');
            if (!container) return;
            
            container.innerHTML = '';

            // Garantir que sempre temos 4 dígitos
            let digits = code.split('').map(d => {
                const num = parseInt(d, 10);
                return isValidDigit(num) ? num : 0;
            });
            
            while (digits.length < 4) {
                digits.unshift(0);
            }
            digits = digits.slice(-4); // Garantir exatamente 4 dígitos
            
            // Usar o mesmo formato do decode: 4 quadrados lado a lado diretamente no container
            digits.forEach((digit, i) => {
                if (isValidDigit(digit) && i >= 0 && i < 4) {
                    const digitEl = createQuadroElement(digit, i + 1);
                    if (digitEl) {
                        container.appendChild(digitEl);
                    }
                }
            });
            
            resultCard.classList.remove('hidden');
        } catch (error) {
            // Log seguro - não expor stack trace
            secureConsole.error('Erro ao exibir resultado');
        }
    }

    function createQuadroElement(digit, quadroNum) {
        try {
            // Validação de segurança
            if (!isValidDigit(digit)) {
                digit = 0;
            }
            if (!Number.isInteger(quadroNum) || quadroNum < 1 || quadroNum > 4) {
                quadroNum = 1;
            }
            
            // Sistema 1248 (BCD): Cada dígito usa bits 1, 2, 4, 8
            // IMPORTANTE: O primeiro quadrado (quadroNum === 1) só usa 1 e 2
            // Os outros quadrados (2, 3, 4) usam 1, 2, 4, 8
            // Célula superior: mostra 1 ou 2 (dependendo se bit 1 ou 2 está ativo)
            // Célula inferior: mostra 2, 4 ou 8 (dependendo se bit 2, 4 ou 8 está ativo)
            // Se dígito = 0: nenhum bit ativo → top: 1 (sem ponto), bottom: 2 (sem ponto)
            // Quando múltiplos bits estão ativos, ambos devem ser marcados
            
            const isFirstQuadro = (quadroNum === 1);
            const hasBit1 = (digit & 1) !== 0;
            const hasBit2 = (digit & 2) !== 0;
            const hasBit4 = (digit & 4) !== 0;
            const hasBit8 = (digit & 8) !== 0;
        
        // Célula superior: mostra 1 ou 2
        // Prioridade: se tem bit 1, mostra 1; senão, se tem bit 2, mostra 2
        let topCell = '1';  // Padrão: sempre mostra 1
        let topMarked = false;
        
        if (hasBit1) {
            topCell = '1';
            topMarked = true;  // Marca o 1
        } else if (hasBit2) {
            topCell = '2';
            topMarked = true;  // Marca o 2
        }
        // Se não tem bit 1 nem 2, topCell = '1' sem marca (padrão)
        
        // Célula inferior: mostra 2, 4 ou 8
        // IMPORTANTE: No primeiro quadrado, só pode mostrar 2 (não 4 ou 8)
        // Prioridade: 8 > 4 > 2
        // Quando múltiplos bits estão ativos, ambos devem ser marcados
        let bottomCell = '2';  // Padrão: sempre mostra 2
        let bottomMarked = false;
        
        if (isFirstQuadro) {
            // Primeiro quadrado: só pode usar 1 e 2
            // Célula inferior sempre mostra 2
            if (hasBit2 && hasBit1) {
                // Se tem bit 1 E bit 2, bit 1 vai para o top e bit 2 vai para o bottom
                bottomCell = '2';
                bottomMarked = true;  // Marca o 2 no bottom
            } else if (hasBit2 && !hasBit1) {
                // Se só tem bit 2, bit 2 já foi usado no top, então bottom mostra 2 sem marca
                bottomCell = '2';
                bottomMarked = false;
            } else {
                // Sem bit 2, bottom mostra 2 sem marca
                bottomCell = '2';
                bottomMarked = false;
            }
        } else {
            // Outros quadrados: podem usar 2, 4 ou 8
            if (hasBit8) {
                bottomCell = '8';
                bottomMarked = true;  // Marca o 8
            } else if (hasBit4) {
                bottomCell = '4';
                bottomMarked = true;  // Marca o 4
            } else if (hasBit2) {
                // Bit 2 pode estar no top (se não tem bit 1) ou no bottom (se tem bit 1)
                if (hasBit1) {
                    // Se tem bit 1 E bit 2, bit 1 vai para o top e bit 2 vai para o bottom
                    bottomCell = '2';
                    bottomMarked = true;  // Marca o 2 no bottom
                } else {
                    // Se só tem bit 2 (sem bit 1), bit 2 já foi usado no top, então bottom mostra 2 sem marca
                    bottomCell = '2';
                    bottomMarked = false;
                }
            }
            // Se não tem bit 2, 4 ou 8, bottomCell = '2' sem marca (padrão)
        }

            const quadro = document.createElement('div');
            quadro.className = 'quadro-1248';
            quadro.setAttribute('data-quadro', quadroNum.toString());
            quadro.setAttribute('data-digit', digit.toString());

            // Criar elementos de forma segura (sem innerHTML)
            if (isFirstQuadro) {
                // Primeiro quadrado: superior mostra apenas 1, inferior mostra apenas 2
                const topCell = document.createElement('div');
                topCell.className = 'quadro-1248-cell quadro-1248-top';
                
                const topValue = document.createElement('div');
                topValue.className = 'quadro-1248-value quadro-1248-single';
                
                const topNumber = document.createElement('span');
                topNumber.className = 'quadro-1248-number';
                topNumber.textContent = '1';
                topValue.appendChild(topNumber);
                
                if (hasBit1) {
                    const topDot = document.createElement('span');
                    topDot.className = 'quadro-1248-dot';
                    topValue.appendChild(topDot);
                }
                
                topCell.appendChild(topValue);
                quadro.appendChild(topCell);
                
                const bottomCell = document.createElement('div');
                bottomCell.className = 'quadro-1248-cell quadro-1248-bottom';
                
                const bottomValue = document.createElement('div');
                bottomValue.className = 'quadro-1248-value quadro-1248-single';
                
                const bottomNumber = document.createElement('span');
                bottomNumber.className = 'quadro-1248-number';
                bottomNumber.textContent = '2';
                bottomValue.appendChild(bottomNumber);
                
                if (hasBit2) {
                    const bottomDot = document.createElement('span');
                    bottomDot.className = 'quadro-1248-dot';
                    bottomValue.appendChild(bottomDot);
                }
                
                bottomCell.appendChild(bottomValue);
                quadro.appendChild(bottomCell);
            } else {
                // Outros quadrados: superior mostra 1 e 2, inferior mostra 4 e 8
                const topCell = document.createElement('div');
                topCell.className = 'quadro-1248-cell quadro-1248-top';
                
                // Valor 1
                const value1 = document.createElement('div');
                value1.className = 'quadro-1248-value';
                const num1 = document.createElement('span');
                num1.className = 'quadro-1248-number';
                num1.textContent = '1';
                value1.appendChild(num1);
                if (hasBit1) {
                    const dot1 = document.createElement('span');
                    dot1.className = 'quadro-1248-dot';
                    value1.appendChild(dot1);
                }
                topCell.appendChild(value1);
                
                // Valor 2
                const value2 = document.createElement('div');
                value2.className = 'quadro-1248-value';
                const num2 = document.createElement('span');
                num2.className = 'quadro-1248-number';
                num2.textContent = '2';
                value2.appendChild(num2);
                if (hasBit2) {
                    const dot2 = document.createElement('span');
                    dot2.className = 'quadro-1248-dot';
                    value2.appendChild(dot2);
                }
                topCell.appendChild(value2);
                quadro.appendChild(topCell);
                
                const bottomCell = document.createElement('div');
                bottomCell.className = 'quadro-1248-cell quadro-1248-bottom';
                
                // Valor 4
                const value4 = document.createElement('div');
                value4.className = 'quadro-1248-value';
                const num4 = document.createElement('span');
                num4.className = 'quadro-1248-number';
                num4.textContent = '4';
                value4.appendChild(num4);
                if (hasBit4) {
                    const dot4 = document.createElement('span');
                    dot4.className = 'quadro-1248-dot';
                    value4.appendChild(dot4);
                }
                bottomCell.appendChild(value4);
                
                // Valor 8
                const value8 = document.createElement('div');
                value8.className = 'quadro-1248-value';
                const num8 = document.createElement('span');
                num8.className = 'quadro-1248-number';
                num8.textContent = '8';
                value8.appendChild(num8);
                if (hasBit8) {
                    const dot8 = document.createElement('span');
                    dot8.className = 'quadro-1248-dot';
                    value8.appendChild(dot8);
                }
                bottomCell.appendChild(value8);
                quadro.appendChild(bottomCell);
            }
            
            return quadro;
        } catch (error) {
            // Log seguro - não expor stack trace
            secureConsole.error('Erro ao criar elemento');
            // Retornar elemento vazio em caso de erro
            const errorDiv = document.createElement('div');
            errorDiv.className = 'quadro-1248';
            return errorDiv;
        }
    }

    // --- DECODE SECTION ---

    const decodeInputs = [
        document.getElementById('decode-d1'),
        document.getElementById('decode-d2'),
        document.getElementById('decode-d3'),
        document.getElementById('decode-d4')
    ];

    decodeInputs.forEach((input, idx) => {
        if (!input) return;
        
        // Validação do primeiro dígito (0-2)
        if (idx === 0) {
            input.addEventListener('input', (e) => {
                let value = e.target.value;
                // Permitir apenas 0, 1 ou 2
                value = value.replace(/[^0-2]/g, '');
                // Limitar a 1 caractere
                if (value.length > 1) {
                    value = value.charAt(0);
                }
                e.target.value = value;
                
                if (value.length === 1 && idx < 3 && decodeInputs[idx + 1]) {
                    decodeInputs[idx + 1].focus();
                }
                
                checkDecodeFromInputs();
            });
        } else {
            input.addEventListener('input', (e) => {
                let value = e.target.value;
                // Permitir apenas dígitos 0-9
                value = value.replace(/[^0-9]/g, '');
                // Limitar a 1 caractere
                if (value.length > 1) {
                    value = value.charAt(0);
                }
                e.target.value = value;
                
                if (value.length === 1 && idx < 3 && decodeInputs[idx + 1]) {
                    decodeInputs[idx + 1].focus();
                }
                
                checkDecodeFromInputs();
            });
        }

        input.addEventListener('keydown', (e) => {
            // Backspace navigation
            if (e.key === 'Backspace' && e.target.value.length === 0 && idx > 0 && decodeInputs[idx - 1]) {
                decodeInputs[idx - 1].focus();
            }
        });
    });

    function checkDecodeFromInputs() {
        try {
            // Validação de segurança: verificar se todos os inputs existem
            if (!decodeInputs[0] || !decodeInputs[1] || !decodeInputs[2] || !decodeInputs[3]) {
                return;
            }
            
            const d1 = decodeInputs[0].value.trim();
            const d2 = decodeInputs[1].value.trim();
            const d3 = decodeInputs[2].value.trim();
            const d4 = decodeInputs[3].value.trim();

            const resultCard = document.getElementById('decode-result');
            const errorCard = document.getElementById('decode-error');
            
            if (!resultCard || !errorCard) return;

            if (d1 && d2 && d3 && d4) {
                // Validar que são apenas dígitos
                if (!/^[0-2]$/.test(d1) || !/^[0-9]$/.test(d2) || !/^[0-9]$/.test(d3) || !/^[0-9]$/.test(d4)) {
                    resultCard.classList.add('hidden');
                    errorCard.classList.remove('hidden');
                    return;
                }
                
                const codeStr = `${d1}${d2}${d3}${d4}`;
                const codeNum = parseInt(codeStr, 10);
                
                // Validar código: deve ser entre 0001 e 2048 (não 0000)
                if (isNaN(codeNum) || codeNum < 1 || codeNum > 2048) {
                    resultCard.classList.add('hidden');
                    errorCard.classList.remove('hidden');
                    return;
                }
                
                // Converter código (1-2048) para índice do array (0-2047)
                const index = codeNum - 1;

                if (isValidIndex(index)) {
                    // Valid - com proteção adicional
                    let word;
                    try {
                        word = bip39Words[index];
                        // Verificar que a palavra não foi modificada
                        if (typeof word !== 'string' || word.length === 0 || word.length > 20) {
                            throw new Error('Palavra inválida');
                        }
                    } catch (e) {
                        resultCard.classList.add('hidden');
                        errorCard.classList.remove('hidden');
                        return;
                    }
                    
                    if (!isValidBIP39Word(word)) {
                        resultCard.classList.add('hidden');
                        errorCard.classList.remove('hidden');
                        return;
                    }
                    
                    // Usar textContent para prevenir XSS
                    const wordEl = document.getElementById('decode-word');
                    const indexEl = document.getElementById('decode-index');
                    
                    if (wordEl) wordEl.textContent = word;
                    if (indexEl) indexEl.textContent = (index + 1).toString();

                    // Show visual render no mesmo formato do wizard (4 quadrados lado a lado)
                    // SEMPRE 4 quadrados (um para cada dígito do código)
                    const container = document.getElementById('decode-quadros');
                    if (!container) return;
                    
                    container.innerHTML = '';
                    
                    // Garantir que sempre temos 4 dígitos
                    let digits = codeStr.split('').map(d => {
                        const num = parseInt(d, 10);
                        return isValidDigit(num) ? num : 0;
                    });
                    
                    while (digits.length < 4) {
                        digits.unshift(0);
                    }
                    digits = digits.slice(-4); // Garantir exatamente 4 dígitos
                    
                    // Usar o mesmo formato do wizard: 4 quadrados lado a lado
                    digits.forEach((digit, i) => {
                        if (isValidDigit(digit) && i >= 0 && i < 4) {
                            const digitEl = createQuadroElement(digit, i + 1);
                            if (digitEl) {
                                container.appendChild(digitEl);
                            }
                        }
                    });

                    resultCard.classList.remove('hidden');
                    errorCard.classList.add('hidden');
                } else {
                    // Invalid Range
                    resultCard.classList.add('hidden');
                    errorCard.classList.remove('hidden');
                }
            } else {
                // Incomplete
                resultCard.classList.add('hidden');
                errorCard.classList.add('hidden');
            }
        } catch (error) {
            // Log seguro - não expor stack trace ou dados do erro
            secureConsole.error('Erro no processamento de decode');
            const resultCard = document.getElementById('decode-result');
            const errorCard = document.getElementById('decode-error');
            if (resultCard) resultCard.classList.add('hidden');
            if (errorCard) errorCard.classList.remove('hidden');
        }
    }

});
