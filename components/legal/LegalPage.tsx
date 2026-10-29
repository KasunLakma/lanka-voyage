import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LEGAL, LEGAL_UI, type LegalKind } from "@/data/legalText";
import { SITE } from "@/data/siteConfig";
import type { Locale3 } from "@/data/destinations";

export default function LegalPage({
    kind,
    locale,
}: {
    kind: LegalKind;
    locale: Locale3;
}) {
    const doc = LEGAL[kind][locale];
    const ui = LEGAL_UI[locale];

    return (
        <Container className="max-w-3xl py-12">
            <h1 className="text-4xl font-extrabold">{doc.title}</h1>
            <p className="mt-2 text-sm text-muted">
                {ui.updated}: {SITE.lastUpdated}
                {SITE.operator ? ` · ${ui.operatedBy}: ${SITE.operator}` : ""}
            </p>
            {doc.intro && <p className="mt-5 text-lg">{doc.intro}</p>}

            <div className="mt-8 space-y-8">
                {doc.sections.map((s) => (
                    <section key={s.h}>
                        <h2 className="text-xl font-bold">{s.h}</h2>
                        {s.p.map((para, i) => (
                            <p key={i} className="mt-2 leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </section>
                ))}
            </div>

            <p className="mt-12 rounded-2xl bg-ocean-50 p-4 text-sm text-ocean-800">
                {ui.questions}{" "}
                <Link href="/contact" className="font-semibold underline">
                    {ui.contactUs}
                </Link>
            </p>
        </Container>
    );
}