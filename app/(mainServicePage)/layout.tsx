import React from 'react';
import type {Metadata} from "next";

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
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}