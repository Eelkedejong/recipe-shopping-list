/**
 * Test harness for component tests.
 *
 * Components here need four providers to mount at all: Redux, i18n, a router
 * (for useNavigate) and TanStack Query. Rather than repeat that in every file,
 * renderWithProviders wraps them.
 *
 * Two deliberate choices:
 *
 * - **A fresh store per render.** The app's store is a module singleton, so
 *   sharing it would leak the ingredient draft between tests and make failures
 *   depend on file order.
 * - **i18n returns the key itself.** The real setup fetches locale JSON over
 *   HTTP, which tests should not do. Missing keys resolve to the key, so a
 *   test queries for `Persons` and does not break when the Dutch wording
 *   changes. It does mean these tests check structure, not translation - the
 *   nl/en parity rule is checked separately in translations.test.js.
 */
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';

import user from '@store/userSlice';
import searchParams from '@store/searchParamsSlice';
import publicSearchParams from '@store/publicSearchParamsSlice';
import shoppingListRecipes from '@store/shoppingListRecipesSlice';
import ingredientList from '@store/ingredientSlice';

/** A store with the app's real reducers but no shared state. */
export const makeStore = (preloadedState) =>
  configureStore({
    reducer: {
      user,
      searchParams,
      publicSearchParams,
      shoppingListRecipes,
      ingredientList,
    },
    preloadedState,
  });

const makeI18n = () => {
  const instance = createInstance();
  instance.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: { en: { translation: {} } },
    interpolation: { escapeValue: false },
    // Return the key, with any interpolation applied, so assertions can be
    // written against readable English.
    parseMissingKeyHandler: (key) => key,
  });
  return instance;
};

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      // Retries turn one failed request into a multi-second test.
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

export const renderWithProviders = (
  ui,
  { store = makeStore(), route = '/', queryClient = makeQueryClient() } = {}
) => {
  const result = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={makeI18n()}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );

  return { ...result, store, queryClient };
};

/**
 * Stubs fetch for the ingredient catalog, which several components request on
 * mount. Returns the mock so a test can assert on it or override the body.
 */
export const stubCatalogFetch = (body = { data: [] }) => {
  const mock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => body,
  });
  vi.stubGlobal('fetch', mock);
  return mock;
};
