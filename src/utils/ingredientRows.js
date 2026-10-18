/**
 * Row identity for a recipe's ingredients.
 *
 * Every row carries an `id`, and that id is what a shopping list stores in
 * `excludedRows` when someone unticks an ingredient. So an id has to mean the
 * same row for as long as the row exists: reassign them by position and a
 * reorder silently moves somebody's exclusion onto a different ingredient.
 *
 * Ids are therefore kept as stored and only ever handed out for new rows,
 * which is why `nextRowId` counts from the highest id rather than the length -
 * deleting a row leaves a gap, and counting the length would hand out an id
 * that is already in use.
 */

/** The highest id in use, or 0 when there are none. */
const highestId = (rows) =>
  rows.reduce(
    (highest, row) =>
      Number.isInteger(row?.id) && row.id > highest ? row.id : highest,
    0,
  );

/** The id a row added now should get. */
export const nextRowId = (rows) => highestId(Array.isArray(rows) ? rows : []) + 1;

/**
 * Makes sure every row has an id that is unique within the recipe, without
 * disturbing the ids already there.
 *
 * Rows missing one - recipes saved before ids existed - get numbered from the
 * highest id downwards into the gaps, so the ids already referenced elsewhere
 * keep pointing at the rows they always did.
 */
export const withStableRowIds = (rows) => {
  if (!Array.isArray(rows)) return [];

  const taken = new Set();
  let next = highestId(rows) + 1;

  return rows.map((row) => {
    const stored = row?.id;
    // A duplicate is as bad as a missing id: two rows that cannot be told
    // apart break the React key, the drag handle and the exclusion alike.
    if (Number.isInteger(stored) && stored > 0 && !taken.has(stored)) {
      taken.add(stored);
      return row;
    }

    const id = next++;
    taken.add(id);
    return { ...row, id };
  });
};
