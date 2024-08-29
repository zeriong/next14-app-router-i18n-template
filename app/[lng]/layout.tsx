import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import PortalHeader from '@/components/layout/PortalHeader';
import { LOCALE_COOKIE } from '@/constants/common';
import { Locale } from '@/libs/i18n';
import { LocaleProvider } from '@/libs/i18n/client/LocaleProvider';
import getTranslation from '@/libs/i18n/utils/getTranslation';
import loadTranslation from '@/libs/i18n/utils/loadTranslation';
import redirectToLocale from '@/libs/i18n/utils/redirectToLocale';

export async function generateMetadata(): Promise<Metadata> {
  // 변경시킬 locale 번역 데이터를 받음
  const { t } = await getTranslation();

  // 결과에 맞는 데이터 반환
  return {
    title: t('Create Next'),
  };
}

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverLocale = (cookies().get(LOCALE_COOKIE)?.value || 'en') as Locale;
  const localeJson = await loadTranslation(serverLocale);

  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';

  // redirect 되는 경우 html 렌더링 자체를 막아야 redirection error 페이지를 거치지 않음
  if (pathname?.split('/')[1] !== serverLocale) {
    return redirect(redirectToLocale(serverLocale, pathname));
  }

  return (
    <html lang={serverLocale}>
      <body>
        <LocaleProvider value={{ serverLocale, localeJson }}>
          <PortalHeader />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
