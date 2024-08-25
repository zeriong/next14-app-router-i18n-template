import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import React from 'react';

import PortalHeader from '@/components/layout/PortalHeader';
import { LOCALE_COOKIE } from '@/constants/common';
import { Locale, i18nConfig } from '@/libs/i18n';
import { LocaleProvider } from '@/libs/i18n/client/LocaleProvider';
import getTranslation from '@/libs/i18n/utils/getTranslation';
import loadTranslation from '@/libs/i18n/utils/loadTranslation';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lng: Locale };
}): Promise<Metadata> {
  // locale쿠키의 값과 params가 다른경우에는 쿠키를 기반으로 적용
  // (main 페이지에서 변경된 사항을 알 수 있는 방법은 쿠키뿐이기 때문에 하이드레이션시켜주기 위함)
  const lng = (cookies().get(LOCALE_COOKIE)?.value || params.lng) as Locale;

  // 변경시킬 locale 번역 데이터를 받음
  const translation = await getTranslation(lng);

  // 결과에 맞는 데이터 반환
  return {
    title: translation('Create Next'),
  };
}

export default async function LandingPageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lng: Locale };
}>) {
  const serverLocale = (cookies().get(LOCALE_COOKIE)?.value || 'en') as Locale;
  const localeJson = await loadTranslation(serverLocale);

  return (
    <html lang={cookies().get(LOCALE_COOKIE)?.value || params.lng}>
      <body className={inter.className}>
        <LocaleProvider value={{ serverLocale, localeJson }}>
          <PortalHeader />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
