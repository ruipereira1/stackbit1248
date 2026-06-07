/**
 * Stackbit 1248 Tool - Main Application Logic
 * Security: Anti-XSS, Input Validation, Error Handling, Secure Logging
 */

function sanitizeForLog(data) {
  if (data === null || data === undefined) {
    return '[null]';
  }

  if (typeof data === 'string') {
    return data
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
      .replace(/[\r\n]/g, ' ')
      .substring(0, 200);
  }

  if (typeof data === 'object') {
    if (data instanceof Error) {
      return 'Error: ' + (data.message ? sanitizeForLog(data.message) : 'Unknown error');
    }
    return '[Object]';
  }

  return String(data).substring(0, 200);
}

const secureConsole = {
  log: function (...args) {
    if (typeof console !== 'undefined' && console.log) {
      console.log.apply(console, args.map(sanitizeForLog));
    }
  },
  warn: function (...args) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn.apply(console, args.map(sanitizeForLog));
    }
  },
  error: function (...args) {
    if (typeof console !== 'undefined' && console.error) {
      console.error.apply(console, args.map(function (arg) {
        if (arg instanceof Error) {
          return 'Error: ' + sanitizeForLog(arg.message || 'Unknown error');
        }
        return sanitizeForLog(arg);
      }));
    }
  }
};

function getFatalErrorMessage(key) {
  const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'pt-BR';
  const messages = {
    invalid: {
      'pt-BR': 'Erro crítico: dicionário BIP39 não carregado. Recarregue a página offline.',
      en: 'Critical error: BIP39 dictionary not loaded. Reload the page offline.'
    },
    incomplete: {
      'pt-BR': 'Erro crítico: dicionário BIP39 incompleto (esperado 2048 palavras).',
      en: 'Critical error: incomplete BIP39 dictionary (expected 2048 words).'
    }
  };
  const bucket = messages[key] || messages.invalid;
  return bucket[lang] || bucket['pt-BR'];
}

function showFatalError(key) {
  secureConsole.error(key === 'incomplete' ? 'Erro: Dicionário BIP39 incompleto' : 'Erro: Dicionário BIP39 inválido');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-banner';
  errorDiv.textContent = getFatalErrorMessage(key);
  document.body.appendChild(errorDiv);
}

function isValidBIP39Word(word) {
  if (typeof word !== 'string' || word.length === 0) return false;
  if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) return false;
  const normalized = word.toLowerCase().trim();
  if (!/^[a-z]+$/.test(normalized)) return false;
  try {
    return bip39Words.indexOf(normalized) !== -1;
  } catch (e) {
    return false;
  }
}

function isValidIndex(index) {
  if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) return false;
  return Number.isInteger(index) && index >= 0 && index < bip39Words.length;
}

function isValidDigit(digit) {
  return Number.isInteger(digit) && digit >= 0 && digit <= 9;
}

function isValidCode(code) {
  const num = parseInt(code, 10);
  return !isNaN(num) && num >= 1 && num <= 2048;
}

function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (typeof bip39Words === 'undefined' || !Array.isArray(bip39Words)) {
    showFatalError('invalid');
    return;
  }

  if (bip39Words.length !== 2048) {
    showFatalError('incomplete');
    return;
  }

  let wordsValid = true;
  try {
    const sampleSize = Math.min(5, bip39Words.length);
    for (let i = 0; i < sampleSize; i++) {
      if (typeof bip39Words[i] !== 'string' || !/^[a-z]+$/.test(bip39Words[i])) {
        wordsValid = false;
        break;
      }
    }
  } catch (e) {
    secureConsole.error('Erro: Validação de integridade falhou');
    wordsValid = true;
  }

  if (!wordsValid) {
    secureConsole.warn('Aviso: Algumas palavras podem estar inválidas');
  }

  const tabs = document.querySelectorAll('.tab');
  const encodeInput = document.getElementById('encode-input');
  const encodeSuggestions = document.getElementById('encode-suggestions');

  if (!encodeInput || !encodeSuggestions) {
    secureConsole.error('Erro: Elementos DOM não encontrados');
    return;
  }

  const decodeInputs = [
    document.getElementById('decode-d1'),
    document.getElementById('decode-d2'),
    document.getElementById('decode-d3'),
    document.getElementById('decode-d4')
  ];

  function clearEncodeState() {
    encodeInput.value = '';
    encodeSuggestions.classList.remove('show');
    clearElement(encodeSuggestions);
    const resultCard = document.getElementById('encode-result');
    if (resultCard) resultCard.classList.add('hidden');
    const wordEl = document.getElementById('encode-word');
    const indexEl = document.getElementById('encode-index');
    const codeEl = document.getElementById('encode-code');
    const quadros = document.getElementById('encode-quadros');
    if (wordEl) wordEl.textContent = '';
    if (indexEl) indexEl.textContent = '';
    if (codeEl) codeEl.textContent = '';
    if (quadros) clearElement(quadros);
  }

  function clearDecodeState() {
    decodeInputs.forEach(function (input) {
      if (input) input.value = '';
    });
    const resultCard = document.getElementById('decode-result');
    const errorCard = document.getElementById('decode-error');
    if (resultCard) resultCard.classList.add('hidden');
    if (errorCard) errorCard.classList.add('hidden');
    const wordEl = document.getElementById('decode-word');
    const indexEl = document.getElementById('decode-index');
    const container = document.getElementById('decode-quadros');
    if (wordEl) wordEl.textContent = '';
    if (indexEl) indexEl.textContent = '';
    if (container) clearElement(container);
  }

  function clearSensitiveState() {
    clearEncodeState();
    clearDecodeState();
  }

  function bindTap(el, handler) {
    if (!el) return;
    var handled = false;
    el.addEventListener('touchend', function (e) {
      handled = true;
      e.preventDefault();
      handler(e);
    }, { passive: false });
    el.addEventListener('click', function (e) {
      if (handled) {
        handled = false;
        return;
      }
      handler(e);
    });
  }

  function focusDecodeInput(idx) {
    if (!decodeInputs[idx]) return;
    window.setTimeout(function () {
      decodeInputs[idx].focus();
      if (decodeInputs[idx].select) {
        decodeInputs[idx].select();
      }
    }, 0);
  }

  document.addEventListener('stackbit:tabchange', function (event) {
    if (!event || !event.detail) {
      return;
    }
    var previousId = event.detail.previousId;
    var targetId = event.detail.targetId;
    if (previousId === 'encode' && targetId !== 'encode') {
      clearEncodeState();
    }
    if (previousId === 'decode' && targetId !== 'decode') {
      clearDecodeState();
    }
  });

  encodeInput.addEventListener('input', function (e) {
    try {
      let input = e.target.value;
      if (typeof input !== 'string') {
        input = '';
      }
      input = input.toLowerCase().replace(/[^a-z]/g, '').trim();
      e.target.value = input;

      const resultCard = document.getElementById('encode-result');

      if (input.length === 0) {
        encodeSuggestions.classList.remove('show');
        resultCard.classList.add('hidden');
        return;
      }

      if (!/^[a-z]+$/.test(input)) {
        encodeSuggestions.classList.remove('show');
        resultCard.classList.add('hidden');
        return;
      }

      let exactIndex = -1;
      try {
        exactIndex = bip39Words.indexOf(input);
      } catch (e) {
        secureConsole.error('Erro na busca');
        exactIndex = -1;
      }

      if (isValidIndex(exactIndex)) {
        showEncodeResult(input, exactIndex);
        encodeSuggestions.classList.remove('show');
        return;
      }

      const matches = [];
      try {
        for (let i = 0; i < bip39Words.length && matches.length < 10; i++) {
          const word = bip39Words[i];
          if (typeof word === 'string' && /^[a-z]+$/.test(word) && word.startsWith(input)) {
            matches.push({ word: word, index: i });
          }
        }
      } catch (e) {
        secureConsole.error('Erro ao buscar sugestões');
      }

      if (matches.length > 0) {
        clearElement(encodeSuggestions);

        matches.forEach(function (item) {
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

          bindTap(suggestionDiv, function () {
            const word = suggestionDiv.getAttribute('data-word');
            const index = parseInt(suggestionDiv.getAttribute('data-index'), 10);
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
      secureConsole.error('Erro no processamento de input');
      encodeSuggestions.classList.remove('show');
      const resultCard = document.getElementById('encode-result');
      if (resultCard) resultCard.classList.add('hidden');
    }
  });

  document.addEventListener('click', function (e) {
    try {
      if (!e || !e.target || !e.target.closest) return;
      if (!e.target.closest('.input-group')) {
        encodeSuggestions.classList.remove('show');
      }
    } catch (error) {
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
      if (!isValidBIP39Word(word) || !isValidIndex(index)) {
        secureConsole.error('Erro: Dados inválidos');
        return;
      }

      const resultCard = document.getElementById('encode-result');
      if (!resultCard) return;

      const code = formatIndex(index);
      const wordEl = document.getElementById('encode-word');
      const indexEl = document.getElementById('encode-index');
      const codeEl = document.getElementById('encode-code');

      if (wordEl) wordEl.textContent = word;
      if (indexEl) indexEl.textContent = (index + 1).toString();
      if (codeEl) codeEl.textContent = code;

      const container = document.getElementById('encode-quadros');
      if (!container) return;

      clearElement(container);
      renderQuadros(container, code);
      resultCard.classList.remove('hidden');
    } catch (error) {
      secureConsole.error('Erro ao exibir resultado');
    }
  }

  function renderQuadros(container, codeStr) {
    const digits = codeStr.split('').map(function (d) {
      const num = parseInt(d, 10);
      return isValidDigit(num) ? num : 0;
    }).slice(-4);

    while (digits.length < 4) {
      digits.unshift(0);
    }

    digits.forEach(function (digit, i) {
      if (isValidDigit(digit)) {
        const digitEl = createQuadroElement(digit, i + 1);
        if (digitEl) {
          container.appendChild(digitEl);
        }
      }
    });
  }

  function createQuadroElement(digit, quadroNum) {
    try {
      if (!isValidDigit(digit)) {
        digit = 0;
      }
      if (!Number.isInteger(quadroNum) || quadroNum < 1 || quadroNum > 4) {
        quadroNum = 1;
      }

      const isFirstQuadro = quadroNum === 1;
      const hasBit1 = (digit & 1) !== 0;
      const hasBit2 = (digit & 2) !== 0;
      const hasBit4 = (digit & 4) !== 0;
      const hasBit8 = (digit & 8) !== 0;

      const quadro = document.createElement('div');
      quadro.className = 'quadro-1248';
      quadro.setAttribute('data-quadro', quadroNum.toString());
      quadro.setAttribute('data-digit', digit.toString());

      if (isFirstQuadro) {
        const topCellEl = document.createElement('div');
        topCellEl.className = 'quadro-1248-cell quadro-1248-top';

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

        topCellEl.appendChild(topValue);
        quadro.appendChild(topCellEl);

        const bottomCellEl = document.createElement('div');
        bottomCellEl.className = 'quadro-1248-cell quadro-1248-bottom';

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

        bottomCellEl.appendChild(bottomValue);
        quadro.appendChild(bottomCellEl);
      } else {
        const topCellEl = document.createElement('div');
        topCellEl.className = 'quadro-1248-cell quadro-1248-top';

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
        topCellEl.appendChild(value1);

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
        topCellEl.appendChild(value2);
        quadro.appendChild(topCellEl);

        const bottomCellEl = document.createElement('div');
        bottomCellEl.className = 'quadro-1248-cell quadro-1248-bottom';

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
        bottomCellEl.appendChild(value4);

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
        bottomCellEl.appendChild(value8);
        quadro.appendChild(bottomCellEl);
      }

      return quadro;
    } catch (error) {
      secureConsole.error('Erro ao criar elemento');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'quadro-1248';
      return errorDiv;
    }
  }

  function sanitizeDecodeDigit(value, idx) {
    const pattern = idx === 0 ? /[^0-2]/g : /[^0-9]/g;
    return value.replace(pattern, '').charAt(0) || '';
  }

  function applyDecodeDigits(raw) {
    const digits = String(raw).replace(/\D/g, '').slice(0, 4);
    if (!digits.length) return;

    decodeInputs.forEach(function (input, i) {
      if (!input) return;
      input.value = sanitizeDecodeDigit(digits.charAt(i) || '', i);
    });

    const focusIdx = Math.min(Math.max(digits.length - 1, 0), 3);
    focusDecodeInput(focusIdx);
    checkDecodeFromInputs();
  }

  function handleDecodeInput(e, idx) {
    let value = e.target.value;

    if (value.length > 1) {
      applyDecodeDigits(value);
      return;
    }

    value = sanitizeDecodeDigit(value, idx);
    e.target.value = value;

    if (value.length === 1 && idx < 3) {
      focusDecodeInput(idx + 1);
    }

    checkDecodeFromInputs();
  }

  decodeInputs.forEach(function (input, idx) {
    if (!input) return;

    input.addEventListener('input', function (e) {
      handleDecodeInput(e, idx);
    });

    input.addEventListener('keyup', function (e) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        return;
      }
      handleDecodeInput(e, idx);
    });

    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const clipboard = e.clipboardData || window.clipboardData;
      if (!clipboard) return;
      applyDecodeDigits(clipboard.getData('text'));
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && e.target.value.length === 0 && idx > 0) {
        focusDecodeInput(idx - 1);
      }
    });
  });

  function checkDecodeFromInputs() {
    try {
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
        if (!/^[0-2]$/.test(d1) || !/^[0-9]$/.test(d2) || !/^[0-9]$/.test(d3) || !/^[0-9]$/.test(d4)) {
          resultCard.classList.add('hidden');
          errorCard.classList.remove('hidden');
          return;
        }

        const codeStr = d1 + d2 + d3 + d4;
        const codeNum = parseInt(codeStr, 10);

        if (!isValidCode(codeStr)) {
          resultCard.classList.add('hidden');
          errorCard.classList.remove('hidden');
          return;
        }

        const index = codeNum - 1;

        if (isValidIndex(index)) {
          let word;
          try {
            word = bip39Words[index];
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

          const wordEl = document.getElementById('decode-word');
          const indexEl = document.getElementById('decode-index');

          if (wordEl) wordEl.textContent = word;
          if (indexEl) indexEl.textContent = (index + 1).toString();

          const container = document.getElementById('decode-quadros');
          if (!container) return;

          clearElement(container);
          renderQuadros(container, codeStr);

          resultCard.classList.remove('hidden');
          errorCard.classList.add('hidden');
        } else {
          resultCard.classList.add('hidden');
          errorCard.classList.remove('hidden');
        }
      } else {
        resultCard.classList.add('hidden');
        errorCard.classList.add('hidden');
      }
    } catch (error) {
      secureConsole.error('Erro no processamento de decode');
      const resultCard = document.getElementById('decode-result');
      const errorCard = document.getElementById('decode-error');
      if (resultCard) resultCard.classList.add('hidden');
      if (errorCard) errorCard.classList.remove('hidden');
    }
  }
});
