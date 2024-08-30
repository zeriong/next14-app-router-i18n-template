/*

* 만약 모든 페이지에 국제화에 대한 SEO가 필요한 경우에는 별도로 app 위치에 RootLayout을 생성해둘 필요가 없지만,
  특정 페이지에서 국제화에 대한 SEO가 필요없다면 state + localStorage 값 만으로 핸들링하는 것이 더 효율적일 수 있어
  app/[lng]/... 이외로 다른 형태로 라우팅을 구성하게 될 가능성이 있다면,
  전역으로 감싸주는 RootLayout을 Fragment만 있는 형태로라도 구성해두어야 한다.

  ? (ex. 포탈페이지, 고객전용페이지를 나누어야 하고 고객페이지는 쉽게 노출되지 않도록 SEO를 제외해야 하는 경우)

  그래야 전역으로 not-found, 에러 핸들링이 가능하다.

  현재 구현된 예시에서 url의 첫시작인 locale lang(페이지 파람스[lng])를 제외하면 회원페이지로 전환된다.

*/
import React from 'react';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 필요한 경우 초기 import 필요한 컴포넌트 삽입 */}
      {children}
    </>
  );
}
