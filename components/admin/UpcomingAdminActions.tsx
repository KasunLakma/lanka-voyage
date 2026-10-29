"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { UPCOMING_TEXT } from "@/data/upcomingText";
import type { Locale3 } from "@/data/destinations";

export default function UpcomingAdminActions({
    id,
    published,
}: {
    id: string;
    published: boolean;
}) {
    const t = UPCOMING_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function togglePublish() {
        setBusy(true);
        setError("");
        const { data, error: err } = await createClient()
            .from("upcoming_destinations")
            .update({ published: !published })
            .eq("id", id)
            .select("id");
        if (err) setError(err.message);
        else if (!data || data.length === 0) setError("Not allowed");
        else router.refresh();
        setBusy(false);
    }

    async function remove() {
        if (!window.confirm(t.confirmDelete)) return;
        setBusy(true);
        setError("");
        const { error: err } = await createClient()
            .from("upcoming_destinations")
            .delete()
            .eq("id", id);
        if (err) setError(err.message);
        else router.refresh();
        setBusy(false);
    }

    return (
        <div className="mt-3">
            <button
                disabled={busy}
                onClick={togglePublish}
                className={`mr-2 rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50 ${published
                        ? "border border-line hover:bg-ocean-50"
                        : "bg-ocean-600 text-white hover:bg-ocean-700"
                    }`}
            >
                {published ? t.unpublish : t.publish}
            </button>
            <button
                disabled={busy}
                onClick={remove}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
                {t.delete}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}