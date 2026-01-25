# ⚡ Instruções Rápidas - Publicar no GitHub

## 🎯 Método Mais Rápido

### 1. Instalar Git
```powershell
# Baixe e instale: https://git-scm.com/download/win
# Ou use winget (Windows 11):
winget install --id Git.Git -e --source winget
```

### 2. Executar Script Automático
```powershell
cd c:\Users\ruiva\Desktop\seedsigner
.\publicar-github.ps1
```

O script irá:
- ✅ Verificar se Git está instalado
- ✅ Configurar Git (se necessário)
- ✅ Inicializar repositório
- ✅ Adicionar arquivos
- ✅ Fazer commit
- ✅ Configurar remote
- ✅ Preparar para push

### 3. Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `stackbit-1248`
3. Visibilidade: **Public**
4. **NÃO marque** README, .gitignore ou license
5. Clique em "Create repository"

### 4. Fazer Push
Quando o script pedir, digite seu usuário GitHub e execute o push.

---

## 📖 Guia Completo

Para instruções detalhadas, veja: [PUBLICAR_GITHUB.md](PUBLICAR_GITHUB.md)

---

## 🔧 Comandos Manuais (Alternativa)

Se preferir fazer manualmente:

```powershell
# 1. Instalar Git (se não tiver)
# https://git-scm.com/download/win

# 2. Configurar Git (primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"

# 3. Navegar para a pasta
cd c:\Users\ruiva\Desktop\seedsigner

# 4. Inicializar Git
git init

# 5. Adicionar arquivos
git add .

# 6. Fazer commit
git commit -m "Initial commit: Stackbit 1248"

# 7. Renomear branch
git branch -M main

# 8. Adicionar remote (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/stackbit-1248.git

# 9. Fazer push
git push -u origin main
```

---

**Dúvidas?** Consulte [PUBLICAR_GITHUB.md](PUBLICAR_GITHUB.md) para o guia completo!
