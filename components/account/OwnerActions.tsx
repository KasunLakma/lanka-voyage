"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";

export default function OwnerActions({
    table,
    id,
    imagePath,
    editHref,
}: {
    table: "listings" | "videos" | "articles";
    id: string;
    imagePath?: string | null;
    editHref: string;
}) {
    const t = MANAGE_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function remove() {
        if (!window.confirm(t.confirmDelete)) return;
        setBusy(true);
        setError("");
        const supabase = createClient();
        const { error: err } = await supabase.from(table).delete().eq("id", id);
        if (err) {
            setError(t.failed);
        } else {
            if (imagePath) {
                await supabase.storage.from("listing-images").remove([imagePath]);
            }
            router.refresh();
        }
        setBusy(false);
    }

    return (
        <div className="mt-2 flex gap-4 text-xs">
            <Link href={editHref} className="text-ocean-700 underline">
                {t.edit}
            </Link>
            <button
                type="button"
                disabled={busy}
                onClick={remove}
                className="text-red-600 underline disabled:opacity-50"
            >
                {t.delete}
            </button>
            {error && <span className="text-red-600">{error}</span>}
        </div>
    );
}