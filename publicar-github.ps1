# Script PowerShell para Publicar no GitHub
# Execute este script após instalar o Git

Write-Host "🚀 Script de Publicação no GitHub" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "Verificando instalação do Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "1. Acesse: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Baixe e instale o Git para Windows" -ForegroundColor Cyan
    Write-Host "3. Reinicie o PowerShell e execute este script novamente" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""

# Verificar se já é um repositório Git
if (Test-Path .git) {
    Write-Host "⚠️  Repositório Git já inicializado" -ForegroundColor Yellow
    $continue = Read-Host "Deseja continuar mesmo assim? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        exit 0
    }
} else {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositório inicializado" -ForegroundColor Green
}

Write-Host ""

# Verificar configuração do Git
Write-Host "Verificando configuração do Git..." -ForegroundColor Yellow
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠️  Git não está configurado" -ForegroundColor Yellow
    Write-Host ""
    $userName = Read-Host "Digite seu nome (para commits)"
    $userEmail = Read-Host "Digite seu email (use o mesmo do GitHub)"
    
    git config --global user.name "$userName"
    git config --global user.email "$userEmail"
    Write-Host "✅ Git configurado" -ForegroundColor Green
} else {
    Write-Host "✅ Git configurado: $userName <$userEmail>" -ForegroundColor Green
}

Write-Host ""

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green

Write-Host ""

# Verificar se há mudanças para commitar
$status = git status --porcelain
if (-not $status) {
    Write-Host "⚠️  Nenhuma mudança para commitar" -ForegroundColor Yellow
    $hasChanges = $false
} else {
    Write-Host "Arquivos a serem commitados:" -ForegroundColor Cyan
    git status --short
    $hasChanges = $true
}

Write-Host ""

# Fazer commit
if ($hasChanges) {
    Write-Host "Fazendo commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Stackbit 1248 - Ferramenta BIP39 Open Source"
    Write-Host "✅ Commit realizado" -ForegroundColor Green
} else {
    Write-Host "Pulando commit (sem mudanças)" -ForegroundColor Yellow
}

Write-Host ""

# Renomear branch para main
Write-Host "Configurando branch main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch configurada como 'main'" -ForegroundColor Green

Write-Host ""

# Configurar repositório remoto
Write-Host "Configuração do Repositório Remoto" -ForegroundColor Cyan
Write-Host ""

# Verificar se já existe remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' já existe: $existingRemote" -ForegroundColor Yellow
    $changeRemote = Read-Host "Deseja alterar? (s/n)"
    if ($changeRemote -eq "s" -or $changeRemote -eq "S") {
        git remote remove origin
    } else {
        Write-Host "Usando remote existente" -ForegroundColor Green
        Write-Host ""
        Write-Host "Para fazer push, execute:" -ForegroundColor Cyan
        Write-Host "  git push -u origin main" -ForegroundColor White
        Read-Host "Pressione Enter para sair"
        exit 0
    }
}

Write-Host "IMPORTANTE: Primeiro crie o repositório no GitHub!" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Acesse: https://github.com/new" -ForegroundColor Cyan
Write-Host "2. Crie um repositório PÚBLICO chamado 'stackbit-1248' (ou outro nome)" -ForegroundColor Cyan
Write-Host "3. NÃO marque 'Add README', 'Add .gitignore' ou 'Choose license'" -ForegroundColor Cyan
Write-Host "4. Clique em 'Create repository'" -ForegroundColor Cyan
Write-Host ""

$githubUser = Read-Host "Digite seu usuário GitHub"
$repoName = Read-Host "Digite o nome do repositório (ou pressione Enter para 'stackbit-1248')"

if (-not $repoName) {
    $repoName = "stackbit-1248"
}

$remoteUrl = "https://github.com/$githubUser/$repoName.git"

Write-Host ""
Write-Host "Adicionando remote: $remoteUrl" -ForegroundColor Yellow
git remote add origin $remoteUrl
Write-Host "✅ Remote adicionado" -ForegroundColor Green

Write-Host ""

# Fazer push
Write-Host "Fazendo push para GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  ATENÇÃO: Você precisará autenticar!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opções de autenticação:" -ForegroundColor Cyan
Write-Host "1. Token de Acesso Pessoal (recomendado)" -ForegroundColor White
Write-Host "   - Crie em: https://github.com/settings/tokens" -ForegroundColor Gray
Write-Host "   - Use o token como senha" -ForegroundColor Gray
Write-Host ""
Write-Host "2. GitHub CLI (se instalado)" -ForegroundColor White
Write-Host "   - Execute: gh auth login" -ForegroundColor Gray
Write-Host ""

$doPush = Read-Host "Deseja fazer push agora? (s/n)"
if ($doPush -eq "s" -or $doPush -eq "S") {
    Write-Host ""
    Write-Host "Executando: git push -u origin main" -ForegroundColor Cyan
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ SUCESSO! Projeto publicado no GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Acesse: https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer push. Verifique:" -ForegroundColor Red
        Write-Host "   - Repositório criado no GitHub" -ForegroundColor Yellow
        Write-Host "   - Autenticação configurada" -ForegroundColor Yellow
        Write-Host "   - URL do repositório correta" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Tente executar manualmente:" -ForegroundColor Cyan
        Write-Host "  git push -u origin main" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "Para fazer push manualmente, execute:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure Topics no GitHub (bip39, bitcoin, javascript, pwa)" -ForegroundColor White
Write-Host "2. Ative GitHub Pages em Settings > Pages (opcional)" -ForegroundColor White
Write-Host "3. Atualize badges no README.md com seu usuário" -ForegroundColor White
Write-Host ""

Read-Host "Pressione Enter para sair"
