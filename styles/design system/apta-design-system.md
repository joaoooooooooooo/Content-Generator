# Apta Agency — Design System Reference

> Este documento contém todas as informações necessárias para aplicar a identidade visual da Apta Agency em qualquer projeto (dashboards, formulários, landing pages, apps, apresentações web). Use este arquivo como referência para manter consistência visual sem precisar acessar o Figma.

---

## 1. Brand Overview

**Nome:** Apta Agency
**Fundada:** Janeiro 2022
**Fundadores:** Dan Guerra e Bruno Corazza
**Sede:** Brasil
**Foco:** Agência de tecnologia — branding, design, desenvolvimento web, social media, vídeo
**Tom de voz:** Direto, confiante, sem frescura, profissional mas acessível
**Personalidade da marca:** Editorial, clean, sofisticada mas não fria. Moderna sem ser genérica.

---

## 2. Logo

A identidade visual da Apta tem três famílias de aplicação. Cada uma tem uma versão para fundos claros (preto) e uma para fundos escuros (branco). A escolha entre elas depende do contexto, do tamanho disponível e do peso visual desejado.

| Arquivo | Família | Cor | Fundo recomendado |
|---------|---------|-----|-------------------|
| `logos/apta-logo-black.svg` | Logo completo (wordmark) | Preto | Fundos claros |
| `logos/apta-logo-white.svg` | Logo completo (wordmark) | Branco | Fundos escuros |
| `logos/apta-symbol-black.svg` | Símbolo isolado (transparente) | Preto `#111111` | Fundos claros |
| `logos/apta-symbol-white.svg` | Símbolo isolado (transparente) | Branco | Fundos escuros |
| `logos/Icon Logo - black.svg` | Símbolo com fundo (bloco) | Bloco preto, símbolo branco | Fundos claros |
| `logos/Icon Logo white.svg` | Símbolo com fundo (bloco) | Bloco branco, símbolo preto | Fundos escuros |

---

### 2.1 Logo Completo — wordmark "apta"

Arquivos: [`logos/apta-logo-black.svg`](logos/apta-logo-black.svg) · [`logos/apta-logo-white.svg`](logos/apta-logo-white.svg)

A palavra "apta" estilizada por extenso. É a versão principal da marca, usada quando o nome precisa estar legível.

**Quando usar:**
- Menus de navegação (header de sites e dashboards)
- Início e final de slides em apresentações
- Postagens em redes sociais
- Qualquer aplicação em que o nome "Apta" precise aparecer por extenso

**Tamanhos recomendados:** entre 60px e 160px de largura. Não aplicar em escala grande — é uma logo de leitura, não de destaque.

**Versões:**
- `logos/apta-logo-black.svg` — para fundos claros (ex.: `#D8D6D3`, branco)
- `logos/apta-logo-white.svg` — para fundos escuros (ex.: `#1A1A1A`, preto)

---

### 2.2 Apta Symbol — símbolo isolado, fundo transparente

Arquivos: [`logos/apta-symbol-black.svg`](logos/apta-symbol-black.svg) · [`logos/apta-symbol-white.svg`](logos/apta-symbol-white.svg)

Apenas a forma do "a" estilizado, sem moldura nem fundo. Usado quando o espaço é pequeno ou quando o símbolo precisa se integrar visualmente ao fundo da peça.

**Quando usar:**
- Footer de apresentações (canto inferior esquerdo)
- Menus de dashboard (sidebar, navegação compacta)
- Qualquer aplicação reduzida em que o logo completo não caiba

**Tamanhos recomendados:** entre 16px e 40px.

**Versões:**
- `logos/apta-symbol-black.svg` (`#111111`) — para fundos claros
- `logos/apta-symbol-white.svg` (branco) — para fundos escuros

---

### 2.3 Icon Logo — símbolo com fundo (bloco)

Arquivos: [`logos/Icon Logo - black.svg`](logos/Icon%20Logo%20-%20black.svg) · [`logos/Icon Logo white.svg`](logos/Icon%20Logo%20white.svg)

Mesmo símbolo do Apta Symbol, porém dentro de um bloco com fundo de cor. Tem o mesmo uso do Symbol, mas serve para diversificar a aplicação em materiais que pedem mais peso visual ou um bloco bem delimitado.

**Quando usar:**
- Mesmas situações do Apta Symbol (footer, menu, espaços pequenos)
- Quando o material pede um bloco visual marcado em vez de um símbolo solto
- Para variar a aplicação quando Symbol e Icon Logo aparecem na mesma família de peças

**Tamanhos recomendados:** entre 24px e 60px. Para web, aplicar `border-radius` proporcional (~17% da largura) suaviza os cantos.

**Versões:**
- `logos/Icon Logo - black.svg` — bloco preto com símbolo branco, para fundos claros
- `logos/Icon Logo white.svg` — bloco branco com símbolo preto, para fundos escuros

---

### Regras gerais de uso do logo

- Sempre escolher a versão (black/white) que garanta contraste com o fundo
- Nunca alterar as proporções dos arquivos SVG
- Espaço mínimo ao redor: equivalente a 25% da altura do logo
- Não aplicar gradiente, sombra colorida ou outline
- Para impressão, usar os arquivos sem arredondamento; para web, é aceitável aplicar `border-radius` no Icon Logo

---

## 3. Cores

> Sistema de cores extraído diretamente das variáveis publicadas no arquivo master do Figma ([Apta Agency @ Master File](https://www.figma.com/design/VstMDyTTVK9nqsbq0QJWU7/Apta-Agency---Master-File?node-id=10191-6)). A nomenclatura, a hierarquia e o mapeamento entre tokens semânticos e primitivos seguem exatamente o que está no Figma — esta seção é a referência canônica para qualquer projeto da Apta.

### 3.1 Arquitetura da paleta

A paleta está dividida em duas coleções, na ordem em que devem ser pensadas:

- **Primitive** — os valores brutos (hex). Definem as cores físicas disponíveis. **Não usar diretamente em código de produção** — servem como base para os tokens semânticos.
- **Semantic** — tokens com significado de uso (`Background color`, `Border`, `Text`, `Link`). Cada um aponta para um token da Primitive. **Sempre usar estes tokens em código.**

Essa separação garante que qualquer mudança de cor (por exemplo, trocar o tom do cinza neutro) seja feita em um único ponto e propague para todo o sistema.

Sufixos consistentes em todas as famílias semânticas:

| Sufixo | Significado |
|--------|-------------|
| `primary` | Aplicação principal, default da família — cobre a maior parte dos casos |
| `secondary` | Versão de menor hierarquia / atenuada |
| `tertiary` | Variação de apoio, escura intermediária |
| `alternate` | Versão invertida (para uso em fundos contrastantes) |
| `success` | Estado positivo (verde) |
| `error` | Estado negativo (vermelho) |

---

### 3.2 Primitive — Color Brand

Cores institucionais da marca. Reservadas para a identidade visual oficial (logos, materiais corporativos).

| Token | Hex |
|-------|-----|
| `Color Brand/black` | `#000000` |
| `Color Brand/white` | `#FFFFFF` |

---

### 3.3 Primitive — Color Neutral

Escala completa de cinzas — base de praticamente todas as decisões de cor do sistema (texto, fundos, bordas).

| Token | Hex |
|-------|-----|
| `Color Neutral/white` | `#FFFFFF` |
| `Color Neutral/neutral lightest` | `#F0F0F0` |
| `Color Neutral/neutral lighter` | `#CCCCCC` |
| `Color Neutral/neutral light` | `#AAAAAA` |
| `Color Neutral/neutral` | `#666666` |
| `Color Neutral/neutral dark` | `#444444` |
| `Color Neutral/neutral darker` | `#222222` |
| `Color Neutral/neutral darkest` | `#111111` |
| `Color Neutral/black` | `#000000` |

---

### 3.4 Primitive — Color System

Cores reservadas para feedback de estado. Não usar como acento decorativo.

| Token | Hex |
|-------|-----|
| `Color System/success green` | `#027A48` |
| `Color System/success green light` | `#ECFDF3` |
| `Color System/error red` | `#B42318` |
| `Color System/error red light` | `#FEF3F2` |

---

### 3.5 Semantic — Background color

Tokens para `background`/`fill` de superfícies (frames, cards, seções, banners, badges).

| Token | Hex resolvido | Aponta para | Uso |
|-------|---------------|-------------|-----|
| `Background color/primary` | `#FFFFFF` | `Color Neutral/white` | Background principal da interface (página, container raiz) |
| `Background color/secondary` | `#666666` | `Color Neutral/neutral` | Backgrounds secundários médios (chips, tags, ícones de apoio) |
| `Background color/tertiary` | `#444444` | `Color Neutral/neutral dark` | Backgrounds escuros intermediários (cards de seção escura) |
| `Background color/alternate` | `#000000` | `Color Neutral/black` | Background invertido — seções de destaque, modo escuro, hero blocks |
| `Background color/success` | `#ECFDF3` | `Color System/success green light` | Banners, toasts e badges de sucesso |
| `Background color/error` | `#FEF3F2` | `Color System/error red light` | Banners, toasts e badges de erro |

---

### 3.6 Semantic — Border

Tokens para `border`, `outline` e `stroke`.

| Token | Hex resolvido | Aponta para | Uso |
|-------|---------------|-------------|-----|
| `Border/primary` | `#000000` | `Color Neutral/black` | Bordas de destaque, focos, contornos fortes em fundos claros |
| `Border/secondary` | `#AAAAAA` | `Color Neutral/neutral light` | Bordas padrão de inputs, cards e divisores (estado default) |
| `Border/tertiary` | `#444444` | `Color Neutral/neutral dark` | Bordas escuras secundárias, separadores em superfícies médias |
| `Border/alternate` | `#FFFFFF` | `Color Neutral/white` | Bordas em fundos escuros (versão invertida do `Border/primary`) |
| `Border/success` | `#027A48` | `Color System/success green` | Bordas de campos e cards em estado positivo |
| `Border/error` | `#B42318` | `Color System/error red` | Bordas de campos obrigatórios / em erro |

---

### 3.7 Semantic — Text

Tokens para a propriedade `color` de qualquer texto.

| Token | Hex resolvido | Aponta para | Uso |
|-------|---------------|-------------|-----|
| `Text/primary` | `#222222` | `Color Neutral/neutral darker` | Texto principal sobre fundos claros (títulos, parágrafos, labels) |
| `Text/secondary` | `#666666` | `Color Neutral/neutral` | Texto de apoio (descrições, captions, metadados) |
| `Text/alternate` | `#FFFFFF` | `Color Neutral/white` | Texto sobre fundos escuros (par invertido) |
| `Text/success` | `#027A48` | `Color System/success green` | Mensagens de sucesso, helper text positivo |
| `Text/error` | `#B42318` | `Color System/error red` | Mensagens de erro, validação de campo obrigatório |

---

### 3.8 Semantic — Link

Tokens dedicados a hyperlinks.

| Token | Hex resolvido | Aponta para | Uso |
|-------|---------------|-------------|-----|
| `Link/primary` | `#000000` | `Color Neutral/black` | Links em fundos claros (estado default) |
| `Link/secondary` | `#666666` | `Color Neutral/neutral` | Links atenuados (footer, navegação secundária) |
| `Link/alternate` | `#FFFFFF` | `Color Neutral/white` | Links em fundos escuros |

---

### 3.9 CSS Variables — copiar para qualquer projeto

```css
:root {
  /* ── Primitive — Color Brand ─────────────────── */
  --color-brand-black: #000000;
  --color-brand-white: #FFFFFF;

  /* ── Primitive — Color Neutral ───────────────── */
  --color-neutral-white:           #FFFFFF;
  --color-neutral-lightest:        #F0F0F0;
  --color-neutral-lighter:         #CCCCCC;
  --color-neutral-light:           #AAAAAA;
  --color-neutral:                 #666666;
  --color-neutral-dark:            #444444;
  --color-neutral-darker:          #222222;
  --color-neutral-darkest:         #111111;
  --color-neutral-black:           #000000;

  /* ── Primitive — Color System ────────────────── */
  --color-success-green:           #027A48;
  --color-success-green-light:     #ECFDF3;
  --color-error-red:               #B42318;
  --color-error-red-light:         #FEF3F2;

  /* ── Semantic — Background color ─────────────── */
  --bg-primary:    var(--color-neutral-white);          /* #FFFFFF */
  --bg-secondary:  var(--color-neutral);                /* #666666 */
  --bg-tertiary:   var(--color-neutral-dark);           /* #444444 */
  --bg-alternate:  var(--color-neutral-black);          /* #000000 */
  --bg-success:    var(--color-success-green-light);    /* #ECFDF3 */
  --bg-error:      var(--color-error-red-light);        /* #FEF3F2 */

  /* ── Semantic — Border ───────────────────────── */
  --border-primary:    var(--color-neutral-black);      /* #000000 */
  --border-secondary:  var(--color-neutral-light);      /* #AAAAAA */
  --border-tertiary:   var(--color-neutral-dark);       /* #444444 */
  --border-alternate:  var(--color-neutral-white);      /* #FFFFFF */
  --border-success:    var(--color-success-green);      /* #027A48 */
  --border-error:      var(--color-error-red);          /* #B42318 */

  /* ── Semantic — Text ─────────────────────────── */
  --text-primary:    var(--color-neutral-darker);       /* #222222 */
  --text-secondary:  var(--color-neutral);              /* #666666 */
  --text-alternate:  var(--color-neutral-white);        /* #FFFFFF */
  --text-success:    var(--color-success-green);        /* #027A48 */
  --text-error:      var(--color-error-red);            /* #B42318 */

  /* ── Semantic — Link ─────────────────────────── */
  --link-primary:    var(--color-neutral-black);        /* #000000 */
  --link-secondary:  var(--color-neutral);              /* #666666 */
  --link-alternate:  var(--color-neutral-white);        /* #FFFFFF */
}
```

---

### 3.10 Regras de aplicação

1. **Em código de produção, sempre usar tokens semânticos.** Tokens primitivos só aparecem no design system / theme layer.
2. **`primary` é o default da família** — cobre a maioria dos casos. `secondary` e `tertiary` reduzem a hierarquia.
3. **`alternate` é a versão invertida** (para fundos escuros). Usar em conjunto: `--bg-alternate` + `--text-alternate` + `--border-alternate` formam um par coerente.
4. **`success` e `error` são exclusivos para feedback de estado** — nunca como acento decorativo.
5. **A paleta é estritamente monocromática.** As únicas cores não-neutras são o verde `#027A48` (success) e o vermelho `#B42318` (error).
6. **Contraste:** `Text/primary` (`#222`) sobre `Background color/primary` (`#FFF`) atinge WCAG AAA. Pares `alternate` (`#FFF` sobre `#000`) também atendem AAA.
7. **Total de variáveis:** 15 primitivas + 20 semânticas = 35 tokens de cor publicados no Figma (Mode 1, único modo).

---

## 4. Tipografia

### Família tipográfica

**Inter Tight** — Usada para TUDO (headings, body, labels, buttons, UI).

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Escala tipográfica (Desktop)

| Estilo | Tamanho | Peso | Line Height | Letter Spacing |
|--------|---------|------|-------------|----------------|
| **H1** | 64px | Medium (500) | 120% | -3% (-0.03em) |
| **H2** | 48px | Medium (500) | 120% | -3% (-0.03em) |
| **H3** | 40px | Medium (500) | 120% | -2% (-0.02em) |
| **H4** | 32px | Medium (500) | 130% | -2% (-0.02em) |
| **H5** | 24px | Medium (500) | 140% | -2% (-0.02em) |
| **H6** | 20px | Medium (500) | 140% | -2% (-0.02em) |

### Texto de corpo e UI

| Estilo | Tamanho | Peso | Line Height | Uso |
|--------|---------|------|-------------|-----|
| **Body Large** | 17-18px | Regular (400) | 165% | Inputs, respostas de formulário |
| **Body** | 15-16px | Regular (400) | 160-165% | Descrições, parágrafos, subtítulos |
| **Body Small** | 14-14.5px | Regular (400) | 160% | Subtítulos de perguntas |
| **Caption** | 13px | Medium (500) | 150% | Metadata, info secundária |
| **Label** | 12px | Medium (500) | normal | Counters, labels de seção |
| **Overline** | 10-11px | Medium (500) | normal | Headers de seção, footer |
| **Button** | 13-14px | Medium (500) | normal | Textos de botão |

### Regras tipográficas

- **Letter spacing negativo** em todos os headings (-0.02em a -0.03em). Isso é essencial para o look editorial.
- **Peso Medium (500)** para headings e labels. Nunca Bold (700) para headings — o Bold é reservado apenas para o "a" do logo.
- **Peso Regular (400)** para corpo de texto e inputs.
- **Uppercase + letter-spacing expandido** (0.06em-0.1em) para overlines, labels de seção e metadata.
- Use `clamp()` para responsividade: `font-size: clamp(21px, 3.8vw, 29px)` para headings de formulário.

---

## 5. Ícones

A biblioteca oficial de ícones da Apta é o **[Phosphor Icons](https://phosphoricons.com/)** — exclusivamente no peso **Duotone**. Todo ícone usado em qualquer projeto da agência (web, dashboards, apresentações, social, vídeo) deve vir dessa biblioteca, neste peso. É a mesma biblioteca já usada nos sites em produção da Apta.

> **Regra única:** apenas o peso `Duotone`. **Não usar** `Thin`, `Light`, `Regular`, `Bold` nem `Fill` em nenhum contexto. Misturar pesos quebra a identidade visual da Apta.

### Por que Phosphor (Duotone)

- **Gratuita e open-source** (licença MIT) — sem conta paga, sem atribuição obrigatória
- **Set coeso** com mais de 1.500 ícones desenhados em uma mesma grade
- **Duotone** entrega leveza editorial sem cair no genérico do `Regular` linear nem no peso visual do `Fill`
- **Distribuição múltipla:** SVGs raw, fonte web, pacotes para React, Vue, Svelte, Flutter, Elm e plugin oficial do Figma

### Biblioteca

- **Site oficial / busca:** [https://phosphoricons.com/](https://phosphoricons.com/) (filtrar pelo peso **Duotone**)
- **Repositório:** [github.com/phosphor-icons](https://github.com/phosphor-icons)
- **Plugin Figma:** [Phosphor Icons](https://www.figma.com/community/plugin/903830135544202908/phosphor-icons) (instalar no Figma da Apta — selecionar o peso Duotone na inserção)
- **Pacote React:** `npm install @phosphor-icons/react`
- **Pacote web (Web Components / fonte):** `npm install @phosphor-icons/web`

### Regras de uso

- **Fonte única:** apenas ícones do Phosphor. Não misturar com Heroicons, Lucide, Material Icons, Feather, Flaticon ou qualquer outra biblioteca
- **Peso fixo: somente `Duotone`.** Os outros pesos (`Thin`, `Light`, `Regular`, `Bold`, `Fill`) estão proibidos no design system da Apta
- **Cores do Duotone:** o peso Duotone tem duas camadas. Usar `Text/primary` (`#222`) na camada cheia (sólida) e `Text/secondary` (`#666`) na camada secundária (~20% opacidade nativa) para manter a paleta monocromática. Em fundos escuros, inverter para `Text/alternate` (`#FFF`) na camada cheia
- **Tamanhos comuns:** 16px, 20px, 24px, 32px (alinhados à escala do sistema)
- **Padding óptico:** o container deve ter um respiro mínimo de 25% em relação ao ícone
- **Não pintar com cores fora da paleta semântica.** Estados de feedback usam `Text/success` ou `Text/error`

### Aplicação em código

#### React

```jsx
import { ArrowRight, Check, Plus } from "@phosphor-icons/react";

{/* weight="duotone" é OBRIGATÓRIO em todo ícone — nunca omitir nem trocar */}
<ArrowRight size={24} weight="duotone" color="var(--text-primary)" />
<Check       size={20} weight="duotone" color="var(--text-success)" />
<Plus        size={24} weight="duotone" color="var(--text-alternate)" />
```

Para reforçar a regra no projeto, criar um wrapper que fixa o peso:

```jsx
// src/components/Icon.jsx
import * as Ph from "@phosphor-icons/react";

export const Icon = ({ name, size = 24, color = "var(--text-primary)" }) => {
  const Component = Ph[name];
  return <Component size={size} weight="duotone" color={color} />;
};

// uso
<Icon name="ArrowRight" />
<Icon name="Check" color="var(--text-success)" />
```

#### Web (HTML + CSS)

A fonte web do Phosphor expõe cada peso em uma classe diferente. **Sempre usar a classe `ph-duotone`** (nunca `ph`, `ph-bold`, `ph-fill`, etc.).

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2/src/duotone/style.css">

<i class="ph-duotone ph-arrow-right icon"></i>
```

```css
.icon {
  width: 24px;
  height: 24px;
  color: var(--text-primary);   /* camada cheia herda via currentColor */
}

.icon--inverted {
  color: var(--text-alternate); /* para uso sobre Background color/alternate */
}
```

#### SVG inline (download direto do site)

No site, ao baixar um ícone, **selecionar o peso Duotone** antes do download. O SVG vem com duas paths separadas (camada secundária com `opacity="0.2"`) — basta controlar pelo `color` do CSS:

```html
<svg width="24" height="24" viewBox="0 0 256 256" style="color: var(--text-primary);">
  <path opacity="0.2" fill="currentColor" d="..." /> <!-- camada secundária -->
  <path fill="currentColor" d="..." />                <!-- camada cheia -->
</svg>
```

---

## 6. Efeitos e Sombras

### Efeitos definidos no Figma (Effect Styles)

| Nome | Tipo | Uso |
|------|------|-----|
| **xxsmall** | Shadow | Elementos sutis, cards em repouso |
| **xsmall** | Shadow | Cards com leve elevação |
| **small** | Shadow | Botões em repouso |
| **medium** | Shadow | Botões em hover, toasts |
| **large** | Shadow | Modais, dropdowns |
| **xlarge** | Shadow | Elementos flutuantes de destaque |
| **xxlarge** | Shadow | Hero elements, overlays |

### Sombras gerais (CSS)

> A sombra dos botões é multicamada (estilo "Realistic" do Framer) e está documentada em detalhe na seção **7. Botões**. Esta seção cobre apenas as sombras de uso geral (toasts, modais, etc.).

```css
/* Toast / notificação */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
```

---

## 7. Componentes UI

### Botões

> **Component Set no Figma:** [Button — Apta DS](https://www.figma.com/design/VstMDyTTVK9nqsbq0QJWU7/Apta-Agency---Master-File?node-id=13844-85628). Esta seção é a tradução literal das diretrizes que estão lá no arquivo.

#### Estrutura

Dois variants (ambos de uso principal), três tamanhos, quatro estados — total **24 combinações**.

| Propriedade | Opções |
|-------------|--------|
| **Variant** | `Primary` · `Secondary` |
| **Size** | `Large` · `Medium` · `Small` |
| **State** | `Default` · `Over` · `Pressed` · `Active` |

- **Primary** = botão filled escuro. Uso principal — call to action de cada tela
- **Secondary** = botão ghost (sem fundo, sem borda no estado default). Uso principal para ações de apoio. **Não existe variante outlined** — esse padrão foi removido por ser de uso muito específico

#### Especificações compartilhadas

| Propriedade | Valor |
|-------------|-------|
| **Border-radius** | `8px` (em todos os tamanhos e estados) |
| **Layout** | Auto-layout horizontal, conteúdo "hug" (largura segue o texto) |
| **Tipografia** | Inter Tight Medium |
| **Letter-spacing** | `-1%` |

#### Tamanhos

| Size | Padding (V × H) | Font-size | Gap |
|------|-----------------|-----------|-----|
| **Large** | 16px × 32px | 14px | 8px |
| **Medium** | 12px × 24px | 13px | 8px |
| **Small** | 8px × 18px | 12px | 6px |

#### Variant: Primary (filled)

| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| **Default** | `Color Neutral/neutral darker` `#222222` | `Text/alternate` `#FFFFFF` | — | Realistic Y=30 / 15% |
| **Over** | `Color Neutral/neutral darkest` `#111111` | `Text/alternate` `#FFFFFF` | — | Realistic Y=40 / 20% |
| **Pressed** | `Color Neutral/neutral dark` `#444444` | `Text/alternate` `#FFFFFF` | — | sem sombra |
| **Active** | `Color Neutral/neutral darker` `#222222` | `Text/alternate` `#FFFFFF` | 2px `Color Neutral/black` `#000000` | sem sombra |

#### Variant: Secondary (ghost)

| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| **Default** | transparente | `Text/primary` `#222222` | — | sem sombra |
| **Over** | `Color Neutral/neutral lightest` `#F0F0F0` | `Text/primary` `#222222` | — | sem sombra |
| **Pressed** | `Color Neutral/neutral lighter` `#CCCCCC` | `Text/primary` `#222222` | — | sem sombra |
| **Active** | `Color Neutral/neutral lightest` `#F0F0F0` | `Color Neutral/black` `#000000` | — | sem sombra |

#### Sombra "Realistic" (Primary Default e Over)

A sombra do Primary é uma pilha de seis drop-shadows que replica a sombra "Realistic" do Framer (Y=30, Diffusion=0.3, Focus=0.4, #000 @ 15%). A soma das opacidades das camadas iguala a opacidade do input, e a distribuição vai de camadas próximas/nítidas até camadas distantes/difusas.

```css
/* Primary — Default */
.btn--primary {
  box-shadow:
    0 1px  2px  rgba(0, 0, 0, 0.027),
    0 3px  5px  rgba(0, 0, 0, 0.030),
    0 7px  10px rgba(0, 0, 0, 0.030),
    0 14px 18px rgba(0, 0, 0, 0.024),
    0 22px 28px rgba(0, 0, 0, 0.021),
    0 30px 40px rgba(0, 0, 0, 0.018);
}

/* Primary — Over (hover) */
.btn--primary:hover {
  box-shadow:
    0 1px  3px  rgba(0, 0, 0, 0.036),
    0 4px  7px  rgba(0, 0, 0, 0.040),
    0 9px  13px rgba(0, 0, 0, 0.040),
    0 19px 24px rgba(0, 0, 0, 0.032),
    0 29px 37px rgba(0, 0, 0, 0.028),
    0 40px 53px rgba(0, 0, 0, 0.024);
}
```

#### Implementação CSS de referência

```css
/* ── Base ──────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-family: 'Inter Tight', -apple-system, sans-serif;
  font-weight: 500;
  letter-spacing: -0.01em;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

/* ── Sizes ─────────────────────────────────────── */
.btn--large  { padding: 16px 32px; font-size: 14px; }
.btn--medium { padding: 12px 24px; font-size: 13px; }
.btn--small  { padding: 8px  18px; font-size: 12px; gap: 6px; }

/* ── Primary ───────────────────────────────────── */
.btn--primary {
  background: var(--color-neutral-darker);   /* #222 */
  color: var(--text-alternate);              /* #FFF */
  box-shadow: /* … realistic stack — ver acima */ ;
}
.btn--primary:hover {
  background: var(--color-neutral-darkest);  /* #111 */
  box-shadow: /* … hover stack — ver acima */ ;
}
.btn--primary:active {
  background: var(--color-neutral-dark);     /* #444 */
  box-shadow: none;
}
.btn--primary[aria-pressed="true"] {
  background: var(--color-neutral-darker);   /* #222 */
  box-shadow: inset 0 0 0 2px var(--color-neutral-black); /* ring */
}

/* ── Secondary (ghost) ─────────────────────────── */
.btn--secondary {
  background: transparent;
  color: var(--text-primary);                /* #222 */
}
.btn--secondary:hover {
  background: var(--color-neutral-lightest); /* #F0F0F0 */
}
.btn--secondary:active {
  background: var(--color-neutral-lighter);  /* #CCC */
}
.btn--secondary[aria-pressed="true"] {
  background: var(--color-neutral-lightest); /* #F0F0F0 */
  color: var(--color-neutral-black);         /* #000 */
}
```

#### Quando usar

- **Primary** — uma única instância visível por tela. É a ação principal (Continuar, Enviar, Confirmar, CTA do hero)
- **Secondary** — todas as ações de apoio (Voltar, Cancelar, Ver mais, links de navegação que se comportam como botão)
- A combinação típica em um par de ações é Primary + Secondary lado a lado, com Primary à direita



### Inputs

| Propriedade | Token | Hex |
|-------------|-------|-----|
| Texto digitado | `Text/primary` | `#222222` |
| Placeholder | `Color Neutral/neutral light` | `#AAAAAA` |
| Border (default) | `Border/secondary` | `#AAAAAA` |
| Border (focus) | `Border/primary` | `#000000` |
| Border (erro) | `Border/error` | `#B42318` |
| Helper text de erro | `Text/error` | `#B42318` |

```css
.input, .textarea {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--border-secondary);   /* #AAA */
  background: transparent;
  font-size: 17px;
  font-family: 'Inter Tight', sans-serif;
  font-weight: 400;
  color: var(--text-primary);                          /* #222 */
  padding: 14px 0;
  outline: none;
  transition: border-color 0.3s;
}
.input:focus, .textarea:focus {
  border-bottom-color: var(--border-primary);          /* #000 */
}
.input::placeholder, .textarea::placeholder {
  color: var(--color-neutral-light);                   /* #AAA */
}
.input--error, .textarea--error {
  border-bottom-color: var(--border-error);            /* #B42318 */
}
```

### Toast / Notificação

| Propriedade | Token | Hex |
|-------------|-------|-----|
| Background | `Background color/alternate` | `#000000` |
| Texto | `Text/alternate` | `#FFFFFF` |
| Background (success) | `Background color/success` | `#ECFDF3` |
| Texto (success) | `Text/success` | `#027A48` |
| Background (error) | `Background color/error` | `#FEF3F2` |
| Texto (error) | `Text/error` | `#B42318` |

```css
.toast {
  background: var(--bg-alternate);     /* #000 */
  color: var(--text-alternate);        /* #FFF */
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.toast--success {
  background: var(--bg-success);       /* #ECFDF3 */
  color: var(--text-success);          /* #027A48 */
}
.toast--error {
  background: var(--bg-error);         /* #FEF3F2 */
  color: var(--text-error);            /* #B42318 */
}
```

### Barra de Progresso

| Propriedade | Token | Hex |
|-------------|-------|-----|
| Track (fundo) | `Color Neutral/neutral lightest` | `#F0F0F0` |
| Bar (preenchimento) | `Color Neutral/neutral darker` | `#222222` |
| Bar (success) | `Color System/success green` | `#027A48` |
| Bar (error) | `Color System/error red` | `#B42318` |

```css
.progress-track {
  height: 3px;
  background: var(--color-neutral-lightest);  /* #F0F0F0 */
  border-radius: 999px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--color-neutral-darker);    /* #222 — espelha o Primary button */
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-bar--success { background: var(--color-success-green); } /* #027A48 */
.progress-bar--error   { background: var(--color-error-red); }     /* #B42318 */
```

---

## 8. Layout & Espaçamento

### Princípios

- **Generous whitespace**: Espaço generoso é a marca registrada. Nunca comprimir elementos.
- **Centralização vertical**: Conteúdo principal sempre centralizado verticalmente na viewport.
- **Max-width restrito**: Conteúdo de texto limitado a 660px para leitura confortável.
- **Padding responsivo**: Mínimo 24px nas laterais em mobile.

### Espaçamentos comuns

| Contexto | Valor |
|----------|-------|
| Padding lateral mobile | 24px |
| Padding lateral desktop | 40px |
| Gap entre logo e título | 44px |
| Gap entre título e descrição | 20px |
| Gap entre descrição e meta | 10px |
| Gap entre meta e CTA | 44px |
| Margem do label ao input | 32px |
| Margem do counter ao label | 20px |
| Margem do subtitle ao input | 32px |

---

## 9. Animações & Transições

### Easing padrão

```css
/* Easing principal - usado em quase tudo */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Easing para progresso */
transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Easing para sucesso (bounce) */
animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animações

```css
/* Fade up - entrada de elementos */
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Scale in - confirmação de sucesso */
@keyframes scaleIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

### Stagger de entrada (tela intro)

Os elementos da tela de intro entram com stagger de 0.08s:

```css
.logo     { animation: fadeUp 0.7s ease 0.00s both; }
.title    { animation: fadeUp 0.7s ease 0.08s both; }
.desc     { animation: fadeUp 0.7s ease 0.16s both; }
.meta     { animation: fadeUp 0.7s ease 0.24s both; }
.cta      { animation: fadeUp 0.7s ease 0.32s both; }
```

### Transição entre telas/perguntas

```css
.fade-out {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
```

### Hover em botão primário

```css
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.2);
}
```

---

## 10. Padrões de Design

### Estrutura de uma tela típica

1. **Header fixo** (logo 30px à esquerda + label uppercase à direita)
2. **Conteúdo centralizado** (vertical e horizontal, `max-width: 660px`)
3. **Footer/nav fixo no bottom** com gradient fade do bg

### Hierarquia de informação

1. **Counter/overline** — `12px, 500, uppercase, #999, letter-spacing: 0.1em`
2. **Título/pergunta** — `clamp(21px, 3.8vw, 29px), 500, #1A1A1A, letter-spacing: -0.02em`
3. **Subtítulo** — `14.5px, 400, #888`
4. **Input** — `17px, 400, #1A1A1A, border-bottom: 2px solid #CCC`

### Regras de estilo que NÃO devem ser usadas

- Gradientes coloridos
- Sombras coloridas
- Bordas grossas (>2px)
- Cantos arredondados grandes em containers (>12px)
- Ícones coloridos — usar apenas monocromático
- Backgrounds brancos puros (#FFF) — sempre usar #D8D6D3
- Fontes diferentes de Inter Tight
- Peso Bold (700) para headings
- **Cabeçalho ou rodapé "corrido" genérico em PDFs, documentos e apresentações** (faixa repetida com nome da agência / título do documento / numeração de página) — ver regra abaixo

### Cabeçalhos e rodapés em entregáveis (PDF, documento, apresentação) — PROIBIDO

Nenhum entregável da Apta (PDF, documento, relatório, deck, apresentação) leva **cabeçalho ou rodapé corrido genérico**. Isso **não existe** na identidade da Apta — fica feio, parece template de escritório e quebra o look editorial.

**Nunca** adicionar, em nenhuma página:

- Faixa de topo ou rodapé repetida com "Apta Agency", título do documento ou nome do projeto
- Numeração de página ("Página X / Y", "Page X of Y", "01 / 12")
- Linha/régua separando esse cabeçalho/rodapé do conteúdo
- Símbolo ou wordmark da marca repetido em toda página como furniture de margem
- Em geração via Chrome/puppeteer: `displayHeaderFooter: true`, `headerTemplate` ou `footerTemplate` — manter sempre `displayHeaderFooter: false`

A marca aparece **uma vez**, com intenção, nos lugares definidos por este design system:

- **Capa** (documento/PDF): wordmark + símbolo no bloco de capa — ver seções 2 e 12
- **Slides**: apenas o símbolo no canto superior direito, sem numeração, sem header/footer — ver seção 13.4

> Margens de página existem para respiro (whitespace generoso). Elas ficam **vazias** — não são espaço para branding nem para numeração.

---

## 11. Favicon (data URI)

Versão inline do Icon Logo (bloco preto, símbolo branco) com cantos arredondados, pronta para colar em HTML:

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 354 354'%3E%3Crect width='354' height='354' rx='60' fill='%23111'/%3E%3Cpath d='M246.57 207.493C255.845 233.474 261 256.352 261 273.875H224.085C224.085 264.811 224.631 257.042 224.631 245.58C222.994 247.393 220.812 249.205 219.175 251.018C200.079 267.937 176.618 277 150.429 277C119.875 277 96.9593 255.852 93.1401 222.015C92.0489 204.492 97.371 194.571 107.738 180.674C119.741 166.173 136.645 156.109 157.378 151.879C180.839 147.649 201.977 149.998 219.72 161.592C221.357 162.801 222.448 164.009 224.085 165.218C224.631 148.299 221.26 125.358 207.62 116.899C198.794 111.425 189.661 108.381 179.964 109.803C151.554 113.969 146.751 121.652 135.078 136.041L96.5244 126.783C114.131 86.2616 149.883 77 177.163 77C192.986 77 208.808 81.2296 222.994 90.2931C251.365 108.42 263.369 148.903 253.548 191.199C251.977 197.964 249.118 202.728 246.57 207.493ZM150.429 240.746C179.891 240.746 200.079 225.64 211.536 206.305C203.352 189.991 189.568 186.924 172.655 186.924C169.927 186.924 166.653 186.924 163.379 187.529C135.553 192.967 124.785 203.284 125.876 218.994C126.968 229.266 133.515 240.746 150.429 240.746Z' fill='white'/%3E%3C/svg%3E" />
```

---

## 12. Template Boilerplate

Ponto de partida para qualquer novo dashboard, landing page, formulário ou interface da Apta. Já vem com:

- Paleta completa de tokens (Primitive + Semantic) baseada nas variáveis do Figma
- Inter Tight self-hosted via `./fonts/` (ou Google Fonts CDN como fallback)
- Header com logo completo (wordmark `logos/apta-logo-black.svg`)
- Layout centralizado, max-width restrito, padding generoso — o "look" Apta
- Estrutura tipográfica conforme seção 4 (headings com letter-spacing negativo)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título · Apta Agency</title>
  <meta name="theme-color" content="#FFFFFF" />

  <!-- Favicon (Icon Logo - black inline) — ver seção 11 -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...[ver seção 11]" />

  <!--
    Font: Inter Tight
    Default: self-hosted (arquivos em ./fonts/ ao lado deste HTML)
    Fallback: descomentar o <link> do Google Fonts abaixo se ./fonts/ não existir
  -->
  <!--
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap" rel="stylesheet" />
  -->

  <style>
    /* ── Inter Tight self-hosted (variable font, 1 arquivo cobre 100–900) ── */
    @font-face {
      font-family: 'Inter Tight';
      src: url('./fonts/InterTight-Latin.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Inter Tight';
      src: url('./fonts/InterTight-LatinExt.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      /* ── Primitive — Color Neutral ─────────────── */
      --color-neutral-white:           #FFFFFF;
      --color-neutral-lightest:        #F0F0F0;
      --color-neutral-lighter:         #CCCCCC;
      --color-neutral-light:           #AAAAAA;
      --color-neutral:                 #666666;
      --color-neutral-dark:            #444444;
      --color-neutral-darker:          #222222;
      --color-neutral-darkest:         #111111;
      --color-neutral-black:           #000000;

      /* ── Primitive — Color System ──────────────── */
      --color-success-green:           #027A48;
      --color-success-green-light:     #ECFDF3;
      --color-error-red:               #B42318;
      --color-error-red-light:         #FEF3F2;

      /* ── Semantic — Background ─────────────────── */
      --bg-primary:    var(--color-neutral-white);
      --bg-secondary:  var(--color-neutral);
      --bg-tertiary:   var(--color-neutral-dark);
      --bg-alternate:  var(--color-neutral-black);
      --bg-success:    var(--color-success-green-light);
      --bg-error:      var(--color-error-red-light);

      /* ── Semantic — Border ─────────────────────── */
      --border-primary:    var(--color-neutral-black);
      --border-secondary:  var(--color-neutral-light);
      --border-tertiary:   var(--color-neutral-dark);
      --border-alternate:  var(--color-neutral-white);
      --border-success:    var(--color-success-green);
      --border-error:      var(--color-error-red);

      /* ── Semantic — Text ───────────────────────── */
      --text-primary:    var(--color-neutral-darker);
      --text-secondary:  var(--color-neutral);
      --text-alternate:  var(--color-neutral-white);
      --text-success:    var(--color-success-green);
      --text-error:      var(--color-error-red);

      /* ── Semantic — Link ───────────────────────── */
      --link-primary:    var(--color-neutral-black);
      --link-secondary:  var(--color-neutral);
      --link-alternate:  var(--color-neutral-white);

      /* ── Type ──────────────────────────────────── */
      --font: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    html, body {
      min-height: 100dvh;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: var(--font);
      font-weight: 400;
      letter-spacing: -0.01em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body { display: flex; flex-direction: column; }

    /* ── Header com logo full ──────────────────── */
    .apta-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 40px;
      border-bottom: 1px solid var(--border-secondary);
    }
    .apta-header__logo {
      height: 24px;
      width: auto;
      display: block;
    }
    .apta-header__nav {
      display: flex;
      gap: 24px;
    }
    .apta-header__nav a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 13px;
      letter-spacing: -0.01em;
      transition: color 0.2s;
    }
    .apta-header__nav a:hover { color: var(--text-primary); }

    /* ── Main centralizado, max-width restrito ── */
    .apta-main {
      flex: 1;
      width: 100%;
      max-width: 660px;
      margin: 0 auto;
      padding: 64px 24px;
    }

    /* ── Headings (Inter Tight Medium, letter-spacing negativo) ── */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 500;
      letter-spacing: -0.03em;
      line-height: 1.2;
      color: var(--text-primary);
    }
    h1 { font-size: 64px; }
    h2 { font-size: 48px; }
    h3 { font-size: 40px; letter-spacing: -0.02em; }
    h4 { font-size: 32px; letter-spacing: -0.02em; line-height: 1.3; }
    h5 { font-size: 24px; letter-spacing: -0.02em; line-height: 1.4; }
    h6 { font-size: 20px; letter-spacing: -0.02em; line-height: 1.4; }

    p {
      font-size: 16px;
      line-height: 1.65;
      color: var(--text-secondary);
    }

    @media (max-width: 600px) {
      .apta-header { padding: 16px 24px; }
      .apta-main   { padding: 40px 24px; }
      h1 { font-size: clamp(40px, 8vw, 64px); }
    }
  </style>
</head>
<body>
  <header class="apta-header">
    <!--
      Logo completo (wordmark "apta") para menus.
      Em fundos escuros, trocar para logos/apta-logo-white.svg.
    -->
    <img class="apta-header__logo" src="logos/apta-logo-black.svg" alt="Apta Agency" />

    <nav class="apta-header__nav">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </nav>
  </header>

  <main class="apta-main">
    <!-- Seu conteúdo aqui -->
  </main>
</body>
</html>
```

### Estrutura de pastas esperada

```
seu-projeto/
├─ index.html                       ← este boilerplate
├─ logos/
│  ├─ apta-logo-black.svg           ← wordmark para fundos claros
│  ├─ apta-logo-white.svg           ← wordmark para fundos escuros
│  ├─ apta-symbol-black.svg         ← símbolo só (transparente, fundos claros)
│  ├─ apta-symbol-white.svg         ← símbolo só (transparente, fundos escuros)
│  ├─ Icon Logo - black.svg         ← símbolo em bloco preto
│  └─ Icon Logo white.svg           ← símbolo em bloco branco
└─ fonts/
   ├─ InterTight-Latin.woff2        ← ~45 KB, cobre EN + PT-BR básico
   └─ InterTight-LatinExt.woff2     ← ~90 KB, cobre acentos extras (ã, ç, ñ, etc.)
```

Os dois arquivos `.woff2` da Inter Tight já estão na pasta `fonts/` deste design system — basta copiar para o seu projeto. São variable fonts: cada arquivo cobre os pesos 100–900, então não precisa de Regular/Medium/Bold separados. O navegador escolhe os arquivos certos via `unicode-range`.

Caso prefira CDN, descomente o bloco do Google Fonts no `<head>` e remova os `@font-face` locais.

---

## 13. Slide Decks · Padrões

Padrões obrigatórios para qualquer slide deck da Apta (apresentações comerciais, audits, decks internos, social posts em formato slide). Estas regras vêm antes de qualquer escolha estética: dimensão, tipografia, marca e backgrounds são fixos.

### 13.1 Dimensões

- **Slide:** 1920 × 1080 (16:9)
- **Margem segura:** 96px em todos os lados — nenhum elemento crítico ultrapassa esse limite

### 13.2 Tipografia (regras obrigatórias)

| Elemento | Tamanho | Peso | Letter-spacing |
|----------|---------|------|----------------|
| **Título** | **124px** (obrigatório, fixo) | Inter Tight Medium | -3% (-0.03em) |
| **Subtítulo** | **40px** | Inter Tight Regular ou Medium | -2% (-0.02em) |
| **Body** | adapta ao espaço restante | Inter Tight Regular | normal |
| **Overline / chip** | 11–14px | Inter Tight Medium, uppercase, spacing 8–10% | — |

> Todo título tem 124px. Não negociável.
> Subtítulo (quando existe) vem logo abaixo do título a 40px.
> O restante do conteúdo (corpo, cards, listas, imagens) adapta o tamanho ao espaço que sobrar, respeitando as margens.

### 13.3 Backgrounds e Cards

#### Slide claro (default)

| Elemento | Token | Hex |
|----------|-------|-----|
| Background do slide | `Color Neutral/neutral lightest` | `#F0F0F0` |
| Background do card | `Color Neutral/white` | `#FFFFFF` |
| Stroke do card | `Color Neutral/neutral lighter` | `#CCCCCC` |
| Texto principal | `Text/primary` | `#222222` |
| Texto de apoio | `Text/secondary` | `#666666` |

#### Slide escuro (variação)

| Elemento | Token | Hex |
|----------|-------|-----|
| Background do slide | `Color Neutral/neutral darker` | `#222222` |
| Background do card | `Color Neutral/neutral darkest` | `#111111` |
| Stroke do card | `Color Neutral/neutral` | `#666666` |
| Texto principal | `Text/alternate` | `#FFFFFF` |
| Texto de apoio | `Color Neutral/neutral light` | `#AAAAAA` |

Card sempre com:
- `border-radius: 16px`
- `border: 1px solid {stroke}`
- Padding interno: 32px (ajusta conforme densidade do conteúdo)

### 13.4 Marca (apta-symbol)

A marca em slides usa **só o símbolo** — nunca o wordmark. Posição fixa:

- **Canto superior direito** do slide
- Tamanho: ~48px de altura

| Background do slide | Arquivo |
|--------------------|---------|
| Slide claro (`#F0F0F0`) | [`logos/apta-symbol-black.svg`](logos/apta-symbol-black.svg) |
| Slide escuro (`#222222`) | [`logos/apta-symbol-white.svg`](logos/apta-symbol-white.svg) |

**Não usar em slides:**
- Logo wordmark (`apta-logo-black/white.svg`)
- Numeração de página
- Header/footer com texto de branding

### 13.5 Hierarquia visual de um slide

Estrutura recomendada de cima para baixo:

1. **Símbolo** no canto superior direito (48px)
2. **Overline / chip** opcional (label de seção, severidade, contador)
3. **Título** a 124px (pode ocupar 1–3 linhas)
4. **Subtítulo** opcional a 40px
5. **Conteúdo** (cards, listas, imagens) — adapta ao espaço restante respeitando os 96px de margem

A composição respeita whitespace generoso — não comprimir conteúdo para caber elementos extras.

---

## 14. Documentos & Entregáveis · Padrões

Regras obrigatórias para **qualquer entregável** produzido a partir de um conteúdo enviado pelo cliente/time — PDF, documento, ponte de conteúdo, Figma, slides, web, ou qualquer outro formato.

### 14.1 Fidelidade ao conteúdo (regra inegociável)

- O entregável é **100% fiel ao conteúdo enviado**. Reproduzir exatamente o que foi mandado — mesmas seções, mesma ordem, mesmo texto.
- **Não criar nada além do conteúdo enviado.** Não inventar seções, textos, dados, resumos, "introduções", chips/labels ou qualquer informação que não esteja na fonte.
- O trabalho é **diagramar e aplicar a identidade Apta**, não reescrever nem ampliar o conteúdo.

### 14.2 Sem metadados fabricados

- **Nunca** adicionar blocos do tipo "Prepared by / Document / Platform / Date / Versão / Autor" nem qualquer especificação de quando ou por quem o documento foi feito.
- Se o cliente não enviou esse dado, ele **não existe** no entregável.

### 14.3 Capa — só quando solicitada

- **Só criar capa se ela for explicitamente pedida.** Sem pedido, o documento começa direto no conteúdo.
- Quando houver capa:
  - **Full-bleed**: o fundo preenche a página inteira, de ponta a ponta. **Sem borda/moldura branca**, sem cantos arredondados visíveis nas bordas da página.
  - Usar **a logo completa** (`apta-logo-white.svg` em fundo escuro / `apta-logo-black.svg` em fundo claro). Wordmark "apta" por extenso.
  - **Nunca usar o símbolo isolado** (`apta-symbol-*`) na capa, e **nunca combinar wordmark + símbolo** na mesma peça — usar logo e símbolo juntos não faz sentido e quebra a identidade.
  - Conteúdo da capa limitado ao que existe na fonte (ex.: título real do documento). Sem subtítulos inventados nem chips decorativos fabricados.

### 14.4 Sem cromos de página

- **Sem cabeçalho/rodapé corridos** e **sem numeração de página** em entregáveis (mesma regra dos slides — ver §13).
- As margens das páginas de conteúdo são apenas **whitespace limpo**. A marca aparece só na capa (quando houver).

### 14.5 Aplicação da identidade

- Tipografia, paleta, espaçamento, componentes e efeitos seguem este design system (Inter Tight, paleta monocromática, whitespace generoso, look editorial).
- O objetivo é o conteúdo enviado vestido com a identidade Apta — nada mais, nada menos.

---

## 15. Referência Figma

**Arquivo master:** [Apta Agency @ Master File](https://www.figma.com/design/VstMDyTTVK9nqsbq0QJWU7/Apta-Agency---Master-File)
**Página de brand:** Brand Guide (node-id=7794-349)
**Seções:** BRAND > Brand Guide, FOCUS, OBS
**Text Styles:** Heading (Desktop/Mobile), Text
**Effect Styles:** xxsmall, xsmall, small, medium, large, xlarge, xxlarge
