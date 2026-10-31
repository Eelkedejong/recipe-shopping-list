/**
 * nl/en translation parity.
 *
 * The rule in CLAUDE.md is that every user-facing string goes through t() and
 * the locale files get the key in the same change. This file checks the half
 * of that rule which is machine-checkable, and it is pointed at Dutch for a
 * reason:
 *
 * The translation keys *are* English sentences, and i18next falls back to the
 * key when a translation is missing. So a key absent from `en` still renders
 * correct English - which is why 119 nl keys have no en entry and the English
 * interface is fine. A key absent from `nl` is the real failure: a Dutch
 * visitor, on a Dutch-first site, is shown English.
 */
import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const localesDir = path.join(import.meta.dirname, '..', 'public', 'locales');
const srcDir = path.join(import.meta.dirname, '..', 'src');

const read = (lang) =>
  JSON.parse(fs.readFileSync(path.join(localesDir, lang, 'translation.json'), 'utf8'));

const nl = read('nl');
const en = read('en');

/** Interpolation placeholders like {{name}}, which must match across locales. */
const placeholders = (value) =>
  typeof value === 'string' ? (value.match(/\{\{[^}]+\}\}/g) ?? []).sort() : [];

/**
 * Every t('literal') in the source.
 *
 * Only plain string literals: template literals and variables cannot be
 * resolved statically, so this is a floor on coverage rather than a complete
 * picture. Worth remembering before concluding a string is covered.
 */
const usedKeys = () => {
  const unescapeQuotes = (s) => s.replace(/\\(['"\\])/g, '$1');
  const found = new Set();

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
        const src = fs.readFileSync(full, 'utf8');
        for (const m of src.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) {
          found.add(unescapeQuotes(m[1]));
        }
        for (const m of src.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"/g)) {
          found.add(unescapeQuotes(m[1]));
        }
      }
    }
  };

  walk(srcDir);
  return [...found];
};

/**
 * Strings used in the app that have no Dutch translation yet.
 *
 * Empty, and meant to stay that way. It exists so that if a gap ever reappears
 * it has to be written down deliberately rather than silently tolerated: the
 * test below fails on anything not listed here.
 */
const MISSING_NL_BASELINE = [];

describe('translation files', () => {
  test('both parse and are non-empty', () => {
    expect(Object.keys(nl).length).toBeGreaterThan(0);
    expect(Object.keys(en).length).toBeGreaterThan(0);
  });

  test('THE RULE: no new string ships without a Dutch translation', () => {
    const missing = usedKeys()
      .filter((key) => !(key in nl))
      .filter((key) => !MISSING_NL_BASELINE.includes(key))
      .sort();

    expect(
      missing,
      `used in code but missing from nl - add the Dutch translation: ${missing.join(' | ')}`
    ).toEqual([]);
  });

  test('the known-missing list has not grown', () => {
    const missing = usedKeys().filter((key) => !(key in nl));

    expect(
      missing.length,
      `expected at most ${MISSING_NL_BASELINE.length} untranslated strings`
    ).toBeLessThanOrEqual(MISSING_NL_BASELINE.length);
  });

  test('the baseline has no entries that are already translated', () => {
    // Keeps the list honest: once a string is translated it must leave the
    // baseline, or the baseline stops meaning anything.
    const stale = MISSING_NL_BASELINE.filter((key) => key in nl);

    expect(stale, `already translated, remove from the baseline: ${stale.join(' | ')}`).toEqual([]);
  });

  test('interpolation placeholders match between locales', () => {
    // "Move {{name}} to another aisle" must keep {{name}} in both, or the
    // Dutch string renders with the value missing.
    const mismatched = Object.keys(en)
      .filter((key) => key in nl)
      .filter((key) => placeholders(en[key]).join('|') !== placeholders(nl[key]).join('|'));

    expect(
      mismatched,
      `placeholders differ between nl and en for: ${mismatched.join(' | ')}`
    ).toEqual([]);
  });

  test('no translation value is left empty', () => {
    const blank = [
      ...Object.entries(nl)
        .filter(([, v]) => typeof v === 'string' && v.trim() === '')
        .map(([k]) => `nl:${k}`),
      ...Object.entries(en)
        .filter(([, v]) => typeof v === 'string' && v.trim() === '')
        .map(([k]) => `en:${k}`),
    ];

    expect(blank, `empty translations: ${blank.join(' | ')}`).toEqual([]);
  });

  test('orphaned en keys stay at the known count', () => {
    // en still holds "The username or password did not match. Please try
    // again." while nl has the newer "The username, email or password did not
    // match. Please try again." Harmless, but dead data.
    const orphans = Object.keys(en).filter((key) => !(key in nl));

    expect(orphans.length, `orphaned en keys: ${orphans.join(' | ')}`).toBeLessThanOrEqual(1);
  });
});
