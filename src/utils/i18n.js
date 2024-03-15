import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const options = {
  // Order and from where user language should be detected
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

  // Keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // Cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // Optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // Optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // Optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' },
};

i18n
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  .use(HttpApi)
  // Init i18next
  // For all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'nl',
    debug: false,
    // detection: options,
    backend: {
      loadPath: '../locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  });

export default i18n;
