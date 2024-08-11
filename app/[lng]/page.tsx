import React from 'react';
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {Locale} from "@/libs/i18n";

export default async function Page({ params }: { params: { lng: Locale } }) {
  const t = await getTranslation(params.lng)
  return (
      <div>
        <h1>{t("portal.title")}</h1>
        <p>{t("portal.content")}</p>
      </div>
  );
}