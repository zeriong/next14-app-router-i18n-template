import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

import { Locale, i18nConfig } from '@/libs/i18n';
import { match } from '@formatjs/intl-localematcher';

/**
 * 매칭된 locale을 가져오는 함수
 * @param request
 * @returns
 */
export default function getMatchingLocale(request: NextRequest): Locale {
  // 유저헤더 기본값
  const userHeaders: Record<string, string> = {};

  // 요청 헤더로 유저헤더 객체를 채움
  request.headers.forEach(
    (headerValue, headerKey) => (userHeaders[headerKey] = headerValue),
  );

  // 클라이언트에서 사용 가능한 모든 locale을 가져옴
  const clientLocales = new Negotiator({ headers: userHeaders }).languages();

  // 앱, 서버가 가질 수 있는 모든 locale을 담을 배열
  const appLocales: Locale[] = [];

  // i18n config를 통해 모든 locale 정보를 담음
  i18nConfig.locales.forEach((locale: Locale) => {
    appLocales.push(locale);
  });

  // intl-localematcher 라이브러리를 통해 일치 함수를 호출하고 매칭되는 locale을 획득
  // (기본값으로 지정된 locale로 설정됨)
  // 매칭된 locale 반환
  return match(clientLocales, appLocales, i18nConfig.defaultLocale) as Locale;
}
