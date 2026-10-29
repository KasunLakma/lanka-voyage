"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_TEXT } from "@/data/adminText";
import type { Locale3 } from "@/data/destinations";

// Approve / reject buttons for any table that has `status` and `review_note`
export default function ModerationActions({
    table,
    id,
    status,
}: {
    table: "articles";
    id: string;
    status: string;
}) {
    const t = ADMIN_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [note, setNote] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function update(values: Record<string, unknown>) {
        setBusy(true);
        setError("");
        const { data, error: err } = await createClient()
            .from(table)
            .update(values)
            .eq("id", id)
            .select("id");
        if (err) setError(err.message);
        else if (!data || data.length === 0) setError(t.notAllowed);
        else router.refresh();
        setBusy(false);
    }

    const btn =
        "rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-50";

    return (
        <div className="mt-4 border-t border-line pt-4">
            {status !== "published" && (
                <button
                    disabled={busy}
                    onClick={() => update({ status: "published", review_note: null })}
                    className={`${btn} mr-2 bg-ocean-600 text-white hover:bg-ocean-700`}
                >
                    {t.approve}
                </button>
            )}
            {status !== "pending" && (
                <button
                    disabled={busy}
                    onClick={() => update({ status: "pending" })}
                    className={`${btn} border border-line hover:bg-ocean-50`}
                >
                    {t.backToPending}
                </button>
            )}
            {status !== "rejected" && (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                        type="text"
                        maxLength={500}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={t.notePlaceholder}
                        className="flex-1 rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-ocean-500"
                    />
                    <button
                        disabled={busy}
                        onClick={() =>
                            update({ status: "rejected", review_note: note.trim() || null })
                        }
                        className={`${btn} bg-red-600 text-white hover:bg-red-700`}
                    >
                        {t.reject}
                    </button>
                </div>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}