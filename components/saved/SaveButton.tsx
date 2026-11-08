"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { SAVED_TEXT } from "@/data/savedText";
import type { Locale3 } from "@/data/destinations";

type TargetType = "listing" | "destination" | "video" | "article";

export default function SaveButton({
    targetType,
    targetId,
    initialSaved,
    variant = "plain",
}: {
    targetType: TargetType;
    targetId: string;
    initialSaved?: boolean;
    variant?: "plain" | "overlay";
}) {
    const t = SAVED_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [saved, setSaved] = useState<boolean>(initialSaved ?? false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");

    // Find out if the visitor is logged in, and if this item is already saved
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (cancelled) return;
            setLoggedIn(Boolean(user));
            if (user && initialSaved === undefined) {
                const { data } = await supabase
                    .from("favorites")
                    .select("target_id")
                    .eq("target_type", targetType)
                    .eq("target_id", targetId)
                    .maybeSingle();
                if (!cancelled) setSaved(Boolean(data));
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [targetType, targetId, initialSaved]);

    async function toggle() {
        setMsg("");
        if (!loggedIn) {
            router.push("/login");
            return;
        }
        setBusy(true);
        const supabase = createClient();

        if (saved) {
            const { error } = await supabase
                .from("favorites")
                .delete()
                .eq("target_type", targetType)
                .eq("target_id", targetId);
            if (!error) {
                setSaved(false);
                router.refresh();
            }
        } else {
            const { error } = await supabase
                .from("favorites")
                .insert({ target_type: targetType, target_id: targetId });
            if (!error || error.code === "23505") {
                setSaved(true);
                router.refresh();
            } else {
                setMsg(error.code === "42501" ? t.limit : t.failed);
            }
        }
        setBusy(false);
    }

    const style =
        variant === "overlay"
            ? "border-white/60 bg-white/90 text-slate-900 hover:bg-white"
            : "border-line bg-card hover:bg-ocean-50";

    return (
        <div>
            <button
                type="button"
                onClick={toggle}
                disabled={busy}
                aria-pressed={saved}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${style}`}
            >
                <span className={saved ? "text-red-500" : ""}>{saved ? "♥" : "♡"}</span>
                {saved ? t.saved : t.save}
            </button>
            {msg && <p className="mt-2 max-w-xs text-xs text-red-600">{msg}</p>}
        </div>
    );
}