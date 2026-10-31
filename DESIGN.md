# Design system

Read this before styling work or any visual change.

## One source of truth

**Every design value lives in `src/styles/tailwind.css`**, in the
`@theme static` block. Tailwind turns each token into a utility *and* emits
it as a CSS custom property on `:root`, so the same token is used two ways:

| Where | How | Example |
|---|---|---|
| JSX | Tailwind utility | `bg-main text-sm rounded-md shadow-card` |
| `.module.scss` | `var()` | `background: var(--color-main);` |

Change a value in `tailwind.css` and every use follows. To restyle the app,
that file is the place to start.

**The only exception is breakpoints.** Media queries can't read custom
properties, so `src/styles/variables.scss` keeps a Sass copy (`$screen-*`)
for the `screen-*()` mixins. Change the two together. Nothing else belongs in
`variables.scss` — don't add Sass colour or size variables back.

Tailwind's default colour, font-size, radius and shadow scales are switched
off (`--color-*: initial` etc.). A class like `bg-red-500` or `shadow-xl`
simply does nothing. That is
deliberate: if a value is missing, **add a token** rather than reaching for
an arbitrary value or a hex code.

## Tokens

### Colour

| Token | Use |
|---|---|
| `main` | The brand colour: buttons, links, active states, accents |
| `main-dark` | Hover/active on primary |
| `main-bg` | Tinted surface: chips, highlighted rows, ingredient panel |
| `secondary` | Teal accent: vegetarian tag, selected chip, focus |
| `white`, `light-grey`, `medium-grey` | Surfaces: cards, controls, page |
| `grey`, `dark-grey`, `black` | Text: muted, body, headings |
| `black-full` | Hover on dark buttons |
| `line` | Default border and divider |
| `line-subtle` | Dividers inside panels, dialogs and menus |
| `line-strong` | Form control borders (inputs, checkboxes, radios) |
| `focus` | Focus border/outline on controls (aliases `secondary`) |
| `disabled` | Disabled control fill and border |
| `backdrop` | Behind dialogs, drawers and the mobile search overlay |
| `success`, `success-bg`, `error`, `error-bg` | `.message` alerts |

`line-strong` and `focus` are aliases of other tokens. Repoint the alias
to restyle every control at once, without touching the base colour.

### Type

Two families: `font-logo` (Titan One) and `font-main` (Poppins, set on
`body`). Both have system fallbacks.

| Token | Size | Use |
|---|---|---|
| `text-2xs` | 10px | Floating labels on inputs/selects |
| `text-xs` | 12px | Chips, captions, sticky-nav labels |
| `text-sm` | 14px | Secondary text, list items, filters |
| `text-base` | 16px | Body |
| `text-lg` | 18px | Buttons, emphasis |
| `text-xl` | 20px | Section, dialog and drawer titles |
| `text-2xl` | 24px | Page titles on mobile |
| `text-3xl` | 28px | Page titles |
| `text-4xl` | 32px | Recipe titles |

The sizes have **no line-height companion** on purpose: the utilities set
`font-size` only and line-height keeps being inherited. Don't add
`--text-*--line-height`; it would change every existing use.

### Radius

`rounded-sm` (10px) for buttons, inputs, chips and small cards;
`rounded-md` (20px) for cards, panels and images; `rounded-lg` (30px) for
page sections and large sheets. Use `rounded-full` for circles and pills.

### Shadow

`shadow-card`, `shadow-card-hover` (recipe tiles), `shadow-popover` (menus,
dialogs, dragged items), `shadow-top` (bars fixed to the bottom of the
screen and the bottom sheet).

### Motion

`--duration-fast` (0.2s) for small controls, `--duration-base` (0.3s) for
everything else, and `--transition-base` (`all` at base duration) as the
default `transition`. The drawer keeps its own spring curve.

### Stacking

Only the overlay layers are tokens, because they depend on each other:
`--z-modal` (dialog/drawer backdrop, popup at `+ 1`) and `--z-popover`
(select/combobox menus, above modals). In JSX: `z-(--z-modal)`. Page-level
z-indexes (sticky nav, header) stay local to their stylesheet.

### Spacing

Tailwind's default spacing scale (`p-4`, `gap-6`, …), on purpose. There is
no project spacing scale.

### Breakpoints

```
xxs 360   xs 480   s 768   m 1200   l 1400   xl 1600   xxl 2000
```

Mobile-first `m:` and the project's own `max-m:` variants. The `max-*`
variants are **inclusive** (`width <= 1200px`) to match the Sass mixins, and
read the `--breakpoint-*` tokens. Use them, not Tailwind's built-in
exclusive `max-*`.

Per the root `PRODUCT.md`: the grocery list is used one-handed in a
supermarket, the recipe form at a desk. Design each for where it is used.

### Theme

One light theme. No dark mode and no `prefers-color-scheme` handling.

## Rules

- **No hex codes, `rgba()`, or px font sizes/radii outside `tailwind.css`.**
  Use a token; add one if it's missing.
- **No inline `style={{}}`** except for runtime values, such as a
  background-image URL.
- Arbitrary Tailwind values (`w-[…]`) are fine for one-off layout sizes,
  not for colours, type, radius or shadow.
- Component styling belongs in `components/ui/`, page layout in the page's
  `.module.scss`.

## Cascade

Tailwind's Preflight is off; the project ships `reset.scss` instead
(`all: unset` on everything — see `CLAUDE.md`). Utilities are imported
*unlayered* on purpose so the cascade order stays
`reset -> defaults -> utilities -> page styles -> component modules`. Don't
put them in a layer; they would lose to every unlayered rule, the reset
included.
