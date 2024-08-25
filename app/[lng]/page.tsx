import { cookies } from 'next/headers';
import React from 'react';

import { LOCALE_COOKIE } from '@/constants/common';
import { Locale } from '@/libs/i18n';
import getTranslation from '@/libs/i18n/utils/getTranslation';

export default async function Page({ params }: { params: { lng: Locale } }) {
  const t = await getTranslation(
    (cookies().get(LOCALE_COOKIE)?.value || params.lng) as Locale,
  );
  return (
    <div>
      <div>
        <h1>{t('Hello world!')}</h1>
        <p>{t('It implemented i18n without using a library.')}</p>
      </div>
      <a
        href="/main"
        className="block p-[16px] bg-black text-white mt-[16px] ml-[16px] w-fit"
      >
        {t('Link to Main')}
      </a>
    </div>
  );
}
