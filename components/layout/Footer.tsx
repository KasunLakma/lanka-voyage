import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LEGAL_UI } from "@/data/legalText";
import type { Locale3 } from "@/data/destinations";

export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale() as Locale3;
    const labels = LEGAL_UI[locale].footer;

    const links = [
        { href: "/about", label: labels.about },
        { href: "/contact", label: labels.contact },
        { href: "/terms", label: labels.terms },
        { href: "/privacy", label: labels.privacy },
        { href: "/content-policy", label: labels.content },
    ];

    return (
        <footer className="mt-16 border-t border-line bg-card py-8">
            <Container className="flex flex-col gap-6 text-sm text-muted">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <p className="font-semibold text-ocean-700">🌴 Lanka Voyage</p>
                    <p>{t("tagline")}</p>
                </div>
                <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="hover:text-ocean-700 hover:underline"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
                <p className="text-center sm:text-left">
                    © {new Date().getFullYear()} {t("rights")}
                </p>
            </Container>
        </footer>
    );
}