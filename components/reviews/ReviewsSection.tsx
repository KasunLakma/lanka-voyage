import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { REVIEW_TEXT } from "@/data/reviewText";
import type { Locale3 } from "@/data/destinations";
import Stars from "./Stars";
import ReviewForm from "./ReviewForm";
import ReviewActions from "./ReviewActions";

// Reviews list + "write a review" form for a listing or a destination
export default async function ReviewsSection({
    targetType,
    targetId,
    locale,
    ownerId,
}: {
    targetType: "listing" | "destination";
    targetId: string;
    locale: Locale3;
    ownerId?: string;
}) {
    const t = REVIEW_TEXT[locale];
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let isAdmin = false;
    if (user) {
        const { data: p } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", user.id)
            .single();
        isAdmin = Boolean(p?.is_admin);
    }

    const { data: reviews } = await supabase
        .from("reviews")
        .select("id,author_id,author_name,rating,comment,status,created_at")
        .eq("target_type", targetType)
        .eq("target_id", targetId)
        .order("created_at", { ascending: false });

    const all = reviews ?? [];
    const published = all.filter((r) => r.status === "published");
    const avg = published.length
        ? published.reduce((sum, r) => sum + r.rating, 0) / published.length
        : 0;

    const mine = user ? all.find((r) => r.author_id === user.id) : undefined;
    const isOwner = Boolean(user && ownerId && user.id === ownerId);

    return (
        <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-2xl font-bold">⭐ {t.title}</h2>
                {published.length > 0 && (
                    <p className="flex items-center gap-2">
                        <Stars value={avg} size="text-2xl" />
                        <span className="font-bold">{avg.toFixed(1)}</span>
                        <span className="text-sm text-muted">
                            ({t.reviewsN.replace("{n}", String(published.length))})
                        </span>
                    </p>
                )}
            </div>

            {/* Form or message */}
            {!user ? (
                <Link
                    href="/login"
                    className="mt-4 inline-block rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-ocean-50"
                >
                    {t.loginToReview}
                </Link>
            ) : isOwner ? (
                <p className="mt-4 text-sm text-muted">{t.ownListing}</p>
            ) : mine ? (
                <p className="mt-4 text-sm text-muted">✓ {t.alreadyReviewed}</p>
            ) : (
                <ReviewForm targetType={targetType} targetId={targetId} />
            )}

            {/* List */}
            <div className="mt-6 grid gap-3">
                {all.length === 0 && <p className="text-muted">{t.none}</p>}
                {all.map((r) => (
                    <div
                        key={r.id}
                        className={`rounded-2xl border border-line bg-card p-4 ${r.status === "hidden" ? "opacity-60" : ""
                            }`}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-semibold">{r.author_name}</p>
                            <p className="text-xs text-muted">
                                {new Date(r.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <Stars value={r.rating} />
                        {r.status === "hidden" && (
                            <p className="text-xs text-amber-700">⚠ {t.hiddenLabel}</p>
                        )}
                        {r.comment && (
                            <p className="mt-1 whitespace-pre-line text-sm">{r.comment}</p>
                        )}
                        <ReviewActions
                            id={r.id}
                            isOwn={user?.id === r.author_id}
                            isAdmin={isAdmin}
                            status={r.status}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}