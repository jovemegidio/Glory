<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222?style=for-the-badge&logo=githubpages&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<h1 align="center">⛪ Glory — Church Management Platform</h1>

<p align="center">
  <strong>Plataforma SaaS completa de gestão eclesiástica com 24+ módulos funcionais</strong><br/>
  React 18 · TypeScript · Tailwind CSS · Vite · CI/CD · Responsivo · Acessível
</p>

<p align="center">
  <a href="https://jovemegidio.github.io/Glory/"><b>🔗 Demo ao Vivo</b></a> ·
  <a href="#-funcionalidades">Funcionalidades</a> ·
  <a href="#-arquitetura">Arquitetura</a> ·
  <a href="#-stack-tecnológica">Stack</a>
</p>

---

## 🎯 Sobre o Projeto

O **Glory** é uma plataforma web de gestão de igrejas inspirada no **InChurch** — um dos maiores apps eclesiásticos do Brasil. O sistema reproduz e expande as funcionalidades core de um produto SaaS real, com **24+ módulos totalmente funcionais**, sistema de autenticação com controle de acesso por roles (RBAC), multi-gestão de igrejas e interface responsiva e acessível.

### O que este projeto demonstra

| Competência | Implementação |
|-------------|---------------|
| **Arquitetura Frontend** | SPA com 24+ pages, composição de componentes, Context API |
| **TypeScript Avançado** | 30+ interfaces tipadas cobrindo todo o domínio |
| **Design System** | Componentes UI reutilizáveis (Button, Card, Modal, Badge, StatCard, EmptyState) |
| **Controle de Acesso (RBAC)** | Rotas e UI condicionais por role: Admin, Líder, Membro |
| **Multi-tenant** | Troca de contexto entre igrejas com ChurchProvider |
| **Responsividade** | Mobile-first com breakpoints, sidebar colapsável, menu mobile |
| **Acessibilidade** | Widget dedicado, skip-links, ARIA labels, navegação por teclado |
| **CI/CD** | Deploy automático via GitHub Actions para GitHub Pages |
| **UX/UI Profissional** | Animações, gradients, micro-interações, design consistente |

> 💡 **Nota:** Este é um projeto frontend com dados mockados. A camada de dados é totalmente desacoplada e preparada para integração com qualquer backend/API.

---

## ✨ Funcionalidades

### 🔐 Autenticação & Autorização
- Login com seleção de perfil (Admin / Membro) e validação
- Controle de acesso por roles com rotas protegidas
- Visões completamente diferenciadas: **Dashboard Admin** vs **Home do Membro**
- Tela de login com animações, carrousel de features e UX premium

### 📊 Painel Administrativo (Admin)
- Dashboard com **8 KPIs** em tempo real (membros, doações, eventos, oração, viewers...)
- Widgets de timeline recente, próximos eventos, pedidos de oração e doações
- Gestão completa de membros com filtros por status, role e busca
- Controle financeiro com receitas, despesas e balanço
- Sistema de notificações push com métricas de abertura
- Gestão de banners rotativos com scheduling

### ⛪ Módulos Espirituais
- **Bíblia** — 66 livros, navegação por testamento, capítulos e versículos, bookmarks
- **Devocionais Diários** — Conteúdo devocional com versículo, navegação entre dias, criação admin
- **Pedidos de Oração** — Mural interativo com status (orando/respondido), contador de intercessores
- **Notas de Culto** — Bloco de notas categorizado e sincronizável

### 👥 Comunidade & Engajamento
- **Grupos / Células** — Gestão com tipos (jovens, louvor, célula, infantil...), filtros por tipo
- **Timeline / Mural** — Feed social com publicações tipadas, curtidas e interações
- **Galeria de Fotos** — Álbuns vinculados a eventos com visualizador fullscreen
- **Formulários & Pesquisas** — Survey builder com múltiplos tipos de campo (rating, radio, text, select)
- **Testemunhos** — Formulário dedicado para coleta de testemunhos

### 📅 Eventos & Agenda
- **Calendário** — Visualização mensal com eventos categorizados por cor
- **Eventos** — Cards com inscrição, progress bar de vagas, detalhes e localização
- **Transmissão ao Vivo** — Player integrado com status live/offline e viewer count
- **Check-in de Presença** — QR Code por evento, histórico de frequência com métricas

### 💰 Financeiro
- **Doações** — PIX com QR Code, cartão, transferência — histórico completo com filtros
- **Gestão Financeira** — Dashboard de receitas vs despesas, transações categorizadas, balanço

### 📚 Educação & Capacitação
- **Cursos / EBD** — Plataforma de cursos com lições, progresso, filtros por categoria e nível
- **Palavras & Mensagens** — Acervo de pregações em vídeo, áudio e texto com busca
- **Downloads / E-books** — Biblioteca de materiais (PDF, EPUB) com contador de downloads

### 🤝 Operacional
- **Voluntários** — Gestão de equipes por ministério, escalas de serviço, confirmação de presença
- **Páginas Customizáveis** — CMS básico para páginas institucionais
- **Multi-gestão** — Suporte a múltiplas igrejas/sedes com troca instantânea
- **Configurações** — Personalização do sistema e preferências do usuário

### ♿ Acessibilidade
- Widget flutuante com ajuste de fonte, alto contraste, modo monocromático e daltonismo
- Skip-to-content link, ARIA labels em toda a interface
- Navegação completa por teclado
- Design responsivo mobile-first

---

## 🏗️ Arquitetura

```
src/
├── components/
│   ├── layout/          # Layout, Header, Sidebar (collapsible, responsive)
│   └── ui/              # Design System: Button, Card, Modal, Badge, StatCard, EmptyState
├── contexts/
│   ├── AuthContext       # Autenticação + RBAC (admin/leader/member/visitor)
│   └── ChurchContext     # Multi-tenant church switching
├── data/
│   └── mock.ts          # Data layer desacoplado (500+ linhas de dados realistas)
├── pages/               # 24 page components com lógica de negócio isolada
└── types/
    └── index.ts         # 30+ interfaces TypeScript tipando todo o domínio
```

### Decisões de Arquitetura

| Decisão | Motivação |
|---------|-----------|
| **Context API** (não Redux) | Complexidade adequada ao escopo — evitar over-engineering |
| **HashRouter** (não BrowserRouter) | Compatibilidade com GitHub Pages sem configuração server-side |
| **Mock Data Layer** separado | Camada de dados isolada, migração para API real sem refatorar componentes |
| **Componentes UI genéricos** | Design system interno reutilizável com props tipadas |
| **Role-based route guards** | Segurança de acesso implementada no nível de roteamento |
| **Tailwind + Design tokens** | Cores primary/accent customizadas para identidade visual consistente |

---

## 🛠️ Stack Tecnológica

| Tecnologia | Função |
|-----------|---------|
| **React 18** | Biblioteca UI com Hooks, componentes funcionais e composição |
| **TypeScript 5** | Tipagem estática rigorosa em todo o codebase |
| **Vite 5** | Build tool com HMR instantâneo e tree-shaking otimizado |
| **Tailwind CSS 3** | Utility-first CSS com design system customizado (cores, fonts) |
| **React Router 6** | SPA routing com nested routes e route guards |
| **Lucide React** | Ícones SVG otimizados e tree-shakeable |
| **PostCSS** | Processamento CSS com Autoprefixer |
| **GitHub Actions** | CI/CD pipeline com deploy automático |

---

## 🔑 Acesso à Demo

A aplicação roda inteiramente no navegador com dados de demonstração.

| Perfil | E-mail | Senha |
|--------|--------|-------|
| **Admin / Pastor** | `admin@glory.com` | `admin123` |
| **Membro** | `maria@glory.com` | `membro123` |
| **Líder** | `pedro@glory.com` | `lider123` |

> ⚠️ Credenciais de demonstração — dados fictícios para fins de portfólio.

**[▶ Acessar Demo ao Vivo](https://jovemegidio.github.io/Glory/)**

---

## 📊 Comparativo Glory vs InChurch

| Funcionalidade | InChurch | Glory |
|---------------|:--------:|:-----:|
| Bíblia integrada | ✅ | ✅ |
| Devocionais diários | ✅ | ✅ |
| Pedidos de oração | ✅ | ✅ |
| Timeline / Mural | ✅ | ✅ |
| Grupos e células | ✅ | ✅ |
| Eventos com inscrição | ✅ | ✅ |
| Calendário | ✅ | ✅ |
| Transmissão ao vivo | ✅ | ✅ |
| Doações (PIX, cartão) | ✅ | ✅ |
| Notificações push | ✅ | ✅ |
| Notas de culto | ✅ | ✅ |
| Downloads / E-books | ✅ | ✅ |
| Banners / Destaques | ✅ | ✅ |
| Gestão de membros | ✅ | ✅ |
| Gestão financeira | ✅ | ✅ |
| Cursos / EBD | ✅ | ✅ |
| Galeria de fotos | ✅ | ✅ |
| Formulários / Pesquisas | ✅ | ✅ |
| Check-in / QR Code | ✅ | ✅ |
| Voluntários / Escalas | ✅ | ✅ |
| Multi-gestão igrejas | ✅ | ✅ |
| Páginas customizáveis | ✅ | ✅ |
| Mensagens / Pregações | ✅ | ✅ |
| Widget de acessibilidade | ❌ | ✅ |
| RBAC multi-role | Parcial | ✅ |

---

## 🚀 Deploy

O projeto utiliza **GitHub Actions** com deploy automático para **GitHub Pages** a cada push na branch `main`.

```
Push main → Checkout → Node.js 20 → npm ci → tsc + Vite Build → GitHub Pages
```

---

## 📈 Roadmap

- [ ] Backend com Node.js + PostgreSQL (ou Firebase)
- [ ] Autenticação real com JWT / OAuth
- [ ] PWA com offline support e cache
- [ ] Gráficos interativos (Recharts)
- [ ] Testes unitários e E2E (Vitest + Playwright)
- [ ] Dark mode
- [ ] Integração com gateway de pagamento
- [ ] Notificações push reais (Web Push API)
- [ ] i18n: PT-BR / EN / ES

---

## 🧑‍💻 Autor

Desenvolvido como **case de portfólio profissional** demonstrando domínio em:

- ⚛️ React moderno com Hooks e composição avançada
- 🔷 TypeScript com tipagem rigorosa (30+ interfaces)
- 🎨 Design de interfaces complexas e responsivas
- 🔐 Controle de acesso e arquitetura multi-tenant
- 🧩 Componentização e design system interno
- 🚀 CI/CD e deploy automatizado
- ♿ Acessibilidade web (WCAG)

---

## 📄 Licença

MIT — veja [LICENSE](LICENSE) para detalhes.

---

<p align="center">
  <a href="https://jovemegidio.github.io/Glory/"><b>🔗 Acesse a Demo ao Vivo</b></a>
</p>

<p align="center">
  <strong>⭐ Se este projeto foi útil ou interessante, considere dar uma estrela!</strong>
</p>
