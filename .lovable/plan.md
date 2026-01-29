
# KB_TOTEM - Sistema de Autoatendimento Técnico

## Visão Geral
Totem interativo de suporte técnico otimizado para tela touchscreen vertical (1080x1920px), permitindo que usuários resolvam problemas de hardware e software de forma autônoma.

---

## 🏠 Tela Inicial (Home)
**Layout vertical centralizado com fundo branco:**
- Logo KB_TOTEM centralizado no topo
- Nome "KB_TOTEM" em destaque
- Resumo: "Sistema de autoatendimento para soluções rápidas de problemas técnicos"
- Dois ícones 3D lado a lado:
  - **Hardware** (esquerda): Ícone do processador 3D
  - **Software** (direita): Ícone das janelas/código 3D
- Labels clicáveis abaixo de cada ícone
- Animações suaves com Framer Motion (fade-in, hover com scale e rotação)

---

## 📂 Tela de Categoria
**Ao clicar em Hardware ou Software:**
- Breadcrumb de navegação (Home > Hardware)
- Campo de busca grande para filtrar problemas
- Grid de cards com os problemas:
  - Título do problema
  - Descrição curta
  - Tags para busca
- Botão "Início" sempre visível

**Problemas de Hardware (10 itens):**
- PC desliga sozinho
- Fonte sem certificação gasta mais energia
- PC não liga ao apertar o botão
- USB não reconhece dispositivo
- E mais 6 problemas técnicos...

**Problemas de Software (11 itens):**
- Computador muito lento
- O que é sistema operacional?
- Para que serve o antivírus?
- O que é backup/vírus/firewall?
- E mais 6 problemas...

---

## 🔧 Tela de Solução
**Detalhes completos do problema:**
- Título em destaque
- Seção "Causa" com ícone de alerta amarelo
- Seção "Solução" com passo a passo numerado
- Passos com numeração visual conectada por linha
- Espaço para imagem ilustrativa
- Espaço para vídeo tutorial (se disponível)
- Botão "Problema Resolvido?" no final
- Navegação: Voltar e Início

---

## ✅ Tela de Feedback
**Após visualizar a solução:**
- "Conseguiu resolver o problema?"
- Dois botões grandes:
  - ✅ Sim (verde) - Retorna à home
  - ❌ Não (vermelho) - Mostra QR code
- Se "Não": QR code com link para suporte humano
- Mensagem de agradecimento

---

## ⚡ Funcionalidades Especiais

### Busca Inteligente
- Filtragem em tempo real por título e tags
- Destaque de palavras encontradas

### Timeout Automático
- Retorna à home após 2 minutos de inatividade
- Contador visual nos últimos 30 segundos
- Botão "Continuar aqui" para cancelar

### QR Code
- Gerado dinamicamente com link da solução
- Usuário pode levar no celular

### Acessibilidade
- Fonte mínima 18px
- Áreas de toque grandes (200x200px)
- Contraste WCAG AA
- Labels ARIA e alt texts

---

## 🎨 Design Visual
- **Fundo home:** Branco puro (#FFFFFF)
- **Hardware:** Azul (#3B82F6)
- **Software:** Verde (#10B981)
- **Tipografia:** Inter/Poppins, títulos grandes
- **Animações:** Framer Motion (transições suaves 200-300ms)
- **Ícones:** Assets 3D fornecidos (processador e janelas)

---

## 📁 Estrutura de Dados
Todos os 21 problemas organizados em JSON com:
- ID, título, descrição, causa, solução
- Passos numerados para resolução
- Tags para busca
- Campos para imagem e vídeo (preparados para expansão futura)
