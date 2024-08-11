import { NextRequest, NextResponse } from 'next/server';
import { Locale, i18nConfig } from './libs/i18n';
import {getMatchingLocale} from "@/libs/i18n/utils/getMatchingLocale";
import {LOCALE_COOKIE} from "@/constants/common";
import redirectToLocale from "@/libs/i18n/utils/redirectToLocale";

export default function middleware(request: NextRequest) {
  // Internationalization.

  // Loop through available locales in i18n config, set to true when
  // iterated locale is not found in current request url.
  const localeNotFound: boolean = i18nConfig.locales.every(
    (locale: Locale) =>
      !request.nextUrl.pathname.startsWith(`/${locale}/`) &&
      request.nextUrl.pathname !== `/${locale}`
  );

  // request url에서 locale 부분을 찾지 못한 경우 리디렉션
  if (localeNotFound) {
    // 유저에게 적합한 locale 또는 쿠키에 지정되어있는 locale
    const newLocale: Locale = request.cookies.get(LOCALE_COOKIE)?.value as Locale || getMatchingLocale(request);

    // 리디렉션 반환
    return NextResponse.redirect(
      new URL(`/${newLocale}/${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  // url 자동 리디렉션 변환을 제외할 대상을 괄호안에 삽입 (main을 넣어 해당 페이지로 이동 시 locale url 미생성)
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|main|favicon.ico).*)'],
};
