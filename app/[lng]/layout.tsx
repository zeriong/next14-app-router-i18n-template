import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import PortalHeader from '@/components/layout/PortalHeader';
import { LOCALE_COOKIE } from '@/constants/common';
import { Locale, i18nConfig } from '@/libs/i18n';
import { LocaleProvider } from '@/libs/i18n/client/LocaleProvider';
import getTranslation from '@/libs/i18n/utils/getTranslation';
import loadTranslation from '@/libs/i18n/utils/loadTranslation';
import redirectToLocale from '@/libs/i18n/utils/redirectToLocale';

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { lng: Locale } }): Promise<Metadata> {
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
