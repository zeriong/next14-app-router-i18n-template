import { NextRequest, NextResponse } from 'next/server';
import { Locale, i18nConfig } from './libs/i18n';
import {getMatchingLocale} from "@/libs/i18n/utils/getMatchingLocale";

export default function middleware(request: NextRequest) {
  // Internationalization.

  // Loop through available locales in i18n config, set to true when
  // iterated locale is not found in current request url.
  const localeNotFound: boolean = i18nConfig.locales.every(
    (locale: Locale) =>
      !request.nextUrl.pathname.startsWith(`/${locale}/`) &&
      request.nextUrl.pathname !== `/${locale}`
  );

  // Locale not found in request url, redirect to matched locale url.
  if (localeNotFound) {
    // Get matching locale for user.
    const newLocale: Locale = getMatchingLocale(request);

    // Return new url redirect and redirect user to correct locale url.
    return NextResponse.redirect(
      new URL(`/${newLocale}/${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  // url 자동 리디렉션 변환을 제외할 대상을 괄호안에 삽입 (main을 넣어 해당 페이지로 이동 시 locale url 미생성)
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|main|favicon.ico).*)'],
};
