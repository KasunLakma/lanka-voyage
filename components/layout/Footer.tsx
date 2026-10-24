import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="mt-16 border-t border-line bg-card py-8">
            <Container className="flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
                <p className="font-semibold text-ocean-700">🌴 Lanka Voyage</p>
                <p>{t("tagline")}</p>
                <p>
                    © {new Date().getFullYear()} {t("rights")}
                </p>
            </Container>
        </footer>
    );
}