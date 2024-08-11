"use client";

import React from 'react';
import {useTranslation} from "@/libs/i18n/client/useTranslation";

export default function Page() {
    const { t } = useTranslation();
    return (
        <div>
            {t("main.content")}
        </div>
    );
}