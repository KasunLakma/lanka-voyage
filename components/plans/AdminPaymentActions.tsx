"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLAN_TEXT } from "@/data/planText";
import { ADMIN_TEXT } from "@/data/adminText";
import type { Locale3 } from "@/data/destinations";

export default function AdminPaymentActions({
    id,
    status,
}: {
    id: string;
    status: string;
}) {
    const locale = useLocale() as Locale3;
    const t = PLAN_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const router = useRouter();
    const [note, setNote] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function approve() {
        setBusy(true);
        setError("");
        const { error: err } = await createClient().rpc("approve_payment", {
            p_id: id,
        });
        if (err) setError(err.message);
        else router.refresh();
        setBusy(false);
    }

    async function reject() {
        setBusy(true);
        setError("");
        const { data, error: err } = await createClient()
            .from("payment_requests")
            .update({
                status: "rejected",
                review_note: note.trim() || null,
                reviewed_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select("id");
        if (err) setError(err.message);
        else if (!data || data.length === 0) setError(at.notAllowed);
        else router.refresh();
        setBusy(false);
    }

    if (status !== "pending") return null;

    return (
        <div className="mt-4 border-t border-line pt-4">
            <button
                disabled={busy}
                onClick={approve}
                className="rounded-full bg-ocean-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-700 disabled:opacity-50"
            >
                {t.approve}
            </button>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                    type="text"
                    maxLength={500}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t.notePh}
                    className="flex-1 rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-ocean-500"
                />
                <button
                    disabled={busy}
                    onClick={reject}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                    {t.reject}
                </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}