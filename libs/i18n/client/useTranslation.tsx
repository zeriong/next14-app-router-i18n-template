"use client";

import {useEffect, useState} from "react";
import {getCookie} from "@/utils/cookies";
import {LOCALE_COOKIE} from "@/constants/common";
import loadTranslation from "@/libs/i18n/utils/loadTranslation";
import {II18n, useTranslationStore} from "@/store/i18nStore";
import {Locale} from "@/libs/i18n";
import {usePathname, useRouter} from "next/navigation";
import redirectToLocale from "@/libs/i18n/utils/redirectToLocale";
import getTranslationByKey from "@/libs/i18n/utils/getTranslationByKey";

type TTempFunc = (val: string) => string;

export const useTranslation = () => {
    const [t, setT] = useState<TTempFunc | undefined>();
    const { locale, setLocale }: II18n = useTranslationStore();
    const pathname = usePathname();
    const router = useRouter();

    const tempFunction: TTempFunc = (val) => val;

    // json파일 import 비동기처리 함수
    const getClientTranslation = (locale: Locale) => {
        (async () => {
            const loadT = await loadTranslation(locale);
            setT(() => {
                return (key: string) => getTranslationByKey(key, loadT)
            });
        })()
    }

    // 쿠키 locale과 locale pathname이 다를 경우 리디렉션하는 함수
    const initRedirection = () => {
        const currentLocale = getCookie(LOCALE_COOKIE);

        if (currentLocale !== pathname.split("/")[1]) {
            router.push(redirectToLocale(currentLocale, pathname));
        }
    }

    // zustand locale effect
    useEffect(() => {
        getClientTranslation(locale);
    }, [locale]);

    return {
        // 초기 실행 시 undefined를 대비한 조건문 임시함수
        t: t ? t : tempFunction,

        // 변경된 쿠키에 따라서 리디렉션
        initRedirection
    }
}