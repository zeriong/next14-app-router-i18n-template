// 중첩된 키, 값 쌍(pair) 변환 객체 정의
type TranslationKeyValue = {
  [key: string]: string | TranslationKeyValue;
};

/**
 * 선택된 locale의 키, 번역을 기반으로 번역 값 문자열을 가져오는 함수
 * @param keys 지정된 locale의 key 값 (string)
 * @param translation 지정된 locale의 key, value 쌍(pair or pairs)
 * @returns 번역된 문자열 또는 키, 값 쌍인 번역 객체
 */
function getTranslationValue(
  keys: string[],
  translation: TranslationKeyValue | string
): TranslationKeyValue | string {
  // 번역값이 문자열인 경우 번역값을 반환
  if (typeof translation === 'string') {
    return translation;
  }

  // 번역값이 없거나 키배열이 비어있는 경우 빈문자열 반환
  if (!translation || keys.length === 0) {
    return '';
  }

  // 키배열의 첫 번째 키를 key변수에 할당해주며 keys 에선 제거
  const key: string = keys.shift() || '';

  // 나머지 키를 재귀적으로 호출
  return getTranslationValue(keys, translation[key]);
}

/**
 * 선택된 키와 번역을 기반으로 값을 가져오는 함수
 * @param key 번역의 key 문자열
 * @param translation 번역의 key, value 쌍(pair) 객체
 * @returns 번역된 값
 */
export default function getTranslationByKey(
  key: string,
  translation: TranslationKeyValue
): string {
  // 중첩된 키의 경우 키 입력을 키배열로 변환
  const keys = key.split('.');

  // 번역값을 획득
  const translationValue = getTranslationValue(keys, translation);

  // 번역 값이 존재하지 않거나 문자열이 아닌경우, 매개변수로 전달받은 key를 반환
  if (!translationValue || typeof translationValue !== 'string') {
    return key;
  }

  // 번역값을 반환
  return translationValue;
}
