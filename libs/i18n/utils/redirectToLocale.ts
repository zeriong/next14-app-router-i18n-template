import { Locale } from '../index';

export default function redirectToLocale(locale: Locale, pathname: string) {
  // pathname이 없다면 "/" 로 변경
  if (!pathname) {
    return '/';
  }

  // url을 "/"기반으로 split 하여 배열화
  const pathParts = pathname.split('/');

  // url의 index 1번째에 지정된 locale value를 삽입
  pathParts[1] = locale;

  // locale이 지정된 상태로 join('/')하여 url형태의 문자열로 재변환
  return pathParts.join('/');
}
