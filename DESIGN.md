# Design system — current state

An audit of what the code actually does, taken 2026-10-31. **This is not yet
a finished design system**: the tokens exist, the rules layer does not. Where
a rule needs a decision it is marked **[open]** — ask rather than inventing
one.

Read this before styling work or any visual change.

## Where the tokens live

Two files, **hand-mirrored with no shared source**:

- `src/styles/variables.scss` — Sass variables, used by `.module.scss` files
- `src/styles/tailwind.css` — the `@theme` block, used by utility classes

They agree today. Nothing enforces that. **Change both together, or they
drift.** This is the single most likely way to introduce an inconsistency
here.

Tailwind's Preflight is deliberately off; the project ships `reset.scss`
instead. Utilities are imported *unlayered* on purpose so the cascade order
stays `reset -> defaults -> utilities -> page styles -> component modules`.
Don't "fix" that by putting them in a layer — they would lose to every
unlayered rule, the reset included.

## What is actually load-bearing

Usage counts across `src/`, which tell a different story from the token file:

| Token | Sass uses | JSX uses | Verdict |
|---|---|---|---|
| `color-main` `#f1a661` | 37 | 56 (`bg-`/`text-`) | **The** brand colour |
| `color-main-bg` `#ffebd4` | 5 | 16 | Primary tinted surface |
| `color-dark-grey` `#666` | 5 | 24 | Default body text |
| `rounded-10` / `rounded-20` | — | 54 | The only two radii in real use |
| `default-transition` `all .3s` | 12 | — | Standard interaction timing |
| `color-main-dark` `#e18733` | 3 | — | Hover/active on primary |
| `color-black` `#333` | 4 | 6 | Headings |

So the real system is: **an amber primary, a grey text ramp, two radii, one
transition.** Much smaller than `variables.scss` suggests.

### Effectively dead tokens

Present in the token files, barely or never used. Don't build on these
without deciding they're real first:

- `--color-secondary` `#5c8d89` (teal) — 5 Sass, 2 JSX. The declared
  "secondary theme colour" is decorative at this point, not part of the system.
- `--color-lightest-grey` `#f1f5fe` — 1 use. It is **blue-tinted**, out of
  family with the warm amber palette, which is likely why nothing uses it.
- `rounded-30` — 0 uses. `rounded-35` — 1.
- `shadow-top` — 0 uses in JSX (5 in Sass). The only shadow in the system.
- `color-medium-grey`, `color-light-grey`, `color-grey` — 1 JSX use each.

## The gaps

These are real inconsistencies, not nitpicks. They were found by audit, and
none of them is visible from the token file alone.

### 1. There is no border colour token, and borders are everywhere

Hardcoded across the codebase: `#ddd`, `#dddddd`, `#eee`, `#ccc`, `#666`.

```
src/styles/App.scss:68                      border: 1px solid #dddddd
src/components/ui/Drawer/drawer.module.scss:68,109    #ddd, #eee
src/components/ui/Checkbox/checkbox.module.scss:23,35 #666, #ccc
src/components/ui/Radio/radio.module.scss:23,33       #666, #ccc
src/components/recipe/recipe.module.scss:202,203      #ddd
src/components/recipe/image/image.module.scss:5       #666 (dashed)
```

`$default-border: 1px solid #ddd` exists but is used only 3 times, and
hardcodes its own colour rather than referencing a token.

**[open]** Needs a border token set — probably a default border, a subtle
divider, and a control border — before these can be unified.

### 2. Semantic state colours exist entirely outside the system

`src/styles/App.scss` defines success and error states with six untokenised
hex values:

```scss
// success
color: #2b7515;  background: #ecffd6;  border-left: 3px solid #617c42;
// error
color: #ba3939;  background: #ffe0e0;  border-left: 3px solid #a33a3a;
```

These do real work in alerts and are the only green and red in the app.
**[open]** They should be tokens. Nothing else can use them until they are.

### 3. No spacing scale of its own

The project inherits Tailwind's default spacing. That is a reasonable choice
— but it is undocumented, so it reads as an omission rather than a decision.
**[open]** Confirm it is deliberate.

### 4. Single light theme, undocumented

There is no dark mode and no `prefers-color-scheme` handling anywhere. That
appears to be a deliberate choice for a warm, light, food-focused look.
**[open]** Confirm, so it doesn't get half-implemented by accident later.

### 5. `#f5f5f5` is duplicated

`App.scss:4` hardcodes it where `$color-light-grey` already holds the same
value.

## Type

Two families: `Titan One` for the logo, `Poppins` for everything else.

Sizes are keyed by pixel value — `--text-12` through `--text-36` — and
deliberately ship **without** a `--text-*--line-height` companion, so the
utilities set `font-size` only and line-height keeps being inherited. Don't
add line-height pairs to these; it would change every existing use.

**[open]** Nothing records which size means what (page title, card title,
body, caption). That mapping is the main thing a rules layer would add.

## Breakpoints

Seven, mirrored between the Sass mixins and Tailwind's `@custom-variant`:

```
xxs 360   xs 480   s 768   m 1200   l 1400   xl 1600   xxl 2000
```

The `max-*` variants use an **inclusive** `max-width` to match the Sass
mixins, rather than Tailwind's exclusive default. Keep using the project
variants, not Tailwind's built-in `max-*`.

Per the root `PRODUCT.md`: the grocery list is used one-handed in a
supermarket, the recipe form at a desk. Design each for where it is used.

## Before a visual refactor

The public recipe browser becoming the primary experience (see `PRODUCT.md`)
is a visual change. Two things are worth settling first:

1. Fill in the **[open]** items above — borders, state colours, the type
   scale's roles — so the refactor has a system to build on.
2. Decide whether the teal secondary and the blue-tinted grey are part of the
   palette or should be dropped. Right now they are neither used nor removed.
