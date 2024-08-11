"use client";

import React, {useEffect, useState} from 'react';
import PortalLocaleSelector from "@/components/translate/LocaleSelector";
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {getCookie} from "@/utils/cookies";
import {LOCALE_COOKIE} from "@/constants/common";
import LocaleSelector from "@/components/translate/LocaleSelector";

export default function MainHeader() {
    // const t = await getTranslation(getCookie(LOCALE_COOKIE));
    const [t, setT] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const resT = await getTranslation(getCookie(LOCALE_COOKIE) || "en");
            setT(prev => {
                return (key) => resT(key);
            });
        })()
    }, [getCookie(LOCALE_COOKIE)]);

    return (
        <header className="relative flex w-full h-fit bg-gray-200 items-center py-[12px] gap-4">
            <p className="text-[24px] font-bold">Header</p>
            <LocaleSelector message={t && t("common.localeSelectorTxt")} isCsr={true}/>
        </header>
    );
}