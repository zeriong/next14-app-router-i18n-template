import type {Metadata, ResolvingMetadata} from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import {i18nConfig, Locale} from "@/libs/i18n";
import getTranslation from "@/libs/i18n/utils/getTranslation";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale: locale }));
}

export async function generateMetadata(
    { params }: { params: { lng: Locale } },
): Promise<Metadata> {

  const translation = await getTranslation(params.lng);

  return {
    title: translation('meta.title'),
  }
}

export default function LandingPageLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html lang={params.lng}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
