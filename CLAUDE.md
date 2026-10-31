# recipe-shopping-list — the frontend

React 19 + Vite + Tailwind v4, deployed to Vercel at `mijn-kookboek.nl`.
See `../CLAUDE.md` for deploy and database rules shared with the API, and
**`DESIGN.md` in this repo before any styling or visual work** — all design
tokens live in `src/styles/tailwind.css`, and it explains how to use them.

## Stack and what each piece owns

| Concern       | Tool                                                             |
| ------------- | ---------------------------------------------------------------- |
| UI primitives | **Base UI** (`@base-ui/react`)                                   |
| Styling       | Tailwind v4, plus `.module.scss` for page-level layout           |
| Server data   | **TanStack Query**                                               |
| Client state  | **Redux Toolkit** — filters, search params, the ingredient draft |
| Routing       | react-router 8, routes declared in `src/Layout.jsx`              |
| i18n          | react-i18next, `public/locales/{nl,en}/translation.json`         |
| Drag & drop   | dnd-kit                                                          |
| Images        | Cloudinary                                                       |

`@/` aliases `src/`. Pages are lazy-loaded in `Layout.jsx`; keep new ones
lazy unless they are on the first paint.

The split between Redux and TanStack Query is intentional: **server data is
never mirrored into Redux.** Redux holds what the user is choosing
(`searchParamsSlice`, `publicSearchParamsSlice`, `ingredientSlice`,
`shoppingListRecipesSlice`, `userSlice`); the query cache holds what the
server said. Don't copy one into the other.

## The global reset changes everything

`src/styles/reset.scss` applies `all: unset` to essentially every element:

```scss
*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
  all: unset;
  display: revert;
}
```

Consequences, all of which have bitten:

- **Native form controls render invisible.** A bare `<input type="checkbox">`
  or `<select>` is simply not there. Every control must bring its own styling
  — which is why `components/ui/` exists.
- No inherited user-agent styling of any kind. If a heading looks right, some
  rule is making it so; don't assume a default.
- Never add a plain native control and expect it to be usable.

## UI components

`src/components/ui/` wraps Base UI: `Button`, `Checkbox`, `CheckboxGroup`,
`Collapsible`, `Combobox`, `Dialog`, `Drawer`, `Fields`, `Input`, `Radio`,
`Select`, `Textarea`. **Use these** and add more base UI elements if necessary.
Always ask before adding a new UI element. Don't hand-roll a primitive that exists
here, and don't reach for a different UI library.

### Specific couplings that look like noise but aren't

- **Checkboxes in the recipe form must keep their `name` and must not set
  `value`.** The form is read with `FormData`; changing either silently
  breaks submission.
- **`PersonSelector` must stay nameless** — no `name` attribute. Adding one
  corrupts the shopping list form submission.
- **Interactive controls inside a dnd-kit drag handle need
  `onPointerDown={(e) => e.stopPropagation()}`.** Base UI's click handling
  and dnd-kit's pointer sensor otherwise fight and the control never fires.
- **Mobile drawers:** Navigation and Filters render inline on desktop and as
  Base UI bottom sheets on mobile. Both paths exist in the same component —
  check both when editing either.

## React patterns

- **No `useEffect` for state derived from props.** Use the
  resync-during-render pattern:

  ```jsx
  const [syncedFrom, setSyncedFrom] = useState(ingredient);
  if (ingredient !== syncedFrom) {
    setSyncedFrom(ingredient);
    setRowData(ingredient);
  }
  ```

  `useEffect` for this is an anti-pattern here and will be rejected in
  review. `useEffect` is for genuine side effects — subscriptions, imperative
  DOM, non-React systems.

- **Never key a list by array index**, and never derive an id from position.
  See below.

## Ingredient row ids

`src/utils/ingredientRows.js` owns this. `withStableRowIds()` keeps existing
ids and fills only missing or colliding ones; `nextRowId()` allocates the
next.

The reason is cross-cutting: row ids travel to the server, get stored in the
recipe JSON, and are referenced by `listState.excludedRows` in shopping
lists. Renumbering on load (which the code used to do, via `index + 1`)
means a reorder in one session excludes the **wrong ingredient** from the
grocery list on the next visit.

Also note: Redux `initialState` uses `id: 1`, so a loaded recipe's first row
colliding on `id: 1` once caused React to reuse the component and render the
first ingredient blank. Stable, unique ids are what prevent both bugs.

## i18n

Every user-facing string goes through `t()`. **Both** `nl` and `en`
translation files get the key in the same change — a string added to one
only is a bug. Dutch is the primary language.

## Routes

Declared in `src/Layout.jsx`:

```
/                      Overview
/recipes               own recipes          (auth)
/recipes/all           public browser
/recipes/all/:type     public, by type
/recipe/:id            own recipe detail    (auth)
/public/recipe/:id     public recipe detail
/recipe/new            create               (auth)
/recipe/edit/:id       edit                 (auth)
/shopping-list         pick recipes         (auth)
/list                  grocery list         (auth)
```

Per `PRODUCT.md` the public routes are the primary experience. Treat them as
the default case, not the fallback.

## Known rough edges

Reported and deliberately not fixed yet — don't "discover" them as new:

- **Empty aisles aren't rendered**, so hand-added items can't be dragged into
  them. On a typical list 4 of 11 aisles are unreachable.
- Unmerged quantities render as `2 el + 100 g`. This is the unit model
  working, not a bug: spoons and grams have different base units and cannot
  be summed without guessing a density. Only the presentation is terse.
- Extras can be removed on `/shopping-list` but not on `/list`.
- Unlinked ingredients silently land under _Overig_; the count the API
  computes is never shown.

## Testing

`npm test` — Vitest + Testing Library in jsdom. `npm run test:watch` while
working. Config is `vitest.config.js`, kept separate from `vite.config.js`
so tests don't load Tailwind and imagetools; **the aliases are duplicated
there and must stay in step.**

**New work ships with tests** — see the root `CLAUDE.md` for the rule. A
feature or fix without tests in the same change is not finished.

```
test/helpers.jsx            renderWithProviders: Redux + i18n + router + Query
test/ingredientRows.test.js row identity (the grocery-list exclusion bug)
test/RecipeForm.test.jsx    the FormData checkbox coupling
test/PersonSelector.test.jsx  the nameless constraint
test/translations.test.js   nl/en parity
```

Conventions:

- **Query by role and text, never by class.** CSS is not processed in tests,
  so `styles.foo` is undefined there. This is deliberate — it keeps tests
  describing what a user can see.
- **i18n returns the key**, so assertions read as English. Translation
  coverage is checked separately in `translations.test.js`.
- **A fresh store per render.** The app's store is a module singleton;
  sharing it leaks the ingredient draft between tests.
- **Prove a new test fails before trusting it.** Break the code, watch the
  right test go red, restore.

Two jsdom gotchas that cost time: `matchMedia` and `ResizeObserver` don't
exist and are stubbed in `test/setup.js`; and **Base UI marks the rest of the
page `aria-hidden` while a popup is open**, so after typing in a combobox
every other control is invisible to role queries until you press Escape.

### Not covered

Drag and drop. dnd-kit's pointer sensors need real layout and pointer events,
which jsdom does not provide — testing it there mostly tests the mocks.
Browser-level tests are the right tool for the drag behaviour.

## Gaps

- ESLint is configured (`eslint.config.js`) with react-hooks, jsx-a11y and
  import plugins — run it. **33 pre-existing errors**, all unused variables,
  none in files touched recently.
- The 15 Dutch translations added on 2026-10-31 were written to fill gaps the
  test suite found; they are plain and functional rather than considered copy,
  and are worth a read-through.
