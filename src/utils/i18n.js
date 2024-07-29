import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Language detection options, currently not used.
const options = {
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  cookieMinutes: 10,
  cookieDomain: 'myDomain',
  htmlTag: document.documentElement,
  cookieOptions: { path: '/', sameSite: 'strict' },
};

// Translation settings
i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: 'nl',
    fallbackLng: 'nl',
    debug: false,
    // detection: options,
    backend: {
      loadPath: '../locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
