export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'ko'],
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
