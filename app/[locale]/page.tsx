import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

const CATEGORIES = [
    { key: "beaches", icon: "🏖️" },
    { key: "hillCountry", icon: "⛰️" },
    { key: "culture", icon: "🛕" },
    { key: "wildlife", icon: "🐘" },
    { key: "waterfalls", icon: "💧" },
    { key: "food", icon: "🍛" },
    { key: "nightlife", icon: "🌙" },
    { key: "wellness", icon: "🧘" },
    { key: "adventure", icon: "🏄" },
    { key: "festivals", icon: "🎉" },
] as const;

const PLACEHOLDER_SECTIONS = [
    "featuredDestinations",
    "featuredVideos",
    "latestArticles",
] as const;

export default function HomePage() {
    const t = useTranslations("hero");
    const tc = useTranslations("categories");
    const ts = useTranslations("sections");

    return (
        <>
            <section className="bg-linear-to-br from-ocean-800 via-ocean-600 to-tea-500 py-20 text-white sm:py-28">
                <Container className="text-center">
                    <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
                        {t("title")}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                        {t("subtitle")}
                    </p>

                    <div className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-3xl bg-white p-2 sm:flex-row sm:rounded-full">
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            className="flex-1 rounded-full px-5 py-3 text-base text-slate-800 outline-none"
                        />
                        <Button className="bg-gold-500! hover:bg-gold-400! text-slate-900!">
                            {t("searchButton")}
                        </Button>
                    </div>
                </Container>
            </section>

            <Container className="mt-12">
                <SectionTitle title={tc("title")} />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {CATEGORIES.map((c) => (
                        <Card
                            key={c.key}
                            className="flex flex-col items-center gap-2 p-5 text-center transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <span className="text-4xl">{c.icon}</span>
                            <span className="text-sm font-semibold">{tc(c.key)}</span>
                        </Card>
                    ))}
                </div>
            </Container>

            {PLACEHOLDER_SECTIONS.map((s) => (
                <Container key={s} className="mt-12">
                    <SectionTitle title={ts(s)} />
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[1, 2, 3].map((n) => (
                            <Card
                                key={n}
                                className="flex h-40 items-center justify-center bg-ocean-50 text-muted"
                            >
                                {ts("comingSoon")}
                            </Card>
                        ))}
                    </div>
                </Container>
            ))}
        </>
    );
}