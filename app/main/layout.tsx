import React from 'react';
import type {Metadata} from "next";
import MainHeader from "@/components/layout/MainHeader";

// 검색노출 못하도록 설정
export const metadata: Metadata = {
    title: "고객전용",
    description: "설명",
    robots: "noindex,nofollow"
};

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