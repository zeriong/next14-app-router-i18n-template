import {Locale} from "@/libs/i18n";
import loadTranslation, {Translation} from "@/libs/i18n/utils/loadTranslation";

/**
 * 선택된 locale을 기반으로 서버사이드에서 번역 객체를 가져오는 함수
 * @param locale
 * @returns
 */
export default async function getTranslation(
  locale: Locale
): Promise<(key: keyof Translation) => string> {
  // locale 기반으로 번역 json을 로드
  const translation = await loadTranslation(locale);
  // 번역 데이터 반환
  return (key: keyof Translation) => translation[key] || "";
}
