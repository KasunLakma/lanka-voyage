import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import HeroDestinations from "@/components/home/HeroDestinations";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import { COMMUNITY_TEXT, type Locale3 } from "@/data/destinations";

export default function HomePage() {
    const ts = useTranslations("sections");
    const tn = useTranslations("nav");
    const locale = useLocale() as Locale3;
    const community = COMMUNITY_TEXT[locale];

    return (
        <>
            <HeroDestinations />

            {/* Destination cards with category tabs */}
            <Container className="mt-14">
                <SectionTitle title={ts("featuredDestinations")} />
                <DestinationExplorer />
            </Container>

            {/* Community banner */}
            <Container className="mt-16">
                <div className="relative flex min-h-80 items-end overflow-hidden rounded-3xl p-8 text-white sm:p-12">
                    <Image
                        src="/images/ella.jpg"
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/10" />
                    <div className="relative max-w-xl">
                        <h2 className="text-4xl font-extrabold sm:text-6xl">
                            {community.title}
                        </h2>
                        <p className="mt-3 text-lg text-white/90">{community.sub}</p>
                        <Link
                            href="/register"
                            className={`${buttonStyles("primary")} mt-6 bg-white! text-slate-900!`}
                        >
                            {tn("register")}
                        </Link>
                    </div>
                </div>
            </Container>

            {/* Videos and articles (coming soon) */}
            {(["featuredVideos", "latestArticles"] as const).map((s) => (
                <Container key={s} className="mt-14">
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