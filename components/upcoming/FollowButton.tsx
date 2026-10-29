"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { UPCOMING_TEXT } from "@/data/upcomingText";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default function FollowButton({
    id,
    followed,
    loggedIn,
}: {
    id: string;
    followed: boolean;
    loggedIn: boolean;
}) {
    const locale = useLocale() as Locale3;
    const t = UPCOMING_TEXT[locale];
    const ui = UI_TEXT[locale];
    const [on, setOn] = useState(followed);
    const [busy, setBusy] = useState(false);

    if (!loggedIn) {
        return (
            <Link
                href="/login"
                className="mt-5 inline-block rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-ocean-50"
            >
                🔔 {t.loginToFollow}
            </Link>
        );
    }

    async function toggle() {
        setBusy(true);
        const supabase = createClient();
        const { error } = on
            ? await supabase.from("upcoming_follows").delete().eq("upcoming_id", id)
            : await supabase.from("upcoming_follows").insert({ upcoming_id: id });
        if (!error) setOn(!on);
        setBusy(false);
    }

    return (
        <button
            type="button"
            onClick={toggle}
            disabled={busy}
            className={`mt-5 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${on
                    ? "bg-ocean-50 text-ocean-800"
                    : "bg-ocean-600 text-white hover:bg-ocean-700"
                }`}
        >
            {on ? t.following : `🔔 ${ui.follow}`}
        </button>
    );
}