import type {Metadata} from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import {i18nConfig, Locale} from "@/libs/i18n";
import getTranslation from "@/libs/i18n/utils/getTranslation";
import PortalHeader from "@/components/layout/PortalHeader";
import {cookies, headers} from "next/headers";
import {LOCALE_COOKIE} from "@/constants/common";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale: locale }));
}

export async function generateMetadata(
    { params }: { params: { lng: Locale } },
): Promise<Metadata> {
  let lng: Locale;
  if (params.lng === cookies().get(LOCALE_COOKIE)?.value) lng = params.lng;
  else lng = cookies().get(LOCALE_COOKIE)?.value as Locale;

  const translation = await getTranslation(lng);

  return {
    title: translation('meta.title'),
  }
}

export default function LandingPageLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { lng: Locale };
}>) {
  return (
    <html lang={cookies().get(LOCALE_COOKIE)?.value || params.lng}>
      <body className={inter.className}>
        <PortalHeader/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
