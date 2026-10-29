import { Link } from "@/i18n/navigation";
import { CATEGORIES, LIST_TEXT } from "@/data/listingText";
import { listingImageUrl } from "@/lib/images";
import type { Locale3 } from "@/data/destinations";
import Stars from "@/components/reviews/Stars";

export type ListingRow = {
    id: string;
    name: string;
    category: string;
    district: string;
    description: string;
    phone: string;
    whatsapp: boolean;
    verified: boolean;
    image_path: string | null;
};

export default function ListingCard({
    listing,
    locale,
    rating,
}: {
    listing: ListingRow;
    locale: Locale3;
    rating?: { avg: number; count: number };
}) {
    const t = LIST_TEXT[locale];
    const cat = CATEGORIES.find((c) => c.key === listing.category);
    const digits = listing.phone.replace(/\D/g, "");

    return (
        <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-sm transition hover:shadow-md">
            <Link href={`/directory/${listing.id}`} className="block">
                {listing.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={listingImageUrl(listing.image_path)}
                        alt={listing.name}
                        loading="lazy"
                        className="h-48 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-48 items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-6xl">
                        {cat?.icon ?? "📍"}
                    </div>
                )}
            </Link>
            <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        href={`/directory/${listing.id}`}
                        className="text-lg font-bold hover:text-ocean-700"
                    >
                        {listing.name}
                    </Link>
                    {listing.verified && (
                        <span className="shrink-0 rounded-full bg-ocean-50 px-2.5 py-1 text-xs font-semibold text-ocean-700">
                            ✔ {t.verified}
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-muted">
                    {cat?.label[locale]} · {listing.district}
                </p>
                {rating && (
                    <p className="mt-1 flex items-center gap-1 text-sm">
                        <Stars value={rating.avg} size="text-base" />
                        <span className="font-semibold">{rating.avg.toFixed(1)}</span>
                        <span className="text-muted">({rating.count})</span>
                    </p>
                )}
                <p className="mt-3 line-clamp-2 text-sm">{listing.description}</p>

                <div className="mt-4 flex gap-2">
                    <a
                        href={`tel:${listing.phone.replace(/\s/g, "")}`}
                        className="flex-1 rounded-full bg-ocean-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-ocean-700"
                    >
                        📞 {t.call}
                    </a>
                    {listing.whatsapp && digits && (
                        <a
                            href={`https://wa.me/${digits}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 rounded-full border border-line px-4 py-2 text-center text-sm font-semibold hover:bg-ocean-50"
                        >
                            💬 {t.whatsapp}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}