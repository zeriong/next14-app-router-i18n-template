import React from 'react';
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {Locale} from "@/libs/i18n";
import Link from "next/link";
import {cookies} from "next/headers";
import {LOCALE_COOKIE} from "@/constants/common";

export default async function Page({ params }: { params: { lng: Locale } }) {
    const t = await getTranslation((cookies().get(LOCALE_COOKIE)?.value || params.lng) as Locale);
    return (
          <div>
              <div>
                  <h1>{t("portal.title")}</h1>
                  <p>{t("portal.content")}</p>
              </div>
              <Link href="/main" className="block p-[16px] bg-black text-white mt-[16px] ml-[16px] w-fit">
                  {t("portal.linkToMain")}
              </Link>
          </div>
  );
}