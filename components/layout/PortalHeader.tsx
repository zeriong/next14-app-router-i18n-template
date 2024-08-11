"use client";

import React, {useEffect, useState} from 'react';
import PortalLocaleSelector from "@/components/translate/LocaleSelector";
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {Locale} from "@/libs/i18n";
import {getCookie} from "@/utils/cookies";
import {LOCALE_COOKIE} from "@/constants/common";
import {router} from "next/client";
import {useRouter} from "next/router";
import {usePathname} from "next/navigation";
import redirectToLocale from "@/libs/i18n/utils/redirectToLocale";

export default function PortalHeader({ params }: { params: { lng: Locale } }) {
    // const t = await getTranslation(getCookie(LOCALE_COOKIE));
    const [t, setT] = useState<any>(null);
    const pathname = usePathname();

    console.log("얍");

    // 쿠키에 저장된 lang 기반으로 리디렉션
    redirectToLocale(getCookie(LOCALE_COOKIE) || "en", pathname);

    useEffect(() => {
        (async () => {
            const resT = await getTranslation(getCookie(LOCALE_COOKIE) || "en");
            setT(prev => {
                return (key) => resT(key);
            });
        })();
    }, [getCookie(LOCALE_COOKIE)]);

    return (
        <header className="relative flex w-full h-fit bg-gray-200 items-center py-[12px] gap-4">
            <p className="text-[24px] font-bold">Header!!!!!!!!!!!!!!</p>
            <PortalLocaleSelector message={t && t("common.localeSelectorTxt")}/>
        </header>
    );
}