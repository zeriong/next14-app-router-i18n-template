import { cookies } from 'next/headers';

import { LOCALE_COOKIE } from '@/constants/common';
import { Locale } from '@/libs/i18n';
import { IUseTranslation } from '@/libs/i18n/client/LocaleProvider';
import loadTranslation, { Translation } from '@/libs/i18n/utils/loadTranslation';

/**
 * 선택된 locale을 기반으로 서버사이드에서 번역 객체를 가져오는 함수
 */
export default async function getTranslation(): Promise<IUseTranslation> {
  const locale = (cookies().get(LOCALE_COOKIE)?.value || 'en') as Locale;
  // locale 기반으로 번역 json을 로드
  const translation = await loadTranslation(locale);
  const t: IUseTranslation['t'] = (key: keyof Translation) => translation[key] || '';
  // 번역 데이터 반환
  return { t };
}
