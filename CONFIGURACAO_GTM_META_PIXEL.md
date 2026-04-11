# Configuração do Google Tag Manager e Meta Pixel

Este documento contém o passo a passo completo para configurar o rastreamento de conversões no site da EBL Soluções Corporativas.

---

## 📋 Índice

1. [Criar Conta no Google Tag Manager](#1-criar-conta-no-google-tag-manager)
2. [Criar Conta no Meta Business Suite](#2-criar-conta-no-meta-business-suite)
3. [Configurar Variáveis de Ambiente no Vercel](#3-configurar-variáveis-de-ambiente-no-vercel)
4. [Configurar Meta Pixel no GTM](#4-configurar-meta-pixel-no-gtm)
5. [Testar Rastreamento](#5-testar-rastreamento)
6. [Eventos Configurados](#6-eventos-configurados)

---

## 1. Criar Conta no Google Tag Manager

### Passo 1.1: Acessar o GTM
1. Acesse https://tagmanager.google.com
2. Faça login com sua conta Google
3. Clique em **"Criar conta"**

### Passo 1.2: Configurar a Conta
1. **Nome da conta**: `EBL Soluções Corporativas`
2. **País**: Brasil
3. **Nome do contêiner**: `eblsolucoescorp.tec.br`
4. **Plataforma de destino**: **Web**
5. Clique em **"Criar"**
6. Aceite os termos de serviço

### Passo 1.3: Copiar o ID do GTM
1. Após criar, você verá uma tela com o código do GTM
2. **Copie o ID** que aparece no formato: `GTM-XXXXXXX`
3. **Guarde esse ID** - você vai precisar dele no passo 3

---

## 2. Criar Conta no Meta Business Suite

### Passo 2.1: Acessar o Meta Business Suite
1. Acesse https://business.facebook.com
2. Faça login com sua conta Facebook/Instagram
3. Clique em **"Criar conta"** (se ainda não tiver)

### Passo 2.2: Configurar o Business Manager
1. **Nome da empresa**: `EBL Soluções Corporativas`
2. **Seu nome**: Erick Almeida
3. **E-mail comercial**: admebl@eblsolucoescorporativas.com
4. Clique em **"Avançar"** e complete o cadastro

### Passo 2.3: Criar o Meta Pixel
1. No menu lateral, clique em **"Gerenciador de Eventos"**
2. Clique em **"Conectar fontes de dados"**
3. Selecione **"Web"** (Pixel)
4. Clique em **"Conectar"**
5. **Nome do pixel**: `EBL Transformação Digital`
6. **URL do site**: `https://eblsolucoescorp.tec.br` (ou seu domínio)
7. Clique em **"Criar pixel"**

### Passo 2.4: Copiar o ID do Pixel
1. Após criar, clique em **"Continuar configuração do pixel"**
2. Selecione **"Instalar código manualmente"**
3. **Copie o ID do Pixel** (número de 15-16 dígitos)
4. **Guarde esse ID** - você vai precisar dele no passo 3 e 4

---

## 3. Configurar Variáveis de Ambiente no Vercel

### Passo 3.1: Acessar Configurações do Vercel
1. Acesse https://vercel.com/dashboard
2. Clique no projeto **`ebl-transformacao-digital`**
3. Vá em **Settings** → **Environment Variables**

### Passo 3.2: Adicionar a Variável do GTM
1. Clique em **"Add New"**
2. **Name**: `VITE_GTM_ID`
3. **Value**: Cole o ID do GTM que você copiou (ex: `GTM-XXXXXXX`)
4. **Environments**: Selecione **Production**, **Preview** e **Development**
5. Clique em **"Save"**

### Passo 3.3: Adicionar a Variável do Meta Pixel
1. Clique em **"Add New"** novamente
2. **Name**: `VITE_META_PIXEL_ID`
3. **Value**: Cole o ID do Meta Pixel que você copiou (ex: `123456789012345`)
4. **Environments**: Selecione **Production**, **Preview** e **Development**
5. Clique em **"Save"**

### Passo 3.4: Re-deploy do Site
1. Vá na aba **"Deployments"**
2. Clique nos três pontos **"..."** no último deployment
3. Selecione **"Redeploy"**
4. Aguarde 2-3 minutos para o site atualizar

---

## 4. Configurar Meta Pixel no GTM

### Passo 4.1: Criar Tag do Meta Pixel Base
1. Acesse https://tagmanager.google.com
2. Abra o contêiner **`eblsolucoescorp.tec.br`**
3. Clique em **"Tags"** no menu lateral
4. Clique em **"Nova"**
5. Clique em **"Configuração da tag"**
6. Selecione **"HTML personalizado"**
7. Cole o seguinte código (substitua `SEU_PIXEL_ID` pelo ID do seu pixel):

```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

8. Clique em **"Acionamento"**
9. Selecione **"All Pages"** (Todas as páginas)
10. **Nome da tag**: `Meta Pixel - Base Code`
11. Clique em **"Salvar"**

### Passo 4.2: Criar Tag de Evento Lead (WhatsApp)
1. Clique em **"Nova"** tag
2. Clique em **"Configuração da tag"**
3. Selecione **"HTML personalizado"**
4. Cole o seguinte código:

```html
<script>
fbq('track', 'Lead', {
  content_name: 'WhatsApp Click',
  content_category: 'Contact'
});
</script>
```

5. Clique em **"Acionamento"**
6. Clique no **"+"** para criar novo acionador
7. Clique em **"Configuração do acionador"**
8. Selecione **"Evento personalizado"**
9. **Nome do evento**: `whatsapp_click`
10. **Nome do acionador**: `WhatsApp Click`
11. Clique em **"Salvar"**
12. **Nome da tag**: `Meta Pixel - Lead (WhatsApp)`
13. Clique em **"Salvar"**

### Passo 4.3: Criar Tag de Evento Contact (E-mail)
1. Clique em **"Nova"** tag
2. Clique em **"Configuração da tag"**
3. Selecione **"HTML personalizado"**
4. Cole o seguinte código:

```html
<script>
fbq('track', 'Contact', {
  content_name: 'Email Click',
  content_category: 'Contact'
});
</script>
```

5. Clique em **"Acionamento"**
6. Clique no **"+"** para criar novo acionador
7. Clique em **"Configuração do acionador"**
8. Selecione **"Evento personalizado"**
9. **Nome do evento**: `email_click`
10. **Nome do acionador**: `Email Click`
11. Clique em **"Salvar"**
12. **Nome da tag**: `Meta Pixel - Contact (Email)`
13. Clique em **"Salvar"**

### Passo 4.4: Publicar as Tags
1. Clique no botão **"Enviar"** (canto superior direito)
2. **Nome da versão**: `Configuração inicial - Meta Pixel`
3. **Descrição**: `Pixel base + eventos de Lead e Contact`
4. Clique em **"Publicar"**

---

## 5. Testar Rastreamento

### Passo 5.1: Testar o Meta Pixel
1. Acesse https://business.facebook.com
2. Vá em **"Gerenciador de Eventos"**
3. Selecione seu pixel **"EBL Transformação Digital"**
4. Clique em **"Testar eventos"**
5. Digite a URL do seu site e clique em **"Abrir site"**
6. Navegue pelo site e clique nos botões de WhatsApp e e-mail
7. Verifique se os eventos aparecem na ferramenta de teste

### Passo 5.2: Testar o GTM
1. Acesse https://tagmanager.google.com
2. Abra o contêiner **`eblsolucoescorp.tec.br`**
3. Clique em **"Visualizar"** (canto superior direito)
4. Digite a URL do seu site e clique em **"Connect"**
5. Uma nova aba será aberta com o site
6. No painel do GTM, você verá todas as tags disparadas
7. Clique nos botões de WhatsApp e e-mail
8. Verifique se os eventos `whatsapp_click` e `email_click` aparecem

---

## 6. Eventos Configurados

O site já está preparado para rastrear os seguintes eventos automaticamente:

### 6.1. Eventos do Google Tag Manager

| Evento | Descrição | Quando dispara |
|--------|-----------|----------------|
| `whatsapp_click` | Clique em botão de WhatsApp | Quando o usuário clica em qualquer link de WhatsApp |
| `email_click` | Clique em link de e-mail | Quando o usuário clica no e-mail de contato |
| `cta_click` | Clique em CTA | Quando o usuário clica em botões de call-to-action |
| `pricing_view` | Visualização de planos | Quando o usuário visualiza a seção de planos |
| `section_view` | Visualização de seção | Quando o usuário rola até uma seção específica |

### 6.2. Eventos do Meta Pixel

| Evento | Descrição | Quando dispara |
|--------|-----------|----------------|
| `PageView` | Visualização de página | Quando o usuário carrega qualquer página |
| `Lead` | Lead gerado | Quando o usuário clica em WhatsApp |
| `Contact` | Contato iniciado | Quando o usuário clica no e-mail |
| `InitiateCheckout` | Início de checkout | Quando o usuário clica em CTAs principais |

---

## 📊 Próximos Passos

Após configurar tudo, você poderá:

1. **Criar Audiências Personalizadas** no Meta Business Suite com base nos eventos
2. **Configurar Conversões Personalizadas** para otimizar campanhas
3. **Criar Campanhas de Remarketing** para visitantes que não converteram
4. **Analisar o Funil de Conversão** no Google Analytics (se configurado)
5. **Otimizar Anúncios** com base nos dados de conversão

---

## 🆘 Suporte

Se tiver dúvidas ou problemas na configuração:

1. **Google Tag Manager**: https://support.google.com/tagmanager
2. **Meta Pixel**: https://www.facebook.com/business/help/952192354843755
3. **Contato**: admebl@eblsolucoescorporativas.com

---

**Desenvolvido por Erick Almeida - EBL Soluções Corporativas**
