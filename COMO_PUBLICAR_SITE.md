# 🌐 COMO PUBLICAR A APLICAÇÃO EM UM SITE

## 📋 ARQUIVOS NECESSÁRIOS

Para publicar a aplicação em um site, você precisa apenas destes **6 arquivos**:

```
📁 Seu Site/
├── 📄 index.html          (Página principal)
├── 📄 app.js              (Lógica da aplicação)
├── 📄 styles.css          (Estilos)
├── 📄 bip39-words.js      (Dicionário BIP39 - 2048 palavras)
├── 📄 manifest.json       (Manifesto PWA - opcional mas recomendado)
└── 📄 service-worker.js   (Service Worker - opcional mas recomendado)
```

**Total:** ~2.5 MB (principalmente devido ao `bip39-words.js`)

---

## 🚀 MÉTODO 1: GitHub Pages (GRÁTIS e FÁCIL)

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"**
3. Nome: `stackbit-1248` (ou qualquer nome)
4. Marque **"Public"**
5. Clique em **"Create repository"**

### Passo 2: Fazer Upload dos Arquivos

**Opção A: Via Interface Web**
1. No repositório criado, clique em **"uploading an existing file"**
2. Arraste os 6 arquivos para a página
3. Clique em **"Commit changes"**

**Opção B: Via Git (Recomendado)**
```bash
# No terminal, na pasta seedsigner
git init
git add index.html app.js styles.css bip39-words.js manifest.json service-worker.js
git commit -m "Initial commit - Stackbit 1248"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/stackbit-1248.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. No repositório, vá em **Settings**
2. Role até **Pages** (no menu lateral)
3. Em **Source**, selecione **"main"** branch
4. Clique em **Save**
5. Aguarde alguns minutos
6. Seu site estará em: `https://SEU_USUARIO.github.io/stackbit-1248/`

---

## 🌐 MÉTODO 2: Netlify (GRÁTIS e RÁPIDO)

### Passo 1: Preparar Arquivos

1. Comprima os 6 arquivos em um arquivo ZIP
2. Ou use Git (mais fácil)

### Passo 2: Fazer Deploy

1. Acesse [netlify.com](https://netlify.com)
2. Faça login (pode usar GitHub)
3. Clique em **"Add new site"** → **"Deploy manually"**
4. Arraste a pasta ou arquivo ZIP
5. Aguarde o deploy (alguns segundos)
6. Seu site estará em: `https://SEU-SITE.netlify.app`

**Vantagens:**
- ✅ HTTPS automático
- ✅ Deploy contínuo (se conectar com Git)
- ✅ Custom domain gratuito

---

## ☁️ MÉTODO 3: Vercel (GRÁTIS)

### Passo 1: Fazer Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Faça login (pode usar GitHub)
3. Clique em **"Add New Project"**
4. Conecte seu repositório GitHub ou faça upload
5. Clique em **"Deploy"**
6. Seu site estará em: `https://SEU-SITE.vercel.app`

---

## 🖥️ MÉTODO 4: Servidor Próprio (VPS/Hosting)

### Passo 1: Fazer Upload dos Arquivos

Use FTP, SFTP ou painel de controle do seu hosting:

1. Conecte-se ao servidor
2. Vá para a pasta `public_html` ou `www`
3. Faça upload dos 6 arquivos
4. Certifique-se de que `index.html` está na raiz

### Passo 2: Configurar Headers HTTP (Opcional mas Recomendado)

Se você tiver acesso ao servidor, configure estes headers HTTP:

**Apache (.htaccess):**
```apache
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set Referrer-Policy "no-referrer"
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'none'; base-uri 'self'; form-action 'none';"
</IfModule>
```

**Nginx:**
```nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";
add_header Referrer-Policy "no-referrer";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'none'; base-uri 'self'; form-action 'none';";
```

---

## 📦 CHECKLIST ANTES DE PUBLICAR

- [ ] Todos os 6 arquivos estão presentes
- [ ] `index.html` está na raiz
- [ ] Todos os arquivos estão na mesma pasta
- [ ] Testou localmente (abriu `index.html` no navegador)
- [ ] Verificou que não há erros no console (F12)

---

## 🔒 SEGURANÇA EM PRODUÇÃO

### Headers HTTP Recomendados

Se possível, configure estes headers no servidor:

- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `Referrer-Policy: no-referrer`
- ✅ `Content-Security-Policy` (já configurado no HTML)

### HTTPS

- ✅ **Sempre use HTTPS** em produção
- ✅ GitHub Pages, Netlify e Vercel fornecem HTTPS automático
- ✅ Se usar servidor próprio, configure certificado SSL (Let's Encrypt é grátis)

---

## 🧪 TESTAR APÓS PUBLICAR

1. Acesse o site publicado
2. Abra o console (F12)
3. Verifique se não há erros
4. Teste as funcionalidades:
   - ✅ Digite "abandon" no Encode
   - ✅ Digite "0001" no Decode
   - ✅ Verifique se os quadrados aparecem

---

## 📱 PWA (Progressive Web App)

A aplicação já está configurada como PWA:

- ✅ `manifest.json` configurado
- ✅ `service-worker.js` configurado
- ✅ Ícones podem ser adicionados (opcional)

**Para adicionar ícones:**
1. Crie ícones `icon-192.png` e `icon-512.png`
2. Coloque na mesma pasta
3. O `manifest.json` já está configurado para usá-los

---

## 🆘 PROBLEMAS COMUNS

### Problema: "Service Worker não registra"

**Solução:** Normal em `file://`. Em HTTPS funciona perfeitamente.

### Problema: "Manifest.json não carrega"

**Solução:** Verifique se o arquivo está na mesma pasta e se o servidor permite acesso.

### Problema: "Fontes não carregam"

**Solução:** As fontes do Google podem não carregar offline. A aplicação usará fontes do sistema como fallback.

---

## ✅ RESUMO RÁPIDO

**Para publicar rapidamente:**

1. **GitHub Pages** (mais fácil):
   - Crie repositório
   - Faça upload dos 6 arquivos
   - Ative Pages nas configurações
   - Pronto!

2. **Netlify** (mais rápido):
   - Arraste a pasta
   - Pronto em segundos!

**Arquivos necessários:** Apenas 6 arquivos na mesma pasta.

---

**Versão:** 1.0  
**Data:** 2026-01-24  
**Status:** ✅ Pronto para publicação
