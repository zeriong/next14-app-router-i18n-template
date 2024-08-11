// import {useEffect, useState} from "react";
// import getTranslation from "@/libs/i18n/utils/getTranslation";
// import {getCookie} from "@/utils/cookies";
// import {LOCALE_COOKIE} from "@/constants/common";
//
// export const useTranslation = () => {
//     const [t, setT] = useState<any>(null);
//
//     useEffect(() => {
//         (async () => {
//             const resT = await getTranslation(getCookie(LOCALE_COOKIE) || "en");
//             setT(prev => {
//                 return (key) => resT(key);
//             });
//         })()
//     }, [getCookie(LOCALE_COOKIE)]);
//
//     return { t }
// }