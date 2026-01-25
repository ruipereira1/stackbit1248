# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Stackbit 1248! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Como Contribuir

### 1. Reportar Bugs

Se encontrar um bug, por favor:

1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/ruipereira1/stackbit1248/issues)
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs comportamento atual
   - Screenshots (se aplicável)
   - Navegador e versão

### 2. Sugerir Melhorias

Sugestões são bem-vindas! Por favor:

1. Verifique se a sugestão já não existe nas [Issues](https://github.com/ruipereira1/stackbit1248/issues)
2. Crie uma issue com:
   - Descrição clara da funcionalidade
   - Motivação/justificativa
   - Exemplos de uso (se aplicável)

### 3. Contribuir com Código

#### Processo:

1. **Fork o repositório**
   ```bash
   git clone https://github.com/ruipereira1/stackbit1248.git
   cd stackbit1248
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

3. **Faça suas alterações**
   - Siga o estilo de código existente
   - Adicione comentários quando necessário
   - Teste suas alterações

4. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "Descrição clara do que foi feito"
   ```

5. **Push para sua branch**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abra um Pull Request**
   - Descreva claramente o que foi feito
   - Referencie issues relacionadas (se houver)
   - Aguarde revisão

## 📝 Padrões de Código

### JavaScript

- Use `'use strict';`
- Use `const` e `let`, evite `var`
- Use nomes descritivos para variáveis e funções
- Comente código complexo
- Mantenha funções pequenas e focadas

### HTML/CSS

- Use indentação consistente (2 ou 4 espaços)
- Use nomes semânticos para classes
- Mantenha HTML acessível

### Segurança

- **NUNCA** comprometa a segurança
- Valide todos os inputs
- Use `textContent` em vez de `innerHTML` quando possível
- Siga as práticas de segurança já implementadas

## ✅ Checklist antes de enviar PR

- [ ] Código funciona corretamente
- [ ] Não introduz vulnerabilidades de segurança
- [ ] Segue o estilo de código do projeto
- [ ] Comentários adicionados quando necessário
- [ ] README atualizado (se necessário)
- [ ] Testado em diferentes navegadores (se aplicável)

## 🚫 O que NÃO fazer

- ❌ Não adicionar dependências externas sem discussão prévia
- ❌ Não modificar o dicionário BIP39 (deve permanecer 100% conforme o padrão oficial)
- ❌ Não remover funcionalidades de segurança
- ❌ Não adicionar rastreamento ou analytics
- ❌ Não adicionar código que requer servidor (deve funcionar 100% offline)

## 📚 Recursos

- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Security Best Practices](https://owasp.org/www-project-top-ten/)

## ❓ Dúvidas?

Se tiver dúvidas, abra uma issue ou entre em contato com os mantenedores.

---

**Obrigado por contribuir!** 🎉
