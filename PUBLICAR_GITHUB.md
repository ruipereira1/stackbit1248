# 🚀 Guia Completo: Publicar no GitHub

## 📋 Pré-requisitos

### 1. Instalar Git

**Opção A: Download Direto**
1. Acesse: https://git-scm.com/download/win
2. Baixe e instale o Git para Windows
3. Durante a instalação, use as opções padrão
4. Reinicie o terminal/PowerShell após instalar

**Opção B: Via Winget (Windows 11)**
```powershell
winget install --id Git.Git -e --source winget
```

**Verificar Instalação:**
```powershell
git --version
```
Deve mostrar algo como: `git version 2.x.x`

### 2. Criar Conta no GitHub (se não tiver)

1. Acesse: https://github.com
2. Clique em "Sign up"
3. Preencha os dados e crie a conta
4. Verifique seu email

---

## 🔧 Passo 1: Configurar Git (Primeira Vez)

Abra o PowerShell e execute:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

**Importante:** Use o mesmo email da sua conta GitHub!

---

## 📦 Passo 2: Criar Repositório no GitHub

### Via Interface Web:

1. Acesse: https://github.com
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `stackbit-1248` (ou outro nome)
   - **Description:** "Ferramenta BIP39 para codificação/decodificação usando sistema Stackbit 1248"
   - **Visibility:** ✅ **Public** (para ser open source)
   - **NÃO marque** "Add a README file" (já temos)
   - **NÃO marque** "Add .gitignore" (já temos)
   - **NÃO marque** "Choose a license" (já temos)
5. Clique em **"Create repository"**

### Anote a URL do repositório:
Será algo como: `https://github.com/SEU-USUARIO/stackbit-1248.git`

---

## 💻 Passo 3: Publicar Código Local

Abra o PowerShell na pasta do projeto e execute os comandos abaixo:

### 3.1. Navegar para a pasta do projeto
```powershell
cd c:\Users\ruiva\Desktop\seedsigner
```

### 3.2. Inicializar Git
```powershell
git init
```

### 3.3. Adicionar todos os arquivos
```powershell
git add .
```

### 3.4. Fazer primeiro commit
```powershell
git commit -m "Initial commit: Stackbit 1248 - Ferramenta BIP39 Open Source"
```

### 3.5. Renomear branch para main
```powershell
git branch -M main
```

### 3.6. Adicionar repositório remoto
**Substitua `SEU-USUARIO` pelo seu usuário GitHub:**
```powershell
git remote add origin https://github.com/SEU-USUARIO/stackbit-1248.git
```

### 3.7. Fazer push para GitHub
```powershell
git push -u origin main
```

**Nota:** Na primeira vez, o GitHub pode pedir autenticação. Use:
- **Token de Acesso Pessoal** (recomendado) ou
- **GitHub CLI** (`gh auth login`)

---

## 🔐 Passo 4: Autenticação no GitHub

### Opção A: Token de Acesso Pessoal (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Note:** "Stackbit 1248 - Local Development"
   - **Expiration:** Escolha um prazo (ou "No expiration")
   - **Scopes:** Marque `repo` (acesso completo a repositórios)
4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (você só verá uma vez!)
6. Quando o Git pedir senha, use o token em vez da senha

### Opção B: GitHub CLI

```powershell
# Instalar GitHub CLI
winget install --id GitHub.cli

# Autenticar
gh auth login
```

---

## ✅ Passo 5: Verificar Publicação

1. Acesse seu repositório no GitHub: `https://github.com/SEU-USUARIO/stackbit-1248`
2. Verifique se todos os arquivos estão presentes
3. Confirme que o README.md está sendo exibido

---

## ⚙️ Passo 6: Configurar Repositório (Opcional)

### 6.1. Adicionar Descrição e Topics

1. Vá em **Settings** → **General**
2. Adicione **Topics:** `bip39`, `bitcoin`, `cryptocurrency`, `seed-phrase`, `stackbit-1248`, `javascript`, `pwa`, `open-source`

### 6.2. Ativar GitHub Pages (Para Publicar Site)

1. Vá em **Settings** → **Pages**
2. Configure:
   - **Source:** `main` branch
   - **Folder:** `/ (root)`
3. Clique em **Save**
4. Seu site estará em: `https://SEU-USUARIO.github.io/stackbit-1248/`

### 6.3. Adicionar Badges ao README

Edite o `README.md` e atualize os badges com seu usuário:

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/license/SEU-USUARIO/stackbit-1248)](https://github.com/SEU-USUARIO/stackbit-1248)
```

---

## 🔄 Atualizações Futuras

Para fazer atualizações no código:

```powershell
# 1. Verificar status
git status

# 2. Adicionar arquivos modificados
git add .

# 3. Fazer commit
git commit -m "Descrição da mudança"

# 4. Enviar para GitHub
git push
```

---

## 🆘 Solução de Problemas

### Erro: "fatal: not a git repository"
**Solução:** Execute `git init` na pasta do projeto

### Erro: "remote origin already exists"
**Solução:** 
```powershell
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/stackbit-1248.git
```

### Erro: "authentication failed"
**Solução:** 
- Use um Token de Acesso Pessoal em vez da senha
- Ou configure SSH keys

### Erro: "Git não encontrado"
**Solução:** 
- Instale o Git: https://git-scm.com/download/win
- Reinicie o PowerShell após instalar

---

## 📚 Recursos Úteis

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [GitHub Desktop](https://desktop.github.com/) (Interface gráfica alternativa)

---

## ✅ Checklist Final

- [ ] Git instalado e configurado
- [ ] Conta GitHub criada
- [ ] Repositório criado no GitHub
- [ ] Código commitado localmente
- [ ] Push realizado com sucesso
- [ ] Repositório visível no GitHub
- [ ] README.md sendo exibido corretamente
- [ ] (Opcional) GitHub Pages ativado

---

**Pronto! Seu projeto está no GitHub!** 🎉
