import React from 'react';
import getTranslation from "@/libs/i18n/utils/getTranslation";

export default async function Page() {
    const t = await getTranslation("en");
    return (
        <div>
            {t("main.content")}
        </div>
    );
}