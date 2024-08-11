"use client";

import React, {useEffect} from 'react';
import PortalLocaleSelector from "@/components/translate/LocaleSelector";
import {useTranslation} from "@/libs/i18n/client/useTranslation";

export default function PortalHeader() {
    const {t, initRedirection} = useTranslation();

    useEffect(() => {
        initRedirection();
    }, []);

    return (
        <header className="relative flex w-full h-fit bg-gray-200 items-center py-[12px] gap-4">
            <p className="text-[24px] font-bold">Header</p>
            <PortalLocaleSelector message={t("common.localeSelectorTxt")}/>
        </header>
    );
}