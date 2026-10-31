/**
 * Row identity for a recipe's ingredients - the frontend half.
 *
 * The backend has the same concept in src/modules/recipe-rows.ts, tested in
 * recipe-data/test/recipe-rows.test.ts. Both sides have to agree, because an
 * id assigned here is stored by the server and later read back as the key a
 * shopping list excludes.
 *
 * The bug these pin: IngredientsList used to renumber every row to
 * `index + 1` on load. Reordering ingredients therefore corrupted the grocery
 * list - but only on the *next* visit, which is why it went unnoticed.
 */
import { describe, test, expect } from 'vitest';
import { nextRowId, withStableRowIds } from '@utils/ingredientRows';

const ids = (rows) => rows.map((r) => r.id);
const names = (rows) => rows.map((r) => r.name);

describe('nextRowId', () => {
  test('counts from the highest id, not the length', () => {
    // The length would hand out 3, which the last row already holds. Deleting
    // a row leaves a gap, so length and highest id are not the same thing.
    expect(nextRowId([{ id: 1 }, { id: 3 }])).toBe(4);
  });

  test('starts at 1 for an empty list', () => {
    expect(nextRowId([])).toBe(1);
  });

  test('tolerates rows without ids', () => {
    expect(nextRowId([{ name: 'ui' }, { id: 2 }])).toBe(3);
  });

  test('tolerates not being given an array', () => {
    expect(nextRowId(undefined)).toBe(1);
    expect(nextRowId(null)).toBe(1);
  });
});

describe('withStableRowIds', () => {
  test('leaves existing ids alone', () => {
    const rows = [
      { id: 1, name: 'flammkuchendeeg' },
      { id: 2, name: 'crème fraîche' },
    ];

    expect(ids(withStableRowIds(rows))).toEqual([1, 2]);
  });

  test('THE BUG: a reorder must not renumber anything', () => {
    const reordered = [
      { id: 3, name: 'spek' },
      { id: 1, name: 'flammkuchendeeg' },
      { id: 2, name: 'crème fraîche' },
    ];

    const result = withStableRowIds(reordered);

    expect(names(result)).toEqual(['spek', 'flammkuchendeeg', 'crème fraîche']);
    expect(ids(result)).toEqual([3, 1, 2]);
  });

  test('fills a missing id from above the highest in use', () => {
    const rows = [{ id: 1, name: 'deeg' }, { name: 'ui' }, { id: 2, name: 'spek' }];

    // Not 2 - that is taken, and reusing it would point an existing exclusion
    // at the wrong ingredient.
    expect(ids(withStableRowIds(rows))).toEqual([1, 3, 2]);
  });

  test('the first claim on an id keeps it; the duplicate moves', () => {
    const rows = [
      { id: 1, name: 'deeg' },
      { id: 1, name: 'ui' },
    ];

    const result = withStableRowIds(rows);

    expect(result[0]).toMatchObject({ id: 1, name: 'deeg' });
    expect(result[1]).toMatchObject({ id: 2, name: 'ui' });
  });

  test('a duplicate is treated as seriously as a missing id', () => {
    // Two rows with one id break the React key, the drag handle and the
    // exclusion all at once - which is how a loaded recipe's first row once
    // rendered blank.
    const rows = [{ id: 1 }, { id: 1 }, { id: 1 }];
    const result = ids(withStableRowIds(rows));

    expect(new Set(result).size).toBe(3);
  });

  test('replaces ids that are not usable', () => {
    const rows = [{ id: 0 }, { id: -2 }, { id: 1.5 }, { id: '3' }, { id: null }, {}];
    const result = ids(withStableRowIds(rows));

    expect(result).toHaveLength(6);
    result.forEach((id) => {
      expect(Number.isInteger(id)).toBe(true);
      expect(id).toBeGreaterThan(0);
    });
    expect(new Set(result).size).toBe(6);
  });

  test('keeps every other field on the row', () => {
    const [row] = withStableRowIds([
      { name: 'ui', amount: '2', unit: 'stuks', prep: 'gesnipperd', ingredientId: 'abc' },
    ]);

    expect(row).toEqual({
      name: 'ui',
      amount: '2',
      unit: 'stuks',
      prep: 'gesnipperd',
      ingredientId: 'abc',
      id: 1,
    });
  });

  test('returns an empty array rather than throwing on bad input', () => {
    expect(withStableRowIds(undefined)).toEqual([]);
    expect(withStableRowIds(null)).toEqual([]);
    expect(withStableRowIds('nope')).toEqual([]);
  });

  test('is idempotent - running it twice changes nothing', () => {
    const rows = [{ name: 'a' }, { id: 5, name: 'b' }, { name: 'c' }];

    const once = withStableRowIds(rows);
    const twice = withStableRowIds(once);

    expect(ids(twice)).toEqual(ids(once));
  });
});
