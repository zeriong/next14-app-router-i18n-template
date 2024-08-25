'use client';

import React, { createContext, useContext } from 'react';

import { Locale } from '@/libs/i18n';
import {
  KeyOfTranslation,
  Translation,
  ValueOfTranslation,
} from '@/libs/i18n/utils/loadTranslation';

interface IContext {
  serverLocale: Locale;
  localeJson: Translation | null;
}

interface Props {
  value: IContext;
  children: React.ReactNode;
}

interface IUseTranslation {
  t: (content: KeyOfTranslation) => ValueOfTranslation;
}

export const LocaleContext = createContext<IContext>({
  localeJson: null,
  serverLocale: 'en',
});
export const useLocaleContext = () => useContext(LocaleContext);

export const LocaleProvider = ({ value, children }: Props) => (
  <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
);

export const useTranslation = (): IUseTranslation => {
  const { localeJson } = useLocaleContext();
  if (!localeJson) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  const t: IUseTranslation['t'] = (content: KeyOfTranslation) =>
    localeJson[content];
  return { t };
};
