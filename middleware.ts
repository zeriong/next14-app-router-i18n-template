import { NextRequest, NextResponse } from 'next/server';

import { LOCALE_COOKIE } from '@/constants/common';
import getMatchingLocale from '@/libs/i18n/utils/getMatchingLocale';

import { Locale, i18nConfig } from './libs/i18n';

export default function middleware(request: NextRequest) {
  // pathname
  const originalUrl = request.nextUrl.pathname;

  // 존재하는 locale을 브라우저로부터 받았는지 여부
  const localeNotFound: boolean = i18nConfig.locales.every(
    (locale: Locale) => !originalUrl.startsWith(`/${locale}/`) && originalUrl !== `/${locale}`,
  );

  // 쿠키에 지정되어있는 locale 또는 유저에게 적합한 locale
  const registeredLocale: Locale = (request.cookies.get(LOCALE_COOKIE)?.value as Locale) || getMatchingLocale(request);

  // 브라우저에 locale 쿠키가 없다면(request.cookies) 쿠키세팅 후 redirection
  if (!request.cookies.has(LOCALE_COOKIE)) {
    const res = NextResponse.redirect(new URL(originalUrl, request.url)); // 리디렉션 설정
    res.cookies.set(LOCALE_COOKIE, registeredLocale); // 초기 언어 쿠키 설정
    return res;
  }

  // 서비스 웹앱 페이지(고객 관리 페이지)인 경우 redirection하지 않고 언어 설정, pathname만 세팅
  if (originalUrl.split('/')[1] === 'main') {
    const res = NextResponse.next();
    res.headers.set('x-pathname', originalUrl); // [ 서버 컴포넌트에서 headers.get("x-pathname") 접근 가능 ]
    res.cookies.set(LOCALE_COOKIE, registeredLocale);
    return res;
  }

  // request url에서 locale 부분을 찾지 못한 경우 리디렉션
  if (localeNotFound) {
    const targetPath = `/${registeredLocale}/${originalUrl}`;
    const res = NextResponse.redirect(new URL(targetPath, request.url)); // 리디렉션 설정
    res.cookies.set(LOCALE_COOKIE, registeredLocale); // 초기 언어 쿠키 설정
    return res;
  }

  // 응답 헤더에 pathname 추가 [ 서버 컴포넌트에서 headers.get("x-pathname") 접근 가능 ]
  const response = NextResponse.next();
  response.headers.set('x-pathname', originalUrl);

  return response;
}

export const config = {
  // url 자동 리디렉션 변환을 제외할 대상을 괄호안에 삽입 (main을 넣어 해당 페이지로 이동 시 locale url 미생성)
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|locales|favicon.ico).*)'],
};
