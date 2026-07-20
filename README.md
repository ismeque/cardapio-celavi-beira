<div align="center">

# CELA VI — Cardápio Digital

**Cardápio digital premium, bilíngue e responsivo para o CELA VI Beira.**

Bar · Lounge · Restaurante — Beira, Moçambique

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-instalável-5A0FC8?logo=pwa&logoColor=white)

</div>

---

## 📖 Visão geral

Recriação profissional e moderna do cardápio digital do **CELA VI Beira**. A experiência foi
pensada para captar a atenção do cliente logo ao abrir — com imagens em destaque em vez de texto —
e para tornar o pedido simples, rápido e elegante, diretamente do telemóvel (via QR code na mesa).

O tema visual é **escuro premium com dourado/champanhe**, alinhado à identidade da marca.

## ✨ Funcionalidades

- **Vitrine visual** na página inicial: carrossel de destaques com imagens grandes + grelha de produtos com foto.
- **Navegação por categorias fixa (sticky)** — sempre acessível ao rolar.
- **Hierarquia de 3 níveis:** Categoria → Subcategoria → Produto, com _breadcrumbs_.
- **Bilíngue (PT/EN)** com troca instantânea e preferência guardada.
- **Fotos de produtos** com _fallback_ elegante (emoji da categoria) quando não há imagem.
- **Carrinho** com quantidades, observações e **persistência** (localStorage).
- **Finalização via WhatsApp** — o pedido é enviado formatado para o estabelecimento.
- **Histórico de pedidos** e botão **Chamar Atendente**.
- **Pesquisa** global e dentro de cada menu.
- **Skeleton loaders**, notificações (toasts) e animações suaves.
- **PWA** instalável (manifest + ícones) e otimização de imagens com `next/image`.
- **Acessibilidade** (ARIA, navegação por teclado) e design **responsivo** (mobile-first).

## 🛠️ Stack tecnológica

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 (config CSS-first) |
| Tipografia | Cormorant Garamond + Inter (`next/font`) |
| Imagens | `next/image` |
| Estado | React Context (carrinho, idioma, notificações) |

## 📁 Estrutura do projeto

```
Ce La VI/
├─ front-end/                # Aplicação Next.js (cardápio digital)
│  ├─ public/                # Logótipos, ícones e assets estáticos
│  ├─ scripts/               # Utilitários (ex.: extração do logótipo do PDF)
│  └─ src/
│     ├─ app/                # layout, página, globals.css, manifest (PWA)
│     ├─ components/         # Componentes de UI (Header, cartões, modais, carrinho…)
│     ├─ context/            # CartContext, LocaleContext, ToastContext
│     ├─ data/               # menu.ts (categorias, produtos, preços — dados de exemplo)
│     └─ lib/                # types, utils, i18n (PT/EN), orders
└─ back-end/                 # Reservado para a API / painel de administração (futuro)
```

## 🚀 Como executar

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20+ e npm.

```bash
# a partir da raiz do projeto
cd front-end
npm install
npm run dev
```

Abra **http://localhost:3000** no navegador.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Compila a versão de produção |
| `npm run start` | Serve a build de produção |
| `npm run lint` | Análise de código (ESLint) |

## ⚙️ Configuração

- **Menu (categorias, produtos, preços):** `front-end/src/data/menu.ts`
  (os campos `name`/`description` aceitam texto simples ou `{ pt, en }`).
- **Número de WhatsApp:** `RESTAURANT.whatsapp` em `front-end/src/data/menu.ts`.
- **Fotos de produtos:** defina `image` no produto (caminho local em `public/` ou URL).
- **Textos da interface (PT/EN):** `front-end/src/lib/i18n.ts`.
- **Logótipo:** `front-end/public/logo-celavi-gold.png` (pode ser regenerado a partir do PDF
  com `node scripts/extract-logo.mjs`).

> **Nota:** os produtos e imagens incluídos são **dados de exemplo**, prontos a substituir
> pelos itens, preços e fotografias reais do CELA VI.

## 🗺️ Roadmap

- [x] Front-end completo (menu visual, bilíngue, imagens, logótipo oficial)
- [ ] Painel de administração (gerir menu sem código)
- [ ] QR code por mesa + identificação da mesa
- [ ] Back-end de pedidos + ecrã de cozinha/bar
- [ ] Publicação (deploy) e domínio próprio
- [ ] Analytics (itens mais vistos/pedidos)

## 👤 Desenvolvedor

**Ismael Jacinto Dias Meque**

## 📄 Créditos & licença

- Identidade visual / logótipo: **MA Studio Design**.
- © 2026 **CELA VI Beira**. Todos os direitos reservados.

<div align="center">

_Feito com dedicação para o CELA VI Beira._

</div>
