"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { REPORT_TEXT } from "@/data/reportText";
import { ADMIN_TEXT } from "@/data/adminText";
import type { Locale3 } from "@/data/destinations";

const TABLE = {
    listing: "listings",
    video: "videos",
    article: "articles",
    review: "reviews",
} as const;

export default function ReportActions({
    targetType,
    targetId,
    status,
}: {
    targetType: keyof typeof TABLE;
    targetId: string;
    status: string;
}) {
    const locale = useLocale() as Locale3;
    const t = REPORT_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const router = useRouter();
    const [note, setNote] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function finish(
        newStatus: "resolved" | "dismissed",
        removeContent: boolean,
    ) {
        setBusy(true);
        setError("");
        const supabase = createClient();

        if (removeContent) {
            const values: Record<string, unknown> =
                targetType === "review"
                    ? { status: "hidden" }
                    : targetType === "listing"
                        ? { status: "rejected", verified: false, review_note: t.removedNote }
                        : { status: "rejected", review_note: t.removedNote };

            const { data, error: err } = await supabase
                .from(TABLE[targetType])
                .update(values)
                .eq("id", targetId)
                .select("id");

            if (err) {
                setError(err.message);
                setBusy(false);
                return;
            }
            if (!data || data.length === 0) {
                setError(at.notAllowed);
                setBusy(false);
                return;
            }
        }

        // Close ALL open reports about the same content
        const { error: err2 } = await supabase
            .from("reports")
            .update({ status: newStatus, admin_note: note.trim() || null })
            .eq("target_type", targetType)
            .eq("target_id", targetId)
            .eq("status", "open");

        if (err2) setError(err2.message);
        else router.refresh();
        setBusy(false);
    }

    if (status !== "open") return null;

    const btn =
        "rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-50";

    return (
        <div className="mt-4 border-t border-line pt-4">
            <input
                type="text"
                maxLength={500}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.notePh}
                className="mb-3 w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-ocean-500"
            />
            <div className="flex flex-wrap gap-2">
                <button
                    disabled={busy}
                    onClick={() => finish("resolved", true)}
                    className={`${btn} bg-red-600 text-white hover:bg-red-700`}
                >
                    {t.removeContent}
                </button>
                <button
                    disabled={busy}
                    onClick={() => finish("dismissed", false)}
                    className={`${btn} border border-line hover:bg-ocean-50`}
                >
                    {t.dismiss}
                </button>
                <button
                    disabled={busy}
                    onClick={() => finish("resolved", false)}
                    className={`${btn} border border-line hover:bg-ocean-50`}
                >
                    {t.resolveOnly}
                </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}