"use client";

import React, {useEffect, useState} from 'react';
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {LOCALE_COOKIE} from "@/constants/common";
import {Locale} from "@/libs/i18n";
import {getCookie} from "@/utils/cookies";

export default function Page() {
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
        <div>
            {t && t("main.content")}
        </div>
    );
}