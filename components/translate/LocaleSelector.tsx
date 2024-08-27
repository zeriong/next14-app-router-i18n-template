'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { LOCALE_COOKIE } from '@/constants/common';
import { Locale, i18nConfig } from '@/libs/i18n';
import redirectToLocale from '@/libs/i18n/utils/redirectToLocale';
import { useTranslationStore } from '@/store/i18nStore';
import { setCookie } from '@/utils/cookies';

interface Props {
  message: string;
  isMain?: boolean;
}

export default function LocaleSelector({ message, isMain }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setLocale } = useTranslationStore();

  // 언어 변경 리스트 info
  const localeInfo = {
    en: { native: 'English', english: 'English' },
    ko: { native: '한국어', english: '한국어' },
  };

  // locale쿠키와 전역상태 locale을 변경하는 함수
  const changeLocale = (locale: Locale) => {
    setCookie(LOCALE_COOKIE, locale);

    // 메인이 아닌경우에 href과 겹치게 되면 제대로 실행되지 않음
    if (isMain) setLocale(locale);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={`flex h-12 w-12 items-center justify-center rounded-lg hover:bg-neutral-100 ${
          isOpen ? 'bg-neutral-100' : ''
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <GlobeIcon />
      </button>

      {isOpen && (
        <div className="absolute translate-y-28 ">
          <div className='className="flex py-1" w-48 flex-col rounded-md border border-neutral-200 bg-white'>
            <div className="px-3 py-2">
              <h1 className="text-md font-medium">{message}</h1>
            </div>
            <ul className="flex w-full flex-col divide-y divide-neutral-200">
              {i18nConfig.locales.map((locale) =>
                !isMain ? (
                  <Link
                    key={locale}
                    scroll={false} // 언어 변경 시 스크롤을 최상단으로 초기화 시키지 않으므로 ux 향상
                    href={redirectToLocale(locale, pathname)}
                    onClick={() => changeLocale(locale)}
                  >
                    <li className="flex w-full flex-col items-start justify-center px-3 py-1 hover:bg-neutral-100">
                      <h2 className="text-md font-medium text-neutral-950">{localeInfo[locale].native}</h2>
                      <p className="text-xs text-neutral-600">{localeInfo[locale].english}</p>
                    </li>
                  </Link>
                ) : (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => {
                      changeLocale(locale);
                      router.refresh();
                      setIsOpen(false);
                    }}
                  >
                    <li className="flex w-full flex-col items-start justify-center px-3 py-1 hover:bg-neutral-100">
                      <h2 className="text-md font-medium text-neutral-950">{localeInfo[locale].native}</h2>
                      <p className="text-xs text-neutral-600">{localeInfo[locale].english}</p>
                    </li>
                  </button>
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function GlobeIcon() {
  return (
    <>
      {/* Trabslation SVG icon, sourced from: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        />
      </svg>
    </>
  );
}
