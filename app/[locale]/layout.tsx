import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import PwaRegister from "@/components/pwa/PwaRegister";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sinhala = Noto_Sans_Sinhala({
    subsets: ["sinhala"],
    variable: "--font-sinhala",
});
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil" });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#0f766e" },
        { media: "(prefers-color-scheme: dark)", color: "#0b1f1e" },
    ],
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });
    return {
        metadataBase: new URL(SITE_URL),
        title: { default: t("title"), template: `%s | ${SITE_NAME}` },
        description: t("description"),
        applicationName: SITE_NAME,
        appleWebApp: {
            capable: true,
            title: SITE_NAME,
            statusBarStyle: "default",
        },
        icons: { apple: "/icons/apple-touch-icon.png" },
        formatDetection: { telephone: false },
        openGraph: {
            type: "website",
            siteName: SITE_NAME,
            title: t("title"),
            description: t("description"),
            locale: OG_LOCALE[locale as keyof typeof OG_LOCALE] ?? "en_US",
            images: ["/images/sigiriya.jpg"],
        },
        twitter: { card: "summary_large_image" },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    return (
        <html
            lang={locale}
            className={`${inter.variable} ${sinhala.variable} ${tamil.variable}`}
        >
            <body className="min-h-screen bg-surface text-ink antialiased">
                <NextIntlClientProvider>
                    <Header />
                    <main className="pb-24 lg:pb-0">{children}</main>
                    <Footer />
                    <MobileTabBar />
                    <InstallPrompt />
                    <PwaRegister />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}