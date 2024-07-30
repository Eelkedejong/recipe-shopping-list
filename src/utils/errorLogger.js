import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'localhost',
    import.meta.env.FRONTEND_URL,
    /^https:\/\/yourserver\.io\/api/,
  ],
  // Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

const logError = (error, context = '') => {
  Sentry.captureException(error);
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
};

export default logError;
