import Container from "@/components/ui/Container";
import { LEGAL_UI } from "@/data/legalText";
import { SITE } from "@/data/siteConfig";
import type { Locale3 } from "@/data/destinations";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const c = LEGAL_UI[locale as Locale3].contact;
    const hasAny = SITE.email || SITE.phone || SITE.whatsapp;

    return (
        <Container className="max-w-2xl py-12">
            <h1 className="text-4xl font-extrabold">{c.title}</h1>
            <p className="mt-4 text-lg">{c.intro}</p>

            <div className="mt-6 grid gap-3">
                {SITE.email && (
                    <a
                        href={`mailto:${SITE.email}`}
                        className="rounded-2xl border border-line bg-card p-4 font-semibold hover:bg-ocean-50"
                    >
                        ✉️ {c.email}: {SITE.email}
                    </a>
                )}
                {SITE.phone && (
                    <a
                        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                        className="rounded-2xl border border-line bg-card p-4 font-semibold hover:bg-ocean-50"
                    >
                        📞 {c.phone}: {SITE.phone}
                    </a>
                )}
                {SITE.whatsapp && (
                    <a
                        href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-line bg-card p-4 font-semibold hover:bg-ocean-50"
                    >
                        💬 {c.whatsapp}
                    </a>
                )}
                {!hasAny && <p className="text-muted">{c.soon}</p>}
            </div>

            <h2 className="mt-10 text-xl font-bold">{c.tipsTitle}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
                {c.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{c.reportHint}</p>
        </Container>
    );
}