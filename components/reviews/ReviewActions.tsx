"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { REVIEW_TEXT } from "@/data/reviewText";
import type { Locale3 } from "@/data/destinations";

export default function ReviewActions({
    id,
    isOwn,
    isAdmin,
    status,
}: {
    id: string;
    isOwn: boolean;
    isAdmin: boolean;
    status: string;
}) {
    const t = REVIEW_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    async function toggleHidden() {
        setBusy(true);
        const { error } = await createClient()
            .from("reviews")
            .update({ status: status === "hidden" ? "published" : "hidden" })
            .eq("id", id);
        if (!error) router.refresh();
        setBusy(false);
    }

    async function remove() {
        if (!window.confirm(t.confirmDelete)) return;
        setBusy(true);
        const { error } = await createClient().from("reviews").delete().eq("id", id);
        if (!error) router.refresh();
        setBusy(false);
    }

    return (
        <div className="mt-2 flex gap-3 text-xs">
            {isAdmin && (
                <button
                    disabled={busy}
                    onClick={toggleHidden}
                    className="text-amber-700 underline disabled:opacity-50"
                >
                    {status === "hidden" ? t.unhide : t.hide}
                </button>
            )}
            {isOwn && (
                <button
                    disabled={busy}
                    onClick={remove}
                    className="text-red-600 underline disabled:opacity-50"
                >
                    {t.delete}
                </button>
            )}
        </div>
    );
}