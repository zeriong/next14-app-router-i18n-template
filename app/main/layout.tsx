import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';

import MainHeader from '@/components/layout/MainHeader';
import { LOCALE_COOKIE } from '@/constants/common';
import { Locale } from '@/libs/i18n';
import { LocaleProvider } from '@/libs/i18n/client/LocaleProvider';
import getTranslation from '@/libs/i18n/utils/getTranslation';
import loadTranslation from '@/libs/i18n/utils/loadTranslation';

export async function generateMetadata(): Promise<Metadata> {
  // 변경시킬 locale 번역 데이터를 받음
  const { t } = await getTranslation();

  // 결과에 맞는 데이터 반환
  return {
    title: t('Create Next'),
    robots: 'noindex,nofollow',
  };
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  console.log('메인 레이아웃 쿠키체크: ', cookies().get(LOCALE_COOKIE)?.value);
  const serverLocale = (cookies().get(LOCALE_COOKIE)?.value || 'en') as Locale;
  const localeJson = await loadTranslation(serverLocale);

  return (
    <html lang={serverLocale}>
      <body>
        <LocaleProvider value={{ serverLocale, localeJson }}>
          <MainHeader />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
