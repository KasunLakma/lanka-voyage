import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import { REVIEW_TEXT } from "@/data/reviewText";
import type { Locale3 } from "@/data/destinations";
import ReportButton from "@/components/reviews/ReportButton";

export default async function ListingPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale: raw, id } = await params;
    const locale = raw as Locale3;
    const t = LIST_TEXT[locale];
    const rt = REVIEW_TEXT[locale];

    const supabase = await createClient();
    const { data: l } = await supabase
        .from("listings")
        .select(
            "id,owner_id,name,category,district,description,phone,whatsapp,verified,sltda_number,image_path,lat,lng,status",
        )
        .eq("id", id)
        .maybeSingle();

    if (!l) notFound();

    const cat = CATEGORIES.find((c) => c.key === l.category);
    const digits = String(l.phone).replace(/\D/g, "");

    return (
        <article className="pb-16">
            {l.image_path ? (
                <div className="relative h-64 w-full overflow-hidden sm:h-96">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={listingImageUrl(l.image_path)}
                        alt={l.name}
                        className="h-full w-full object-cover"
                    />
                </div>
            ) : (
                <div className="flex h-48 items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-7xl">
                    {cat?.icon ?? "📍"}
                </div>
            )}

            <Container className="max-w-3xl pt-8">
                <Link href="/directory" className="text-sm text-ocean-700 underline">
                    ← {rt.back}
                </Link>

                {l.status !== "published" && (
                    <p className="mt-4 rounded-xl bg-gold-400/20 px-4 py-2 text-sm">
                        ⏳ {t.statusPending} ({l.status})
                    </p>
                )}

                <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
                    <h1 className="text-4xl font-extrabold leading-tight">{l.name}</h1>
                    {l.verified && (
                        <span className="rounded-full bg-ocean-50 px-3 py-1 text-sm font-semibold text-ocean-700">
                            ✔ {t.verified}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-muted">
                    {cat?.icon} {cat?.label[locale]} · 📍 {l.district}
                </p>
                {l.sltda_number && (
                    <p className="mt-1 text-sm text-muted">
                        {rt.sltda}: {l.sltda_number}
                    </p>
                )}

                <h2 className="mt-8 text-xl font-bold">{rt.about}</h2>
                <p className="mt-2 whitespace-pre-line text-lg leading-relaxed">
                    {l.description}
                </p>

                <h2 className="mt-8 text-xl font-bold">{rt.contact}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                    <a
                        href={`tel:${String(l.phone).replace(/\s/g, "")}`}
                        className="rounded-full bg-ocean-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ocean-700"
                    >
                        📞 {t.call}
                    </a>
                    {l.whatsapp && digits && (
                        <a
                            href={`https://wa.me/${digits}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-ocean-50"
                        >
                            💬 {t.whatsapp}
                        </a>
                    )}
                    {l.lat != null && l.lng != null && (
                        <a
                            href={`https://www.google.com/maps?q=${l.lat},${l.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-ocean-50"
                        >
                            🗺️ {rt.openMap}
                        </a>
                    )}
                </div>
                <ReportButton targetType="listing" targetId={l.id} />

                <ReviewsSection
                    targetType="listing"
                    targetId={l.id}
                    locale={locale}
                    ownerId={l.owner_id}
                />
            </Container>
        </article>
    );
}