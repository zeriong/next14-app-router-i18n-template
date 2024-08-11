import React from 'react';
import PortalLocaleSelector from "@/components/translate/PortalTranslateBox";
import getTranslation from "@/libs/i18n/utils/getTranslation";
import {Locale} from "@/libs/i18n";

export default async function PortalHeader({ params }: { params: { lng: Locale } }) {
    const t = await getTranslation(params.lng)
    return (
        <header className="relative flex w-full h-fit bg-gray-200 items-center py-[12px] gap-4">
            <p className="text-[24px] font-bold">Header</p>
            <PortalLocaleSelector message={t("common.localeSelectorTxt")}/>
        </header>
    );
}