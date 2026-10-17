/**
 * Client-side ingredient matching.
 *
 * Kept free of React so it can be exercised on its own: this is where the
 * behaviour that matters lives (aliases, accents, prefix-before-substring),
 * and it is the part worth checking against the real catalog.
 */

/** Folds accents and punctuation so "creme fraiche" finds "crème fraîche". */
export const fold = (input) =>
  (input ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * Precomputes the folded terms each ingredient can be found by: its name, its
 * plural, and every alias. Done once per fetch rather than per keystroke.
 */
export const buildSearchable = (ingredients = []) =>
  ingredients.map((ingredient) => ({
    ...ingredient,
    searchTerms: [
      ...new Set(
        [ingredient.nameNl, ingredient.nameNlPlural, ...(ingredient.aliases ?? [])]
          .filter(Boolean)
          .map(fold)
      ),
    ],
  }));

/**
 * Ranked match, in three tiers:
 *
 *   0  the term starts with the query          "ui" -> ui, uien
 *   1  a whole word inside the term matches     "ui" -> rode ui, lente-ui
 *   2  it appears anywhere else                 "ui" -> suiker, tonijn

 * Short queries only reach tier 1 on a whole-word hit; from four characters
 * a word prefix is enough. Without that, "ui" promotes every alias that
 * happens to contain "uit blik".
 *
 * Tier 2 is kept rather than dropped because Dutch compounds genuinely need
 * it - "kaas" has to find "geitenkaas" - but it sorts last, so the noise sits
 * below the useful matches instead of crowding them out.
 *
 * An empty query returns nothing: suggestions appear from the first
 * character.
 */
export const rankIngredients = (searchable, query, limit = 8) => {
  const q = fold(query);
  // Nothing typed, nothing to suggest. A slice of the catalog here would be
  // arbitrary - it would just be whatever sorts first.
  if (!q) return [];

  const scored = [];
  for (const ingredient of searchable) {
    let best = Infinity;
    for (const term of ingredient.searchTerms) {
      if (term.startsWith(q)) {
        best = 0;
        break;
      }
      const at = term.indexOf(q);
      if (at === -1) continue;

      // A word inside the term starts with the query. Short queries only earn
      // this tier on a whole-word hit, otherwise "ui" promotes every alias
      // containing "uit blik".
      const atWordStart = term[at - 1] === ' ';
      const endsWord = at + q.length === term.length || term[at + q.length] === ' ';
      const strongWord = atWordStart && (endsWord || q.length >= 4);

      best = Math.min(best, strongWord ? 1 : 2);
    }
    if (best < Infinity) scored.push({ ingredient, score: best });
  }

  return scored
    .sort(
      (a, b) =>
        a.score - b.score ||
        a.ingredient.nameNl.length - b.ingredient.nameNl.length ||
        a.ingredient.nameNl.localeCompare(b.ingredient.nameNl)
    )
    .slice(0, limit)
    .map((entry) => entry.ingredient);
};
