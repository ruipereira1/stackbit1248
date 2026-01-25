# Script para Publicar no GitHub - Repositório: ruipereira1/stackbit1248
# Execute este script APÓS instalar o Git

Write-Host "🚀 Publicando para: https://github.com/ruipereira1/stackbit1248" -ForegroundColor Cyan
Write-Host ""

# Verificar Git
Write-Host "Verificando Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "INSTALE O GIT PRIMEIRO:" -ForegroundColor Yellow
    Write-Host "1. Acesse: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Baixe e instale o Git para Windows" -ForegroundColor Cyan
    Write-Host "3. Reinicie o PowerShell" -ForegroundColor Cyan
    Write-Host "4. Execute este script novamente" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""

# Configurar Git (se necessário)
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠️  Configurando Git pela primeira vez..." -ForegroundColor Yellow
    Write-Host ""
    $userName = Read-Host "Digite seu nome"
    $userEmail = Read-Host "Digite seu email (use o mesmo do GitHub)"
    git config --global user.name "$userName"
    git config --global user.email "$userEmail"
    Write-Host "✅ Git configurado" -ForegroundColor Green
    Write-Host ""
}

# Inicializar repositório
if (-not (Test-Path .git)) {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositório inicializado" -ForegroundColor Green
    Write-Host ""
}

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green
Write-Host ""

# Fazer commit
Write-Host "Fazendo commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Stackbit 1248 - Ferramenta BIP39 Open Source"
Write-Host "✅ Commit realizado" -ForegroundColor Green
Write-Host ""

# Configurar branch main
Write-Host "Configurando branch main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch configurada" -ForegroundColor Green
Write-Host ""

# Configurar remote
$remoteUrl = "https://github.com/ruipereira1/stackbit1248.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    if ($existingRemote -ne $remoteUrl) {
        Write-Host "⚠️  Remote diferente encontrado: $existingRemote" -ForegroundColor Yellow
        git remote remove origin
        git remote add origin $remoteUrl
        Write-Host "✅ Remote atualizado" -ForegroundColor Green
    } else {
        Write-Host "✅ Remote já configurado corretamente" -ForegroundColor Green
    }
} else {
    Write-Host "Adicionando remote..." -ForegroundColor Yellow
    git remote add origin $remoteUrl
    Write-Host "✅ Remote adicionado" -ForegroundColor Green
}

Write-Host ""

# Fazer push
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 FAZENDO PUSH PARA O GITHUB" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  ATENÇÃO: Você precisará autenticar!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opções de autenticação:" -ForegroundColor White
Write-Host "1. Token de Acesso Pessoal (RECOMENDADO)" -ForegroundColor Cyan
Write-Host "   - Crie em: https://github.com/settings/tokens" -ForegroundColor Gray
Write-Host "   - Clique em 'Generate new token (classic)'" -ForegroundColor Gray
Write-Host "   - Marque a opção 'repo'" -ForegroundColor Gray
Write-Host "   - COPIE o token e use como senha" -ForegroundColor Gray
Write-Host ""
Write-Host "2. GitHub CLI" -ForegroundColor Cyan
Write-Host "   - Execute: gh auth login" -ForegroundColor Gray
Write-Host ""

$doPush = Read-Host "Deseja fazer push agora? (s/n)"
if ($doPush -eq "s" -or $doPush -eq "S") {
    Write-Host ""
    Write-Host "Executando: git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "════════════════════════════════════════" -ForegroundColor Green
        Write-Host "✅ SUCESSO! Projeto publicado!" -ForegroundColor Green
        Write-Host "════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "Acesse: https://github.com/ruipereira1/stackbit1248" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Próximos passos:" -ForegroundColor Yellow
        Write-Host "1. Configure Topics: bip39, bitcoin, javascript, pwa" -ForegroundColor White
        Write-Host "2. Ative GitHub Pages em Settings > Pages (opcional)" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer push" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possíveis causas:" -ForegroundColor Yellow
        Write-Host "- Token de acesso inválido ou expirado" -ForegroundColor White
        Write-Host "- Repositório não existe ou não tem permissão" -ForegroundColor White
        Write-Host "- Problema de conexão" -ForegroundColor White
        Write-Host ""
        Write-Host "Tente novamente ou execute manualmente:" -ForegroundColor Cyan
        Write-Host "  git push -u origin main" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "Para fazer push depois, execute:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Read-Host "Pressione Enter para sair"
