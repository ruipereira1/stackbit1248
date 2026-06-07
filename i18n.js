/**
 * Sistema de Internacionalização (i18n)
 * Suporta Português (pt-BR) e Inglês (en)
 */

const translations = {
    'pt-BR': {
        // Header
        subtitle: 'Ferramenta BIP39 para Backup em Metal',
        
        // Tabs
        encode: 'Encode',
        decode: 'Decode',
        recovery: 'Recovery',
        tutorial: 'Tutorial',
    about: 'Sobre',
    
    // Encode Section
        encodeTitle: 'Encode: Palavra → Código 1248',
        encodeDescription: 'Digite uma palavra BIP39 para ver seu código',
        encodeLabel: 'Palavra BIP39',
        encodePlaceholder: 'Ex: abandon, zoo, lounge...',
        encodeIndex: 'Índice:',
        encodeCode: 'Código 1248:',
        encodeHint: 'Marque os pontos indicados (●) com o punção',
        
        // Decode Section
        decodeTitle: 'Decode: Código 1248 → Palavra',
        decodeDescription: 'Digite o código de 4 dígitos para revelar a palavra',
        decodeLabel: 'Código 1248 (0001-2048)',
        decodeIndex: 'Índice:',
        decodeError: 'Código inválido. Use valores entre 0001 e 2048.',
        
        // Recovery Section
        recoveryTitle: 'Recuperação de Seed Física',
        recoveryDescription: 'Como revelar as marcações da sua Stackbit física',
        recoveryGuide: 'Guia Completo de Recuperação',
        recoveryGuideDesc: 'Baixe o guia completo em PDF com instruções detalhadas e template para recuperação:',
        downloadPDF: 'Baixar PDF',
        viewPDF: 'Visualizar PDF',
        recoveryMethod1: 'Método 1: Usando Régua',
        recoveryMethod1Step1: 'Coloque sua Stackbit no local indicado na folha de recuperação',
        recoveryMethod1Step2: 'Utilizando uma régua ou algo reto, trace as linhas seguindo a indicação',
        recoveryMethod1Step3: 'As linhas traçadas revelarão as marcações feitas com o punção',
        recoveryMethod2: 'Método 2: Usando Giz de Cera',
        recoveryMethod2Step1: 'Coloque sua Stackbit embaixo da folha, dentro do local indicado',
        recoveryMethod2Step2: 'Utilizando um giz de cera, lápis ou carvão, rabisque em cima da carteira',
        recoveryMethod2Step3: 'Isso revelará as marcações feitas com o punção',
        recoveryTip: 'Dica:',
        recoveryTipText: 'Prender a carteira com uma fita facilita o trabalho.',
        recoveryImportant: 'Importante:',
        recoveryImportant1: 'Use uma folha de recuperação oficial ou imprima o template',
        recoveryImportant2: 'Certifique-se de que a Stackbit está bem posicionada',
        recoveryImportant3: 'Seja cuidadoso para não danificar a carteira durante o processo',
        recoveryImportant4: 'Após revelar os códigos, use a função Decode para converter em palavras BIP39',
        recoveryTipsTitle: 'Dicas de Recuperação',
        recoveryTips1: 'Use uma superfície plana e estável',
        recoveryTips2: 'Certifique-se de ter boa iluminação',
        recoveryTips3: 'Seja paciente e cuidadoso durante o processo',
        recoveryTips4: 'Verifique cada código digitando no campo Decode',
        recoveryTips5: 'Anote as palavras BIP39 em um local seguro após a recuperação',
        
        // Tutorial Section
        tutorialTitle: 'Tutorial: Como Gravar sua Stackbit 1248',
        tutorialDescription: 'Passo a passo completo baseado no',
        tutorialOfficial: 'tutorial oficial',
        tutorialOfflineNote: 'Nota:',
        tutorialOfflineText: 'Links externos não funcionam offline. Use a função Encode/Decode desta ferramenta que funciona 100% offline.',
        tutorialSecurity: 'Segurança em Primeiro Lugar:',
        tutorialSecurityText: 'Antes de começar, certifique-se de que você não está sob os olhares de nenhum tipo de câmera ou microfone (notebook, smartphone, câmeras de segurança, etc.)',
        tutorialStep1: 'Passo 1: Anotar as Palavras',
        tutorialStep1Text: 'Anote suas 12 ou 24 palavras BIP39 em um papel. Mantenha este papel seguro e destrua-o após gravar na Stackbit.',
        tutorialStep2: 'Passo 2: Encontrar os Números Correspondentes',
        tutorialStep2Text1: 'Acesse a',
        tutorialStep2Text2: 'lista oficial de palavras BIP39',
        tutorialStep2Text3: 'no GitHub do Bitcoin',
        tutorialStep2Text4: 'Procure pelas suas palavras e anote o número correspondente ao lado de cada uma delas',
        tutorialStep2Example: 'Exemplo:',
        tutorialStep2ExampleText: 'LOUNGE – 1059',
        tutorialStep2Warning: 'Importante:',
        tutorialStep2WarningText: 'Não utilize a ferramenta buscar/localizar do seu navegador. Role a página até encontrar a palavra manualmente para maior segurança.',
        tutorialStep3: 'Passo 3: Entender o Sistema de Quadros',
        tutorialStep3Text1: 'Cada palavra tem 4 quadros que correspondem a 4 números:',
        tutorialStep3Quadro1: 'Quadro 1:',
        tutorialStep3Quadro1Text: '0-2 (primeiro dígito)',
        tutorialStep3Quadro2: 'Quadro 2:',
        tutorialStep3Quadro2Text: '0-9 (segundo dígito)',
        tutorialStep3Quadro3: 'Quadro 3:',
        tutorialStep3Quadro3Text: '0-9 (terceiro dígito)',
        tutorialStep3Quadro4: 'Quadro 4:',
        tutorialStep3Quadro4Text: '0-9 (quarto dígito)',
        tutorialStep3Text2: 'Com essa combinação, você consegue criar qualquer número dentre os 2048 possíveis da lista de palavras do BIP39.',
        tutorialStep3How: 'Como marcar:',
        tutorialStep3HowText: 'Você pode marcar 1 número, a soma de 2 ou 3 números, ou nenhum número para 0 (zero).',
        tutorialStep3Example1: 'Exemplo: Palavra 1059 (LOUNGE)',
        tutorialStep3Example1Quadro1: 'Quadro 1: 1 (marque o ponto 1)',
        tutorialStep3Example1Quadro2: 'Quadro 2: 0 (não marque nada)',
        tutorialStep3Example1Quadro3: 'Quadro 3: 5 (marque os pontos 1 + 4)',
        tutorialStep3Example1Quadro4: 'Quadro 4: 9 (marque os pontos 1 + 8)',
        tutorialStep3Example2: 'Exemplo: Diferença entre 0022 e 0220',
        tutorialStep3Example2Word1: 'Palavra 0022:',
        tutorialStep3Example2Word1Quadro1: 'Quadro 1: 0 (não marque nada)',
        tutorialStep3Example2Word1Quadro2: 'Quadro 2: 0 (não marque nada)',
        tutorialStep3Example2Word1Quadro3: 'Quadro 3: 2 (marque o ponto 2)',
        tutorialStep3Example2Word1Quadro4: 'Quadro 4: 2 (marque o ponto 2)',
        tutorialStep3Example2Word2: 'Palavra 0220:',
        tutorialStep3Example2Word2Quadro1: 'Quadro 1: 0 (não marque nada)',
        tutorialStep3Example2Word2Quadro2: 'Quadro 2: 2 (marque o ponto 2)',
        tutorialStep3Example2Word2Quadro3: 'Quadro 3: 2 (marque o ponto 2)',
        tutorialStep3Example2Word2Quadro4: 'Quadro 4: 0 (não marque nada)',
        tutorialStep4: 'Passo 4: Gravar na Stackbit',
        tutorialStep4Text1: 'Marque com uma caneta permanente ou lápis na sua carteira',
        tutorialStep4Text2: 'Cheque as palavras cuidadosamente',
        tutorialStep4Text3: 'Bata com o punção utilizando um martelo',
        tutorialStep4Text4: 'Não aplique força excessiva à pancada',
        tutorialStep4Text5: 'Remova o adesivo',
        tutorialStep4Text6: 'Queime o adesivo para destruir qualquer rastro',
        tutorialStep4Text7: 'Armazene a sua Stackbit 1248 em um local seguro',
        tutorialStep4Tip: 'Dica:',
        tutorialStep4TipText: 'Se for enterrar a sua carteira, considere embrulhá-la em plástico para proteção adicional.',
        tutorialResources: 'Recursos Adicionais',
        tutorialResources1: 'Tutorial oficial no site Stackbit',
        tutorialResources1Desc: '- Inclui vídeo tutorial',
        tutorialResources2: 'Lista oficial de palavras BIP39',
        tutorialResources3: 'Use a função',
        tutorialResources3Encode: 'Encode',
        tutorialResources3Text: 'nesta ferramenta para verificar os códigos antes de gravar',
        tutorialResources4: 'Use a função',
        tutorialResources4Decode: 'Decode',
        tutorialResources4Text: 'para verificar os códigos após gravar',
        
        // About Section
        aboutTitle: 'Sobre a Stackbit 1248',
        aboutDescription: 'Informações sobre a carteira física Stackbit 1248',
        specsTitle: '📐 Especificações Técnicas',
        specDimensions: 'Dimensões:',
        specWeight: 'Peso:',
        specMaterial: 'Material:',
        aboutInfoTitle: 'ℹ️ Informações',
        aboutInfoText1: 'A Stackbit 1248 é uma carteira física de aço inoxidável projetada para armazenar seed phrases BIP39 de forma segura e permanente.',
        aboutInfoText2: 'O sistema de codificação 1248 permite gravar até 24 palavras BIP39 usando apenas marcações com punção, sem necessidade de escrever as palavras diretamente.',
        featuresTitle: '✨ Características',
        feature1: 'Resistente a água, fogo e corrosão',
        feature2: 'Adesivo removível para maior segurança',
        feature3: 'Sistema de codificação 1248 exclusivo',
        feature4: 'Compatível com todas as carteiras BIP39',
        feature5: 'Fabricada em aço inoxidável 304 de alta qualidade',
        aboutWarningTitle: 'Importante:',
        aboutWarningText: 'Esta ferramenta web é apenas para auxiliar na codificação e decodificação. A carteira física Stackbit 1248 deve ser adquirida separadamente através do site oficial.',
        contributeTitle: '🤝 Contribuir com o Projeto',
        contributeText: 'Este é um projeto open source. Contribuições são bem-vindas!',
        viewOnGitHub: 'Ver no GitHub',
        reportIssue: 'Reportar Bug',
        contributeGuide: 'Guia de Contribuição',
        
        // Footer
        viewSourceCode: 'Ver código-fonte no GitHub',
        footerWarning: '⚠️ Use apenas offline. Nunca compartilhe sua seed.',
        footerCopyright: 'Stackbit 1248 Tool - BIP39 Compatible',
        footerCredits: 'Inspirado no sistema',
        footerCreditsLink: 'Stackbit Metalwallet',
        footerCreditsText: '| Todas as informações sobre o sistema 1248 foram baseadas no conteúdo disponível em',
        footerCreditsLink2: 'stackbit.me'
    },
    'en': {
        // Header
        subtitle: 'BIP39 Tool for Metal Backup',
        
        // Tabs
        encode: 'Encode',
        decode: 'Decode',
        recovery: 'Recovery',
        tutorial: 'Tutorial',
    about: 'About',
    
    // Encode Section
        encodeTitle: 'Encode: Word → 1248 Code',
        encodeDescription: 'Type a BIP39 word to see its code',
        encodeLabel: 'BIP39 Word',
        encodePlaceholder: 'Ex: abandon, zoo, lounge...',
        encodeIndex: 'Index:',
        encodeCode: '1248 Code:',
        encodeHint: 'Mark the indicated points (●) with the punch',
        
        // Decode Section
        decodeTitle: 'Decode: 1248 Code → Word',
        decodeDescription: 'Type the 4-digit code to reveal the word',
        decodeLabel: '1248 Code (0001-2048)',
        decodeIndex: 'Index:',
        decodeError: 'Invalid code. Use values between 0001 and 2048.',
        
        // Recovery Section
        recoveryTitle: 'Physical Seed Recovery',
        recoveryDescription: 'How to reveal the markings on your physical Stackbit',
        recoveryGuide: 'Complete Recovery Guide',
        recoveryGuideDesc: 'Download the complete PDF guide with detailed instructions and recovery template:',
        downloadPDF: 'Download PDF',
        viewPDF: 'View PDF',
        recoveryMethod1: 'Method 1: Using Ruler',
        recoveryMethod1Step1: 'Place your Stackbit in the indicated location on the recovery sheet',
        recoveryMethod1Step2: 'Using a ruler or something straight, draw lines following the indication',
        recoveryMethod1Step3: 'The drawn lines will reveal the markings made with the punch',
        recoveryMethod2: 'Method 2: Using Crayon',
        recoveryMethod2Step1: 'Place your Stackbit under the sheet, inside the indicated location',
        recoveryMethod2Step2: 'Using a crayon, pencil or charcoal, scribble on top of the wallet',
        recoveryMethod2Step3: 'This will reveal the markings made with the punch',
        recoveryTip: 'Tip:',
        recoveryTipText: 'Taping the wallet makes the work easier.',
        recoveryImportant: 'Important:',
        recoveryImportant1: 'Use an official recovery sheet or print the template',
        recoveryImportant2: 'Make sure the Stackbit is well positioned',
        recoveryImportant3: 'Be careful not to damage the wallet during the process',
        recoveryImportant4: 'After revealing the codes, use the Decode function to convert to BIP39 words',
        recoveryTipsTitle: 'Recovery Tips',
        recoveryTips1: 'Use a flat and stable surface',
        recoveryTips2: 'Make sure you have good lighting',
        recoveryTips3: 'Be patient and careful during the process',
        recoveryTips4: 'Verify each code by typing in the Decode field',
        recoveryTips5: 'Write down the BIP39 words in a safe place after recovery',
        
        // Tutorial Section
        tutorialTitle: 'Tutorial: How to Engrave your Stackbit 1248',
        tutorialDescription: 'Complete step-by-step based on the',
        tutorialOfficial: 'official tutorial',
        tutorialOfflineNote: 'Note:',
        tutorialOfflineText: 'External links do not work offline. Use the Encode/Decode function of this tool which works 100% offline.',
        tutorialSecurity: 'Security First:',
        tutorialSecurityText: 'Before starting, make sure you are not under the eyes of any type of camera or microphone (laptop, smartphone, security cameras, etc.)',
        tutorialStep1: 'Step 1: Write Down the Words',
        tutorialStep1Text: 'Write down your 12 or 24 BIP39 words on paper. Keep this paper safe and destroy it after engraving on the Stackbit.',
        tutorialStep2: 'Step 2: Find the Corresponding Numbers',
        tutorialStep2Text1: 'Access the',
        tutorialStep2Text2: 'official BIP39 word list',
        tutorialStep2Text3: 'on Bitcoin GitHub',
        tutorialStep2Text4: 'Search for your words and write down the corresponding number next to each one',
        tutorialStep2Example: 'Example:',
        tutorialStep2ExampleText: 'LOUNGE – 1059',
        tutorialStep2Warning: 'Important:',
        tutorialStep2WarningText: 'Do not use the browser search/find tool. Scroll the page until you find the word manually for greater security.',
        tutorialStep3: 'Step 3: Understand the Frame System',
        tutorialStep3Text1: 'Each word has 4 frames that correspond to 4 numbers:',
        tutorialStep3Quadro1: 'Frame 1:',
        tutorialStep3Quadro1Text: '0-2 (first digit)',
        tutorialStep3Quadro2: 'Frame 2:',
        tutorialStep3Quadro2Text: '0-9 (second digit)',
        tutorialStep3Quadro3: 'Frame 3:',
        tutorialStep3Quadro3Text: '0-9 (third digit)',
        tutorialStep3Quadro4: 'Frame 4:',
        tutorialStep3Quadro4Text: '0-9 (fourth digit)',
        tutorialStep3Text2: 'With this combination, you can create any number among the 2048 possible from the BIP39 word list.',
        tutorialStep3How: 'How to mark:',
        tutorialStep3HowText: 'You can mark 1 number, the sum of 2 or 3 numbers, or no number for 0 (zero).',
        tutorialStep3Example1: 'Example: Word 1059 (LOUNGE)',
        tutorialStep3Example1Quadro1: 'Frame 1: 1 (mark point 1)',
        tutorialStep3Example1Quadro2: 'Frame 2: 0 (mark nothing)',
        tutorialStep3Example1Quadro3: 'Frame 3: 5 (mark points 1 + 4)',
        tutorialStep3Example1Quadro4: 'Frame 4: 9 (mark points 1 + 8)',
        tutorialStep3Example2: 'Example: Difference between 0022 and 0220',
        tutorialStep3Example2Word1: 'Word 0022:',
        tutorialStep3Example2Word1Quadro1: 'Frame 1: 0 (mark nothing)',
        tutorialStep3Example2Word1Quadro2: 'Frame 2: 0 (mark nothing)',
        tutorialStep3Example2Word1Quadro3: 'Frame 3: 2 (mark point 2)',
        tutorialStep3Example2Word1Quadro4: 'Frame 4: 2 (mark point 2)',
        tutorialStep3Example2Word2: 'Word 0220:',
        tutorialStep3Example2Word2Quadro1: 'Frame 1: 0 (mark nothing)',
        tutorialStep3Example2Word2Quadro2: 'Frame 2: 2 (mark point 2)',
        tutorialStep3Example2Word2Quadro3: 'Frame 3: 2 (mark point 2)',
        tutorialStep3Example2Word2Quadro4: 'Frame 4: 0 (mark nothing)',
        tutorialStep4: 'Step 4: Engrave on Stackbit',
        tutorialStep4Text1: 'Mark with a permanent pen or pencil on your wallet',
        tutorialStep4Text2: 'Check the words carefully',
        tutorialStep4Text3: 'Hit with the punch using a hammer',
        tutorialStep4Text4: 'Do not apply excessive force to the hit',
        tutorialStep4Text5: 'Remove the sticker',
        tutorialStep4Text6: 'Burn the sticker to destroy any trace',
        tutorialStep4Text7: 'Store your Stackbit 1248 in a safe place',
        tutorialStep4Tip: 'Tip:',
        tutorialStep4TipText: 'If you are going to bury your wallet, consider wrapping it in plastic for additional protection.',
        tutorialResources: 'Additional Resources',
        tutorialResources1: 'Official tutorial on Stackbit website',
        tutorialResources1Desc: '- Includes video tutorial',
        tutorialResources2: 'Official BIP39 word list',
        tutorialResources3: 'Use the',
        tutorialResources3Encode: 'Encode',
        tutorialResources3Text: 'function in this tool to verify codes before engraving',
        tutorialResources4: 'Use the',
        tutorialResources4Decode: 'Decode',
        tutorialResources4Text: 'function to verify codes after engraving',
        
        // About Section
        aboutTitle: 'About Stackbit 1248',
        aboutDescription: 'Information about the physical Stackbit 1248 wallet',
        specsTitle: '📐 Technical Specifications',
        specDimensions: 'Dimensions:',
        specWeight: 'Weight:',
        specMaterial: 'Material:',
        aboutInfoTitle: 'ℹ️ Information',
        aboutInfoText1: 'The Stackbit 1248 is a physical stainless steel wallet designed to store BIP39 seed phrases securely and permanently.',
        aboutInfoText2: 'The 1248 encoding system allows engraving up to 24 BIP39 words using only punch markings, without the need to write words directly.',
        featuresTitle: '✨ Features',
        feature1: 'Resistant to water, fire and corrosion',
        feature2: 'Removable sticker for enhanced security',
        feature3: 'Exclusive 1248 encoding system',
        feature4: 'Compatible with all BIP39 wallets',
        feature5: 'Made from high-quality 304 stainless steel',
        aboutWarningTitle: 'Important:',
        aboutWarningText: 'This web tool is only to assist with encoding and decoding. The physical Stackbit 1248 wallet must be purchased separately through the official website.',
        contributeTitle: '🤝 Contribute to the Project',
        contributeText: 'This is an open source project. Contributions are welcome!',
        viewOnGitHub: 'View on GitHub',
        reportIssue: 'Report Bug',
        contributeGuide: 'Contributing Guide',
        
        // Footer
        viewSourceCode: 'View source code on GitHub',
        footerWarning: 'Use offline only. Never share your seed.',
        footerCopyright: 'Stackbit 1248 Tool - BIP39 Compatible',
        footerCredits: 'Inspired by the',
        footerCreditsLink: 'Stackbit Metalwallet',
        footerCreditsText: 'system | All information about the 1248 system was based on content available at',
        footerCreditsLink2: 'stackbit.me'
    }
};

// Função para obter o idioma atual
function getCurrentLanguage() {
    try {
        const saved = localStorage.getItem('stackbit-language');
        if (saved && (saved === 'pt-BR' || saved === 'en')) {
            return saved;
        }
    } catch (e) {
        // localStorage pode falhar em modo privado ou file://
    }
    // Detectar idioma do navegador
    const browserLang = (navigator.language || navigator.userLanguage || 'en');
    return browserLang.startsWith('pt') ? 'pt-BR' : 'en';
}

// Função para definir o idioma
function setLanguage(lang) {
    if (lang !== 'pt-BR' && lang !== 'en') return;
    try {
        localStorage.setItem('stackbit-language', lang);
    } catch (e) {
        // localStorage pode falhar em modo privado ou file://
    }
    document.documentElement.lang = lang;
    updatePageLanguage(lang);
}

// Função para atualizar o texto da página
function updatePageLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Atualizar elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } else if (el.tagName === 'A' && el.hasAttribute('href')) {
                // Para links, manter href mas atualizar texto
                const textNode = el.childNodes[0];
                if (textNode && textNode.nodeType === 3) {
                    textNode.textContent = t[key];
                } else {
                    el.textContent = t[key];
                }
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    // Atualizar elementos específicos sem data-i18n
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && !subtitle.hasAttribute('data-i18n')) {
        subtitle.textContent = t.subtitle;
    }
    
    // Atualizar tabs
    document.querySelectorAll('.tab').forEach(tab => {
        const tabType = tab.getAttribute('data-tab');
        const icon = tab.querySelector('.tab-icon');
        const iconHTML = icon ? icon.outerHTML : '';
        
        if (tabType === 'encode' && t.encode) {
            const span = tab.querySelector('span[data-i18n="encode"]');
            if (span) span.textContent = t.encode;
        } else if (tabType === 'decode' && t.decode) {
            const span = tab.querySelector('span[data-i18n="decode"]');
            if (span) span.textContent = t.decode;
        } else if (tabType === 'recovery' && t.recovery) {
            const span = tab.querySelector('span[data-i18n="recovery"]');
            if (span) span.textContent = t.recovery;
        } else if (tabType === 'tutorial' && t.tutorial) {
            const span = tab.querySelector('span[data-i18n="tutorial"]');
            if (span) span.textContent = t.tutorial;
        } else if (tabType === 'about' && t.about) {
            const span = tab.querySelector('span[data-i18n="about"]');
            if (span) span.textContent = t.about;
        }
    });
    
    // Atualizar seções Recovery, Tutorial e About (conteúdo complexo)
    updateTutorialHeader(t);
    updateRecoverySection(t);
    updateTutorialSection(t);
    updateAboutSection(t);
    updateFooter(t);
}

// Helper: criar elemento <a> de forma segura (sem innerHTML)
function createSafeLink(href, text, target) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    a.target = target || '_blank';
    a.rel = 'noopener noreferrer';
    return a;
}

// Helper: definir conteúdo de um elemento com prefixo de emoji + texto (sem innerHTML)
function setTextWithEmoji(el, emoji, text) {
    el.textContent = emoji + ' ' + text;
}

// Helper: definir conteúdo com <strong> + texto (sem innerHTML)
function setStrongText(el, strongText, restText) {
    el.textContent = '';
    const strong = document.createElement('strong');
    strong.textContent = strongText;
    el.appendChild(strong);
    el.appendChild(document.createTextNode(' ' + restText));
}

// Helper: atualizar botão PDF preservando o ícone (sem innerHTML)
function updatePdfButton(btn, text) {
    if (!btn) return;
    const icon = btn.querySelector('.pdf-icon');
    const iconText = icon ? icon.textContent : '';
    btn.textContent = '';
    if (iconText) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'pdf-icon';
        iconSpan.textContent = iconText;
        btn.appendChild(iconSpan);
        btn.appendChild(document.createTextNode(' ' + text));
    } else {
        btn.textContent = text;
    }
}

function updateTutorialHeader(t) {
  const headerDesc = document.querySelector('#tutorial .section-header p');
  if (!headerDesc) return;
  headerDesc.textContent = '';
  headerDesc.appendChild(document.createTextNode(t.tutorialDescription + ' '));
  headerDesc.appendChild(createSafeLink(
    'https://stackbit.me/tutorial-stackbit-1248/',
    t.tutorialOfficial
  ));

  const offlineNote = document.querySelector('#tutorial .offline-note');
  if (offlineNote) {
    offlineNote.textContent = '';
    const noteStrong = document.createElement('strong');
    noteStrong.textContent = 'ℹ️ ' + t.tutorialOfflineNote;
    offlineNote.appendChild(noteStrong);
    offlineNote.appendChild(document.createTextNode(' ' + t.tutorialOfflineText));
  }
}

// Função para atualizar seção Recovery
function updateRecoverySection(t) {
    const recoveryGuide = document.querySelector('#recovery .recovery-pdf-section h3');
    if (recoveryGuide) setTextWithEmoji(recoveryGuide, '📄', t.recoveryGuide);

    const recoveryGuideDesc = document.querySelector('#recovery .recovery-pdf-section p');
    if (recoveryGuideDesc) recoveryGuideDesc.textContent = t.recoveryGuideDesc;

    updatePdfButton(document.querySelector('#recovery .btn-pdf:first-child'), t.downloadPDF);
    updatePdfButton(document.querySelector('#recovery .btn-pdf.btn-pdf-view'), t.viewPDF);

    // Métodos de recuperação
    const method1 = document.querySelector('#recovery .recovery-method:first-of-type h3');
    if (method1) method1.textContent = t.recoveryMethod1;

    const method1Steps = document.querySelectorAll('#recovery .recovery-method:first-of-type li');
    if (method1Steps.length >= 3) {
        method1Steps[0].textContent = t.recoveryMethod1Step1;
        method1Steps[1].textContent = t.recoveryMethod1Step2;
        method1Steps[2].textContent = t.recoveryMethod1Step3;
    }

    const method2 = document.querySelector('#recovery .recovery-method:last-of-type h3');
    if (method2) method2.textContent = t.recoveryMethod2;

    const method2Steps = document.querySelectorAll('#recovery .recovery-method:last-of-type li');
    if (method2Steps.length >= 3) {
        method2Steps[0].textContent = t.recoveryMethod2Step1;
        method2Steps[1].textContent = t.recoveryMethod2Step2;
        method2Steps[2].textContent = t.recoveryMethod2Step3;
    }

    const recoveryNote = document.querySelector('#recovery .recovery-note');
    if (recoveryNote) setStrongText(recoveryNote, t.recoveryTip, t.recoveryTipText);

    const recoveryWarning = document.querySelector('#recovery .recovery-warning strong');
    if (recoveryWarning) recoveryWarning.textContent = t.recoveryImportant;

    const recoveryWarningItems = document.querySelectorAll('#recovery .recovery-warning li');
    if (recoveryWarningItems.length >= 4) {
        recoveryWarningItems[0].textContent = t.recoveryImportant1;
        recoveryWarningItems[1].textContent = t.recoveryImportant2;
        recoveryWarningItems[2].textContent = t.recoveryImportant3;
        recoveryWarningItems[3].textContent = t.recoveryImportant4;
    }

    const recoveryTipsTitle = document.querySelector('#recovery .recovery-tips h3');
    if (recoveryTipsTitle) setTextWithEmoji(recoveryTipsTitle, '💡', t.recoveryTipsTitle);

    const recoveryTips = document.querySelectorAll('#recovery .recovery-tips li');
    if (recoveryTips.length >= 5) {
        recoveryTips[0].textContent = t.recoveryTips1;
        recoveryTips[1].textContent = t.recoveryTips2;
        recoveryTips[2].textContent = t.recoveryTips3;
        recoveryTips[3].textContent = t.recoveryTips4;
        recoveryTips[4].textContent = t.recoveryTips5;
    }
}

function updateTutorialHeader(t) {
    const headerDesc = document.querySelector('#tutorial .section-header p');
    if (!headerDesc) return;
    headerDesc.textContent = '';
    headerDesc.appendChild(document.createTextNode(t.tutorialDescription + ' '));
    headerDesc.appendChild(createSafeLink(
        'https://stackbit.me/tutorial-stackbit-1248/',
        t.tutorialOfficial
    ));

    const offlineNote = document.querySelector('#tutorial .offline-note');
    if (offlineNote) {
        offlineNote.textContent = '';
        const noteStrong = document.createElement('strong');
        noteStrong.textContent = 'ℹ️ ' + t.tutorialOfflineNote;
        offlineNote.appendChild(noteStrong);
        offlineNote.appendChild(document.createTextNode(' ' + t.tutorialOfflineText));
    }
}

// Função para atualizar seção Tutorial
function updateTutorialSection(t) {
    const tutorialSecurity = document.querySelector('#tutorial .tutorial-warning strong');
    if (tutorialSecurity) tutorialSecurity.textContent = t.tutorialSecurity;
    
    const tutorialSecurityText = document.querySelector('#tutorial .tutorial-warning p');
    if (tutorialSecurityText) tutorialSecurityText.textContent = t.tutorialSecurityText;
    
    // Atualizar passos do tutorial
    const steps = document.querySelectorAll('#tutorial .tutorial-step');
    if (steps.length >= 4) {
        // Passo 1
        if (steps[0].querySelector('h3')) {
            steps[0].querySelector('h3').textContent = t.tutorialStep1;
        }
        if (steps[0].querySelector('p')) {
            steps[0].querySelector('p').textContent = t.tutorialStep1Text;
        }
        
        // Passo 2
        if (steps[1].querySelector('h3')) {
            steps[1].querySelector('h3').textContent = t.tutorialStep2;
        }
        const step2List = steps[1].querySelectorAll('li');
        if (step2List.length >= 3) {
            // li[0]: texto + link + texto
            step2List[0].textContent = '';
            step2List[0].appendChild(document.createTextNode(t.tutorialStep2Text1 + ' '));
            step2List[0].appendChild(createSafeLink(
                'https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt',
                t.tutorialStep2Text2
            ));
            step2List[0].appendChild(document.createTextNode(' ' + t.tutorialStep2Text3));
            // li[1]: texto simples
            step2List[1].textContent = t.tutorialStep2Text4;
            // li[2]: <strong> + texto
            setStrongText(step2List[2], t.tutorialStep2Example, t.tutorialStep2ExampleText);
        }
        const step2Warning = steps[1].querySelector('.tutorial-note');
        if (step2Warning) setStrongText(step2Warning, '⚠️ ' + t.tutorialStep2Warning, t.tutorialStep2WarningText);
        
        // Passo 3
        if (steps[2].querySelector('h3')) {
            steps[2].querySelector('h3').textContent = t.tutorialStep3;
        }
        const step3Intro = steps[2].querySelector('p');
        if (step3Intro) step3Intro.textContent = t.tutorialStep3Text1;

        const step3List = steps[2].querySelectorAll('.tutorial-list li');
        if (step3List.length >= 4) {
            step3List[0].textContent = '';
            setStrongText(step3List[0], t.tutorialStep3Quadro1, t.tutorialStep3Quadro1Text);
            step3List[1].textContent = '';
            setStrongText(step3List[1], t.tutorialStep3Quadro2, t.tutorialStep3Quadro2Text);
            step3List[2].textContent = '';
            setStrongText(step3List[2], t.tutorialStep3Quadro3, t.tutorialStep3Quadro3Text);
            step3List[3].textContent = '';
            setStrongText(step3List[3], t.tutorialStep3Quadro4, t.tutorialStep3Quadro4Text);
        }

        const step3Paragraphs = steps[2].querySelectorAll('p');
        if (step3Paragraphs.length >= 2) {
            step3Paragraphs[1].textContent = t.tutorialStep3Text2;
        }
        const step3How = steps[2].querySelector('.tutorial-explanation');
        if (step3How) setStrongText(step3How, t.tutorialStep3How, t.tutorialStep3HowText);

        const step3Examples = steps[2].querySelectorAll('.tutorial-example');
        if (step3Examples.length >= 2) {
            const ex1Title = step3Examples[0].querySelector('h4');
            if (ex1Title) ex1Title.textContent = t.tutorialStep3Example1;
            const ex1Items = step3Examples[0].querySelectorAll('li');
            if (ex1Items.length >= 4) {
                ex1Items[0].textContent = t.tutorialStep3Example1Quadro1;
                ex1Items[1].textContent = t.tutorialStep3Example1Quadro2;
                ex1Items[2].textContent = t.tutorialStep3Example1Quadro3;
                ex1Items[3].textContent = t.tutorialStep3Example1Quadro4;
            }

            const ex2Title = step3Examples[1].querySelector('h4');
            if (ex2Title) ex2Title.textContent = t.tutorialStep3Example2;
            const ex2Word1 = step3Examples[1].querySelector('p strong');
            if (ex2Word1) ex2Word1.textContent = t.tutorialStep3Example2Word1;
            const ex2Lists = step3Examples[1].querySelectorAll('ul');
            if (ex2Lists.length >= 2) {
                const w1Items = ex2Lists[0].querySelectorAll('li');
                if (w1Items.length >= 4) {
                    w1Items[0].textContent = t.tutorialStep3Example2Word1Quadro1;
                    w1Items[1].textContent = t.tutorialStep3Example2Word1Quadro2;
                    w1Items[2].textContent = t.tutorialStep3Example2Word1Quadro3;
                    w1Items[3].textContent = t.tutorialStep3Example2Word1Quadro4;
                }
                const w2Label = ex2Lists[1].previousElementSibling;
                if (w2Label && w2Label.tagName === 'P') {
                    w2Label.textContent = '';
                    const strong = document.createElement('strong');
                    strong.textContent = t.tutorialStep3Example2Word2;
                    w2Label.appendChild(strong);
                }
                const w2Items = ex2Lists[1].querySelectorAll('li');
                if (w2Items.length >= 4) {
                    w2Items[0].textContent = t.tutorialStep3Example2Word2Quadro1;
                    w2Items[1].textContent = t.tutorialStep3Example2Word2Quadro2;
                    w2Items[2].textContent = t.tutorialStep3Example2Word2Quadro3;
                    w2Items[3].textContent = t.tutorialStep3Example2Word2Quadro4;
                }
            }
        }
        
        // Passo 4
        if (steps[3].querySelector('h3')) {
            steps[3].querySelector('h3').textContent = t.tutorialStep4;
        }
        const step4List = steps[3].querySelectorAll('li');
        if (step4List.length >= 7) {
            step4List[0].textContent = t.tutorialStep4Text1;
            step4List[1].textContent = t.tutorialStep4Text2;
            step4List[2].textContent = t.tutorialStep4Text3;
            step4List[3].textContent = '';
            const strong4 = document.createElement('strong');
            strong4.textContent = t.tutorialStep4Text4;
            step4List[3].appendChild(strong4);
            step4List[4].textContent = t.tutorialStep4Text5;
            step4List[5].textContent = t.tutorialStep4Text6;
            step4List[6].textContent = t.tutorialStep4Text7;
        }
    }
    
    const resourcesTitle = document.querySelector('#tutorial .tutorial-resource h3');
    if (resourcesTitle) setTextWithEmoji(resourcesTitle, '📚', t.tutorialResources);

    const resourcesList = document.querySelectorAll('#tutorial .tutorial-resource li');
    if (resourcesList.length >= 4) {
        // li[0]: link + texto descritivo
        resourcesList[0].textContent = '';
        resourcesList[0].appendChild(createSafeLink('https://stackbit.me/tutorial-stackbit-1248/', t.tutorialResources1));
        resourcesList[0].appendChild(document.createTextNode(' ' + t.tutorialResources1Desc));

        // li[1]: só link
        resourcesList[1].textContent = '';
        resourcesList[1].appendChild(createSafeLink(
            'https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt',
            t.tutorialResources2
        ));

        // li[2]: texto + <strong> + texto
        resourcesList[2].textContent = '';
        resourcesList[2].appendChild(document.createTextNode(t.tutorialResources3 + ' '));
        const s3 = document.createElement('strong');
        s3.textContent = t.tutorialResources3Encode;
        resourcesList[2].appendChild(s3);
        resourcesList[2].appendChild(document.createTextNode(' ' + t.tutorialResources3Text));

        // li[3]: texto + <strong> + texto
        resourcesList[3].textContent = '';
        resourcesList[3].appendChild(document.createTextNode(t.tutorialResources4 + ' '));
        const s4 = document.createElement('strong');
        s4.textContent = t.tutorialResources4Decode;
        resourcesList[3].appendChild(s4);
        resourcesList[3].appendChild(document.createTextNode(' ' + t.tutorialResources4Text));
    }
}

// Função para atualizar seção About
function updateAboutSection(t) {
    const aboutTitle = document.querySelector('#about .section-header h2');
    if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
    
    const aboutDesc = document.querySelector('#about .section-header p');
    if (aboutDesc) aboutDesc.textContent = t.aboutDescription;
    
    const specsTitle = document.querySelector('#about .specs-card h3');
    if (specsTitle) specsTitle.textContent = t.specsTitle;
    
    const specsDimensions = document.querySelector('#about .spec-item:first-child .spec-label');
    if (specsDimensions) specsDimensions.textContent = t.specDimensions;
    
    const specsWeight = document.querySelector('#about .spec-item:nth-child(2) .spec-label');
    if (specsWeight) specsWeight.textContent = t.specWeight;
    
    const specsMaterial = document.querySelector('#about .spec-item:last-child .spec-label');
    if (specsMaterial) specsMaterial.textContent = t.specMaterial;
    
    const aboutInfoTitle = document.querySelector('#about .about-info h3');
    if (aboutInfoTitle) aboutInfoTitle.textContent = t.aboutInfoTitle;
    
    const aboutInfoTexts = document.querySelectorAll('#about .about-info p');
    if (aboutInfoTexts.length >= 2) {
        aboutInfoTexts[0].textContent = t.aboutInfoText1;
        aboutInfoTexts[1].textContent = t.aboutInfoText2;
    }
    
    const featuresTitle = document.querySelector('#about .about-features h3');
    if (featuresTitle) featuresTitle.textContent = t.featuresTitle;
    
    const features = document.querySelectorAll('#about .about-features li');
    if (features.length >= 5) {
        features[0].textContent = t.feature1;
        features[1].textContent = t.feature2;
        features[2].textContent = t.feature3;
        features[3].textContent = t.feature4;
        features[4].textContent = t.feature5;
    }
    
    const aboutWarningTitle = document.querySelector('#about .about-warning strong');
    if (aboutWarningTitle) aboutWarningTitle.textContent = t.aboutWarningTitle;
    
    const aboutWarningText = document.querySelector('#about .about-warning p');
    if (aboutWarningText) aboutWarningText.textContent = t.aboutWarningText;
    
    const contributeTitle = document.querySelector('#about .about-contribute h3');
    if (contributeTitle) contributeTitle.textContent = t.contributeTitle;
    
    const contributeText = document.querySelector('#about .about-contribute p');
    if (contributeText) contributeText.textContent = t.contributeText;
    
    const viewGitHubBtn = document.querySelector('#about .btn-github:first-child span:last-child');
    if (viewGitHubBtn) viewGitHubBtn.textContent = t.viewOnGitHub;
    
    const reportIssueBtn = document.querySelector('#about .btn-github-secondary:first-of-type span:last-child');
    if (reportIssueBtn) reportIssueBtn.textContent = t.reportIssue;
    
    const contributeGuideBtn = document.querySelector('#about .btn-github-secondary:last-of-type span:last-child');
    if (contributeGuideBtn) contributeGuideBtn.textContent = t.contributeGuide;
    
    const footerGitHubLink = document.querySelector('.footer-github-link span:last-child');
    if (footerGitHubLink) footerGitHubLink.textContent = t.viewSourceCode;
}

// Função para atualizar footer
function updateFooter(t) {
    const footerWarning = document.querySelector('.footer p:first-child');
    if (footerWarning) footerWarning.textContent = '⚠️ ' + t.footerWarning;

    const footerCopyright = document.querySelector('.footer .copyright');
    if (footerCopyright) footerCopyright.textContent = t.footerCopyright;

    const footerCredits = document.querySelector('.footer .credits');
    if (footerCredits) {
        footerCredits.textContent = '';
        footerCredits.appendChild(document.createTextNode(t.footerCredits + ' '));
        footerCredits.appendChild(createSafeLink('https://stackbit.me/', t.footerCreditsLink));
        footerCredits.appendChild(document.createTextNode(' | ' + t.footerCreditsText + ' '));
        footerCredits.appendChild(createSafeLink('https://stackbit.me/', t.footerCreditsLink2));
    }
}

// Inicializar idioma ao carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const lang = getCurrentLanguage();
        setLanguage(lang);
    });
} else {
    // DOM já carregado
    const lang = getCurrentLanguage();
    setLanguage(lang);
}
