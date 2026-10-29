"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { REVIEW_TEXT } from "@/data/reviewText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

export default function ReviewForm({
    targetType,
    targetId,
}: {
    targetType: "listing" | "destination";
    targetId: string;
}) {
    const t = REVIEW_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (rating === 0) return;
        setError("");
        setLoading(true);

        const { error: err } = await createClient().from("reviews").insert({
            target_type: targetType,
            target_id: targetId,
            rating,
            comment: comment.trim() || null,
        });

        if (err) {
            if (err.code === "23505") setError(t.dup);
            else if (err.message.includes("too many")) setError(t.tooMany);
            else setError(`${t.failed} (${err.message})`);
            setLoading(false);
        } else {
            setComment("");
            setRating(0);
            setLoading(false);
            router.refresh();
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-line bg-card p-5"
        >
            <p className="font-semibold">{t.write}</p>

            <p className="mt-3 text-sm text-muted">{t.yourRating}</p>
            <div className="mt-1 flex gap-1" role="radiogroup" aria-label={t.yourRating}>
                {[1, 2, 3, 4, 5].map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        aria-label={`${n}`}
                        className={`text-3xl transition ${n <= rating ? "text-gold-500" : "text-line hover:text-gold-400"
                            }`}
                    >
                        ★
                    </button>
                ))}
            </div>

            <textarea
                rows={3}
                maxLength={1000}
                placeholder={t.commentPh}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-3 w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500"
            />

            {error && (
                <p className="mt-3 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading || rating === 0}
                className={`${buttonStyles("primary")} mt-3 disabled:opacity-50`}
            >
                {loading ? t.submitting : t.submit}
            </button>
        </form>
    );
}