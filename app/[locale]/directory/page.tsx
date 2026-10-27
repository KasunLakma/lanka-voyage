import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ListingCard from "@/components/directory/ListingCard";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import type { Locale3 } from "@/data/destinations";

export default async function DirectoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const { category } = await searchParams;
    const t = LIST_TEXT[locale];

    const supabase = await createClient();
    let query = supabase
        .from("listings")
        .select(
            "id,name,category,district,description,phone,whatsapp,verified,image_path",
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (category && CATEGORIES.some((c) => c.key === category)) {
        query = query.eq("category", category);
    }
    const { data: listings } = await query;

    const chip = (active: boolean) =>
        `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <SectionTitle title={t.directory} subtitle={t.directorySub} />

            {/* Category chips */}
            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-line pb-3">
                <Link href="/directory" className={chip(!category)}>
                    {t.all}
                </Link>
                {CATEGORIES.map((c) => (
                    <Link
                        key={c.key}
                        href={`/directory?category=${c.key}`}
                        className={chip(category === c.key)}
                    >
                        {c.icon} {c.label[locale]}
                    </Link>
                ))}
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map((l) => (
                        <ListingCard key={l.id} listing={l} locale={locale} />
                    ))}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.noListings}</p>
            )}
        </Container>
    );
}