# ⚡ Vixt Framework

**O micro-framework Vanilla TS feito para quem valoriza performance extrema, arquitetura modular e segurança por padrão.**

[![NPM Version](https://img.shields.io/npm/v/@vixt-framework/core.svg)](https://www.npmjs.com/package/@vixt-framework/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Size](https://img.shields.io/badge/size-<25kB-brightgreen)

Vixt é uma solução minimalista e reativa para a web moderna. Ele elimina a necessidade de Virtual DOMs pesados, oferecendo uma experiência de desenvolvimento familiar (estilo JSX) com a velocidade do JavaScript puro.

---

## ✨ Principais Pilares

### 🛡️ Segurança Nativa

O Vixt foi desenhado com segurança em primeiro lugar. Ele possui camadas automáticas de sanitização de VNodes e proteção contra **Prototype Pollution**. Seus links e estados são validados antes de tocar o DOM real.

### 🚀 Performance Extrema

Com menos de 25kB gzipped (incluindo todos os componentes), o Vixt garante tempos de carregamento instantâneos e execução a 60fps constantes, ideal para aplicações críticas e interfaces de alta performance.

### 🏗️ Arquitetura de Framework

Muito além de uma biblioteca, o Vixt oferece Inversão de Controle, motor de renderização seguro e gerenciamento de estado reativo via Proxies.

---

## 📦 Instalação

Instale o core do framework e os componentes base via NPM ou Yarn:

```bash
# via NPM
npm install @vixt-framework/core

# via Yarn
yarn add @vixt-framework/core
```

---

## 🚀 Começo Rápido

Criar uma aplicação reativa com Vixt é simples e direto:

```tsx
/** @jsx h */
import { h, createStore, mountApp, Typography, Button } from "@vixt-framework/core";
import "@vixt-framework/core/style.css";

// 1. Defina seu Estado
const { state } = createStore({
  count: 0,
});

// 2. Crie seu Componente
const App = () => (
  <div className="p-8 text-center">
    <Typography tag="h1">Contador Vixt</Typography>
    <Typography tag="p" style="font-size: 2rem;">
      {state.count}
    </Typography>

    <div className="vixt-flex gap-4">
      <Button onClick={() => state.count--}>Diminuir</Button>
      <Button variant="primary" onClick={() => state.count++}>
        Aumentar
      </Button>
    </div>
  </div>
);

// 3. Monte sua Aplicação
mountApp(document.getElementById("app"), App, {
  subscribe: (fn) => state.subscribe(fn),
});
```

---

## 🧱 Biblioteca de Componentes

O Vixt já vem com uma suite de componentes prontos para uso, todos responsivos e acessíveis:

- **Primitives**: Typography, Buttons, Icons, Badges.
- **Forms**: Input, Checkbox, Switch, Select.
- **Data**: Accordion, SimpleTable (com sorting real), Cards, StatCards.
- **Overlays**: Tooltips, Dropdowns, Modals.
- **Navigation**: Tabs, Breadcrumbs.

---

## 🗺️ Roadmap

- [ ] **V1.1 - Native Router**: Navegação baseada em History API totalmente integrada ao estado.
- [ ] **V1.2 - Vixt CLI**: Ferramenta de linha de comando para scaffold instantâneo.
- [ ] **V2.0 - Server-Side Rendering (SSR)**: Otimização máxima para SEO e performance.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 🤝 Contribuição

Feedbacks e Pull Requests são bem-vindos! Ajude-nos a construir o futuro do desenvolvimento Vanilla.

**Desenvolvido com ❤️ por [David Sousa](https://github.com/davidsousa)**
