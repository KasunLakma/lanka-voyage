import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ListingCard from "@/components/directory/ListingCard";
import FilterSheet from "@/components/directory/FilterSheet";
import { createClient } from "@/lib/supabase/server";
import { applyFilters, buildQuery, parseFilters } from "@/lib/directoryFilters";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import { FILTER_TEXT } from "@/data/filterText";
import type { Locale3 } from "@/data/destinations";

export default async function DirectoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        category?: string;
        district?: string;
        verified?: string;
        q?: string;
    }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const filters = parseFilters(await searchParams);
    const t = LIST_TEXT[locale];
    const ft = FILTER_TEXT[locale];

    const supabase = await createClient();
    let query = supabase
        .from("listings")
        .select(
            "id,name,category,district,description,phone,whatsapp,verified,image_path",
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });
    query = applyFilters(query, filters);
    const { data: listings } = await query;

    // Average star ratings for the listings shown
    const ratings = new Map<string, { avg: number; count: number }>();
    if (listings && listings.length > 0) {
        const { data: stats } = await supabase
            .from("review_stats")
            .select("target_id,review_count,avg_rating")
            .eq("target_type", "listing")
            .in(
                "target_id",
                listings.map((l) => l.id),
            );
        (stats ?? []).forEach((s) =>
            ratings.set(s.target_id, {
                avg: Number(s.avg_rating),
                count: s.review_count,
            }),
        );
    }

    const anyFilter =
        filters.category || filters.district || filters.verified || filters.q;

    const chip = (active: boolean) =>
        `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <SectionTitle title={t.directory} subtitle={t.directorySub} />

            <FilterSheet initial={filters} />

            <div className="mb-4 flex gap-2 overflow-x-auto border-b border-line pb-3">
                <Link
                    href={buildQuery({ ...filters, category: "" })}
                    className={chip(!filters.category)}
                >
                    {t.all}
                </Link>
                {CATEGORIES.map((c) => (
                    <Link
                        key={c.key}
                        href={buildQuery({ ...filters, category: c.key })}
                        className={chip(filters.category === c.key)}
                    >
                        {c.icon} {c.label[locale]}
                    </Link>
                ))}
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>{ft.results.replace("{n}", String(listings?.length ?? 0))}</span>
                {filters.district && (
                    <span className="rounded-full bg-ocean-50 px-3 py-1 text-ocean-700">
                        📍 {filters.district}
                    </span>
                )}
                {filters.verified && (
                    <span className="rounded-full bg-ocean-50 px-3 py-1 text-ocean-700">
                        ✔ {t.verified}
                    </span>
                )}
                {filters.q && (
                    <span className="rounded-full bg-ocean-50 px-3 py-1 text-ocean-700">
                        “{filters.q}”
                    </span>
                )}
                {anyFilter && (
                    <Link href="/directory" className="underline">
                        {ft.clear}
                    </Link>
                )}
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map((l) => (
                        <ListingCard
                            key={l.id}
                            listing={l}
                            locale={locale}
                            rating={ratings.get(l.id)}
                        />
                    ))}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.noListings}</p>
            )}
        </Container>
    );
}