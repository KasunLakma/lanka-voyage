import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import DestImage from "@/components/home/DestImage";
import { createClient } from "@/lib/supabase/server";
import {
    DEST_COLUMNS,
    type Dest,
    destBestTime,
    destHighlights,
    destImage,
    destName,
    destSummary,
} from "@/lib/destinations";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default async function DestinationPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    const locale = rawLocale as Locale3;

    const supabase = await createClient();
    const { data } = await supabase
        .from("destinations")
        .select(`${DEST_COLUMNS},published`)
        .eq("slug", slug)
        .maybeSingle();
    if (!data) notFound();

    const dest = data as unknown as Dest & { published: boolean };
    const ui = UI_TEXT[locale];
    const name = destName(dest, locale);
    const summary = destSummary(dest, locale);
    const bestTime = destBestTime(dest, locale);
    const highlights = destHighlights(dest, locale);

    const services = [
        { icon: "🏨", label: ui.stays },
        { icon: "🧭", label: ui.guides },
        { icon: "🚐", label: ui.vehicles },
        { icon: "🍛", label: ui.food },
    ];

    return (
        <>
            <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden text-white">
                <DestImage
                    src={destImage(dest.image)}
                    alt={dest.name_en}
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />
                <Link
                    href="/destinations"
                    className="absolute left-4 top-6 rounded-full border border-white/50 bg-white/15 px-4 py-2 text-sm backdrop-blur-sm sm:left-10"
                >
                    ← {ui.back}
                </Link>
                <h1 className="absolute bottom-10 left-4 text-6xl font-extrabold drop-shadow-lg sm:left-10 sm:text-8xl">
                    {name}
                </h1>
            </section>

            <Container className="py-12">
                {!dest.published && (
                    <p className="mb-6 rounded-xl bg-gold-400/20 px-4 py-2 text-sm">
                        ⏳ Draft (only administrators can see this)
                    </p>
                )}

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <h2 className="mb-3 text-2xl font-bold">{ui.about}</h2>
                        <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
                            {summary}
                        </p>
                    </div>
                    {bestTime && (
                        <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
                            <p className="text-sm text-muted">📅 {ui.bestTime}</p>
                            <p className="mt-2 text-xl font-bold text-ocean-700">{bestTime}</p>
                        </div>
                    )}
                </div>

                {highlights.length > 0 && (
                    <>
                        <h2 className="mb-6 mt-14 text-2xl font-bold">{ui.highlights}</h2>
                        <ol className="border-l-2 border-ocean-500/50 pl-8">
                            {highlights.map((h, i) => (
                                <li key={i} className="relative mb-8 last:mb-0">
                                    <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <p className="text-lg font-semibold">{h}</p>
                                </li>
                            ))}
                        </ol>
                    </>
                )}

                <div className="mt-14 rounded-3xl bg-slate-900 p-6 text-white sm:p-10">
                    <h2 className="mb-6 text-2xl font-bold">{ui.services}</h2>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {services.map((s) => (
                            <Link
                                key={s.label}
                                href="/directory"
                                className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/5 p-5 text-center transition hover:bg-white/15"
                            >
                                <span className="text-3xl">{s.icon}</span>
                                <span className="font-semibold">{s.label}</span>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/map"
                        className={`${buttonStyles("primary")} mt-8 bg-gold-500! text-slate-900!`}
                    >
                        {ui.plan}
                    </Link>
                </div>

                {dest.published && (
                    <ReviewsSection
                        targetType="destination"
                        targetId={slug}
                        locale={locale}
                    />
                )}
            </Container>
        </>
    );
}