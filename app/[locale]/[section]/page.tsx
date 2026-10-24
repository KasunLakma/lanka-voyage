import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

const SECTIONS: string[] = [
    "destinations",
    "upcoming",
    "articles",
    "directory",
    "map",
    "videos",
    "pricing",
    "login",
    "register",
];

export default async function SectionPage({
    params,
}: {
    params: Promise<{ locale: string; section: string }>;
}) {
    const { section } = await params;
    if (!SECTIONS.includes(section)) notFound();

    const tNav = await getTranslations("nav");
    const t = await getTranslations("placeholder");

    return (
        <Container className="py-20 text-center">
            <h1 className="text-4xl font-bold">{tNav(section)}</h1>
            <p className="mt-3 text-muted">{t("comingSoon")}</p>
            <Link href="/" className={`${buttonStyles("primary")} mt-8`}>
                {t("backHome")}
            </Link>
        </Container>
    );
}