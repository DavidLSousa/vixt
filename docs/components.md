# Vixt UI Kit - Componentes e Arquitetura

Este documento detalha a biblioteca oficial de componentes implementados no micro-framework **Vixt**, bem como o funcionamento interno da arquitetura e seu modelo de segurança.

## 🏗️ O Motor (Core)

O Vixt evoluiu para um motor **Vanilla JSX**, eliminando a necessidade de Template Literals baseados em strings e passando a usar um Virtual DOM leve.

- **JSX Nativo (`createElement` / `h`)**: Permite escrever tags HTML no JavaScript (`<Componente />`).
- **Estado Reativo (`createStore`)**: Baseado em `Proxy`, detecta alterações de forma invisível e desencadeia atualizações do DOM.
- **Tipagem Global**: O framework injeta globalmente a interface `JSX`, garantindo que o compilador do TypeScript suporte autocompletar e validação sem a necessidade de instalar `@types/react`.

---

## 🔒 Segurança (Nível Máximo contra XSS)

Com a nova arquitetura JSX, o nível de segurança do Vixt atingiu o padrão ouro de frameworks modernos.

**Prevenção Automática de XSS:**
Quando o motor de renderização encontra um valor de texto (seja uma variável de estado, um input do usuário ou o retorno de uma API), ele **nunca** injeta isso como HTML bruto (`innerHTML`).
Em vez disso, ele converte estritamente para um Nó de Texto usando a API nativa do navegador:
```javascript
// Exemplo real do código do motor (dom.ts)
document.createTextNode(String(vnode))
```
**Resultado**: Se um usuário tentar injetar código malicioso como `<script>alert('hack')</script>`, o navegador tratará isso literalmente como texto visual, tornando **estruturalmente impossível** a execução de scripts maliciosos injetados via variáveis.

---

## 🧩 Biblioteca de Componentes

Todos os componentes são construídos em `.tsx` puro e tipados, suportando passagem de propriedades (Props) e atributos normais do HTML.

### Primitivos (`primitives.tsx`)
Componentes base para construção de interface.

- **`<Typography />`**: Renderiza texto semântico.
  - *Props*: `tag` ('h1' | 'h2' | 'h3' | 'p' | 'span'), `className`.
- **`<Button />`**: Botão interativo preparado para reatividade.
  - *Props*: `type` ('button' | 'submit'), `onClick` (Event Handler), `className`.
- **`<Image />`**: Renderiza imagens já configuradas com `loading="lazy"` por padrão para otimização de performance.
  - *Props*: `src`, `alt`, `className`.
- **`<Link />`**: Wrapper simples para links.
  - *Props*: `href`, `className`.

### Layout (`layout.tsx`)
Componentes estruturais para alinhar e agrupar elementos.

- **`<Container />`**: Wrapper restritivo (geralmente usado com limites de `max-width` no CSS) para centralizar a aplicação.
- **`<Flex />`**: Contêiner configurado para usar o modelo Flexbox.
- **`<Grid />`**: Contêiner configurado para usar o modelo CSS Grid.
- **`<Section />`**: Define sessões semânticas na página usando a tag `<section>`.
  - *Props*: `id` (útil para âncoras), `className`.

### Apresentação (`presentation.tsx`)
Componentes complexos que agrupam layout e primitivos para formar interfaces de alto nível.

- **`<Card />`**: Cria um cartão elevado com um título (Typography interno) e uma área de conteúdo.
  - *Props*: `title`.
- **`<Header />`**: Barra de navegação responsiva.
  - *Props*: `brand` (Nome da marca ou logo), `links` (Array de objetos `{ text, href }`).
- **`<Modal />`**: Estrutura base de um Modal (Pop-up) contendo overlay de fundo escurecido, cabeçalho e corpo.
  - *Props*: `id`, `title`.

### Formulários (`forms.tsx`)
Componentes projetados para capturar dados do usuário e atualizar o estado reativo.

- **`<InputField />`**: Campo de input inteligente com bind automático para eventos.
  - *Props*: `label`, `type` (default: 'text'), `value`, `placeholder`, `onInput` (Callback que devolve a string tipada).
- **`<FormGroup />`**: Wrapper semântico para agrupar labels, inputs e mensagens de erro (CSS `form-group`).

---

> [!NOTE]
> Todos os componentes foram refatorados para tornar a propriedade `children` opcional, garantindo compatibilidade estrita com a validação do TypeScript em casos de componentes auto-fechados (ex: `<Modal id="x" title="Aviso" />`).
