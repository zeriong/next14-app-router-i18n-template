import React from 'react';
import type {Metadata} from "next";
import MainHeader from "@/components/layout/MainHeader";
import {Locale} from "@/libs/i18n";
import {cookies} from "next/headers";
import {LOCALE_COOKIE} from "@/constants/common";
import getTranslation from "@/libs/i18n/utils/getTranslation";

export async function generateMetadata(
    { params }: { params: { lng: Locale } },
): Promise<Metadata> {
    // locale쿠키의 값과 params가 다른경우에는 쿠키를 기반으로 적용
    // (main 페이지에서 변경된 사항을 알 수 있는 방법은 쿠키뿐이기 때문에 하이드레이션시켜주기 위함)
    const lng = (cookies().get(LOCALE_COOKIE)?.value || params.lng) as Locale;

    // 변경시킬 locale 번역 데이터를 받음
    const translation = await getTranslation(lng);

    // 결과에 맞는 데이터 반환
    return {
        title: translation('meta.title'),
        robots: "noindex,nofollow"
    }
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <MainHeader/>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}