import React from 'react';

import MockContentSection from '@/components/common/MockContentSection';
import getTranslation from '@/libs/i18n/utils/getTranslation';

export default async function Page() {
  const { t } = await getTranslation();
  return (
    <div>
      <div>
        <h1>{t('Hello world!')}</h1>
        <p>{t('It implemented i18n without using a library.')}</p>
      </div>
      <a href="/main" className="block p-[16px] bg-black text-white mt-[16px] ml-[16px] w-fit">
        {t('Link to Main')}
      </a>
      <MockContentSection />
    </div>
  );
}
