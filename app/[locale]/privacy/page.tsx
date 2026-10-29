import LegalPage from "@/components/legal/LegalPage";
import type { Locale3 } from "@/data/destinations";

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <LegalPage kind="privacy" locale={locale as Locale3} />;
}