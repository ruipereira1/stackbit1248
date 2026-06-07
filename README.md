# Stackbit 1248 - Ferramenta BIP39

Aplicação web open source para codificação e decodificação de palavras BIP39 usando o sistema Stackbit 1248.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green.svg)](https://opensource.org/)

## 🚀 Como Usar

1. Abra `index.html` no navegador
2. Funciona 100% offline
3. Pode ser instalada como PWA

## 📦 Arquivos

- `index.html` - Página principal
- `app.js` - Lógica da aplicação
- `styles.css` - Estilos
- `bip39-words.js` - Dicionário BIP39 (2048 palavras)
- `manifest.json` - Manifesto PWA
- `service-worker.js` - Service Worker para offline

## 🌐 Publicar em um Site

**Opções rápidas:**
- GitHub Pages (grátis) - Ative em Settings → Pages
- Netlify (grátis) - Conecte o repositório GitHub
- Vercel (grátis) - Importe o repositório GitHub

## 🔒 Segurança

Medidas implementadas (detalhes em [SEGURANCA.md](SEGURANCA.md)):

- ✅ CSP restritiva (sem inline, `frame-src 'none'`, `worker-src 'self'`)
- ✅ SRI em scripts, CSS e JSON-LD
- ✅ Verificação SHA-384 do Service Worker antes do registo
- ✅ Proteção XSS — validação de inputs e DOM seguro
- ✅ Limpeza automática ao mudar de separador ou ocultar a página
- ✅ Sem armazenamento de seed (apenas preferência de idioma)
- ✅ Funciona 100% offline após cache PWA
- ✅ `autocomplete="off"` e `maxlength="8"` no Encode

### Verificar antes de usar com dados reais

1. Clone o repositório: `git clone https://github.com/ruipereira1/stackbit1248.git`
2. Compare commits com o GitHub (ou use uma release/tag de confiança)
3. Abra `index.html` **offline** ou instale a PWA **sem rede** após a 1.ª visita verificada
4. Após editar ficheiros `.js`/`.css`, execute `node scripts/generate-sri.js` (duas vezes se alterou `security.js`)

## ⚠️ Aviso importante

- **Use offline** num dispositivo de confiança
- **Nunca partilhe** a sua seed phrase
- **Evite introduzir a seed completa (12/24 palavras) online** — use apenas códigos 1248 ou palavras individuais para verificação
- Extensões de browser e malware podem ler o ecrã — este risco não é eliminável por código web

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

O dicionário BIP39 utilizado é de domínio público e não está sujeito a direitos autorais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [Guia de Contribuição](CONTRIBUTING.md) antes de enviar pull requests.

## 📚 Documentação

- [Créditos e Agradecimentos](CREDITOS.md)
- [Guia de Contribuição](CONTRIBUTING.md)

## 🙏 Créditos e Inspiração

Esta aplicação foi **inspirada no sistema Stackbit 1248** desenvolvido pela [Stackbit Metalwallet](https://stackbit.me/).

- **Site Original:** [https://stackbit.me/](https://stackbit.me/)
- **Sistema 1248:** Todas as informações sobre o sistema de codificação 1248 foram baseadas no conteúdo disponível no site Stackbit
- **Créditos:** Agradecimentos especiais à equipe da Stackbit Metalwallet pela criação e documentação do sistema Stackbit 1248

Este projeto é uma implementação web open source do sistema Stackbit 1248 para codificação e decodificação de palavras BIP39.

📖 **Para mais informações sobre os créditos, veja:** [CREDITOS.md](CREDITOS.md)

## 🔗 Recursos

- [Stackbit Metalwallet](https://stackbit.me/) - Site original e inspiração
- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Bitcoin BIPs Repository](https://github.com/bitcoin/bips)
