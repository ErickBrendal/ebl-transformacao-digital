# 🚀 Instruções para Deploy no Vercel com Domínio Personalizado

## 📋 Pré-requisitos

- Conta no Vercel (https://vercel.com)
- Conta no GitHub (já configurada)
- Seu domínio personalizado (exemplo: `meudominio.com`)

---

## 🎯 Parte 1: Deploy Inicial no Vercel

### Passo 1: Acessar o Vercel
1. Acesse https://vercel.com
2. Clique em **"Sign Up"** ou **"Log In"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar sua conta GitHub

### Passo 2: Importar o Repositório
1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Na lista de repositórios, localize **`ebl-transformacao-digital`**
3. Clique em **"Import"** ao lado do repositório

### Passo 3: Configurar o Projeto
1. **Project Name**: `ebl-transformacao-digital` (ou o nome que preferir)
2. **Framework Preset**: Vercel detectará automaticamente como **"Vite"** ✅
3. **Root Directory**: Deixe como `./` (raiz do projeto)
4. **Build and Output Settings**:
   - Build Command: `pnpm run build` (já configurado automaticamente)
   - Output Directory: `client/dist` (já configurado automaticamente)
   - Install Command: `pnpm install` (já configurado automaticamente)

### Passo 4: Variáveis de Ambiente (Opcional)
Se o projeto precisar de variáveis de ambiente, adicione-as na seção **"Environment Variables"**. Para este projeto, as variáveis já estão configuradas automaticamente pelo sistema.

### Passo 5: Deploy
1. Clique em **"Deploy"**
2. Aguarde o processo de build (geralmente leva 1-3 minutos)
3. Quando concluído, você verá uma tela de sucesso com confetes 🎉
4. Seu site estará disponível em: `https://ebl-transformacao-digital.vercel.app` (ou similar)

---

## 🌐 Parte 2: Conectar Seu Domínio Personalizado

### Passo 1: Acessar Configurações de Domínio
1. No dashboard do Vercel, clique no projeto **`ebl-transformacao-digital`**
2. Vá para a aba **"Settings"** (Configurações)
3. No menu lateral, clique em **"Domains"** (Domínios)

### Passo 2: Adicionar Seu Domínio
1. No campo **"Add Domain"**, digite seu domínio completo:
   - Para domínio raiz: `meudominio.com`
   - Para subdomínio: `www.meudominio.com`
   - **Recomendação**: Adicione ambos (raiz e www)

2. Clique em **"Add"**

### Passo 3: Configurar DNS no Seu Provedor de Domínio

O Vercel mostrará instruções específicas. Você precisará adicionar registros DNS no painel do seu provedor de domínio (onde você comprou o domínio, como GoDaddy, Registro.br, Hostinger, etc.).

#### Opção A: Domínio Raiz (`meudominio.com`)

Adicione um registro **A** apontando para o IP do Vercel:

```
Type: A
Name: @ (ou deixe em branco)
Value: 76.76.21.21
TTL: 3600 (ou automático)
```

#### Opção B: Subdomínio (`www.meudominio.com`)

Adicione um registro **CNAME**:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (ou automático)
```

#### Opção C: Ambos (Recomendado)

Configure os dois registros acima para que tanto `meudominio.com` quanto `www.meudominio.com` funcionem.

### Passo 4: Verificação e Propagação
1. Após adicionar os registros DNS, volte ao Vercel
2. Clique em **"Refresh"** ou **"Verify"** ao lado do domínio
3. A verificação pode levar de **alguns minutos até 48 horas** (geralmente 15-30 minutos)
4. Quando verificado, o status mudará para **"Valid Configuration"** ✅

### Passo 5: Configurar Domínio Principal (Opcional)
1. Se você adicionou tanto `meudominio.com` quanto `www.meudominio.com`
2. Escolha qual será o domínio principal (recomendado: `www.meudominio.com`)
3. Clique nos três pontos **"..."** ao lado do domínio
4. Selecione **"Set as Primary Domain"**
5. O Vercel redirecionará automaticamente o outro domínio para o principal

---

## 🔒 Parte 3: SSL/HTTPS (Automático)

O Vercel configura automaticamente certificados SSL gratuitos via Let's Encrypt. Após a verificação do domínio, seu site estará disponível com HTTPS em poucos minutos.

---

## 📝 Exemplo Prático: Configuração no Registro.br

Se seu domínio foi registrado no Registro.br:

1. Acesse https://registro.br
2. Faça login com sua conta
3. Vá em **"Meus Domínios"** → Selecione seu domínio
4. Clique em **"Editar Zona"** ou **"DNS"**
5. Adicione os registros:

**Para `meudominio.com.br`:**
```
@ IN A 76.76.21.21
```

**Para `www.meudominio.com.br`:**
```
www IN CNAME cname.vercel-dns.com.
```

6. Salve as alterações
7. Aguarde a propagação (15-30 minutos)

---

## 🔄 Deploy Automático (CI/CD)

Após a configuração inicial, o Vercel fará deploy automático sempre que você fizer push para o GitHub:

- **Branch `main`**: Deploy em produção (seu domínio personalizado)
- **Outras branches**: Deploy de preview (URL temporária para testes)

---

## ✅ Checklist Final

- [ ] Conta no Vercel criada e conectada ao GitHub
- [ ] Repositório `ebl-transformacao-digital` importado no Vercel
- [ ] Primeiro deploy realizado com sucesso
- [ ] Domínio personalizado adicionado no Vercel
- [ ] Registros DNS (A e/ou CNAME) configurados no provedor de domínio
- [ ] Domínio verificado no Vercel (status "Valid Configuration")
- [ ] SSL/HTTPS ativo (cadeado verde no navegador)
- [ ] Site acessível pelo domínio personalizado

---

## 🆘 Problemas Comuns

### "Domain Not Verified"
- **Causa**: Registros DNS ainda não propagaram
- **Solução**: Aguarde 15-30 minutos e clique em "Refresh"

### "Invalid Configuration"
- **Causa**: Registros DNS incorretos
- **Solução**: Verifique se copiou corretamente os valores (A: `76.76.21.21` ou CNAME: `cname.vercel-dns.com`)

### "This site can't be reached"
- **Causa**: DNS ainda não propagou globalmente
- **Solução**: Aguarde até 48 horas (geralmente resolve em 1-2 horas)

### Verificar Propagação DNS
Use ferramentas online para verificar se o DNS propagou:
- https://dnschecker.org
- https://www.whatsmydns.net

---

## 📞 Suporte

- **Documentação Vercel**: https://vercel.com/docs
- **Suporte Vercel**: https://vercel.com/support
- **Comunidade Vercel**: https://github.com/vercel/vercel/discussions

---

## 🎉 Pronto!

Após seguir todos os passos, seu site estará no ar em:
- **URL Vercel**: `https://ebl-transformacao-digital.vercel.app`
- **Seu Domínio**: `https://meudominio.com` (após configuração DNS)

**Desenvolvido por Erick Almeida - @erickbrendal**
