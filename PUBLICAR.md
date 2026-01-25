# 📦 Guia de Publicação no GitHub Pages

Este guia explica como publicar o Stackbit 1248 no GitHub Pages.

## 🚀 Passos para Publicar

### 1. Fazer Commit das Alterações

Primeiro, certifique-se de que todas as alterações estão commitadas:

```bash
git add .
git commit -m "Preparar para publicação no GitHub Pages"
git push origin main
```

### 2. Ativar GitHub Pages

1. Acesse o repositório no GitHub: https://github.com/ruipereira1/stackbit1248
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte), selecione:
   - **Branch:** `main`
   - **Folder:** `/ (root)` ou `/root`
5. Clique em **Save** (Salvar)

### 3. Aguardar Publicação

- O GitHub levará alguns minutos para publicar o site
- Você receberá uma URL como: `https://ruipereira1.github.io/stackbit1248/`
- A URL aparecerá na seção **Pages** das configurações

### 4. Verificar o Site

Após a publicação:
- Acesse a URL fornecida pelo GitHub
- Teste todas as funcionalidades
- Verifique se o Service Worker funciona (PWA)

## ✅ Arquivos Necessários

Os seguintes arquivos já estão configurados:
- ✅ `index.html` - Página principal
- ✅ `.nojekyll` - Desabilita Jekyll (criado automaticamente)
- ✅ Todos os arquivos JavaScript e CSS
- ✅ `manifest.json` - Configuração PWA

## 🔧 Configurações Importantes

### Service Worker
O Service Worker funcionará automaticamente no GitHub Pages porque:
- O site será servido via HTTPS
- O Service Worker está configurado para funcionar em HTTPS

### Caminhos dos Arquivos
Todos os caminhos estão relativos (`./`), então funcionarão corretamente no GitHub Pages.

## 📝 Notas

- O site funcionará 100% offline após o primeiro carregamento
- Pode ser instalado como PWA (Progressive Web App)
- Todos os dados são processados localmente (sem servidor)

## 🐛 Problemas Comuns

### Site não aparece
- Aguarde alguns minutos (pode levar até 10 minutos)
- Verifique se o branch `main` está selecionado
- Verifique se há erros no console do navegador

### Service Worker não funciona
- Certifique-se de que está acessando via HTTPS
- Limpe o cache do navegador
- Verifique o console para erros

### Links quebrados
- Todos os caminhos devem ser relativos (`./arquivo.js`)
- Não use caminhos absolutos (`/arquivo.js`)

## 🎉 Pronto!

Após seguir estes passos, seu site estará disponível publicamente no GitHub Pages!
