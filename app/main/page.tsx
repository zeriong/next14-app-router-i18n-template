'use client';

import React from 'react';

import MockContentSection from '@/components/common/MockContentSection';
import { useTranslation } from '@/libs/i18n/client/LocaleProvider';

export default function Page() {
  const { t } = useTranslation();
  return (
    <div>
      {t('This is a customer-only page.')}
      <MockContentSection />
    </div>
  );
}
