"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";

export default function DeleteAccount() {
    const t = MANAGE_TEXT[useLocale() as Locale3];
    const router = useRouter();
    const [text, setText] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        if (text !== "DELETE") return;
        setBusy(true);
        setError("");
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            setBusy(false);
            return;
        }

        // Administrators cannot delete their account here (checked before anything is removed)
        const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", user.id)
            .single();
        if (profile?.is_admin) {
            setError(t.adminCannot);
            setBusy(false);
            return;
        }

        // Remove the user's photos from storage first
        const [ls, as] = await Promise.all([
            supabase.from("listings").select("image_path").eq("owner_id", user.id),
            supabase.from("articles").select("image_path").eq("author_id", user.id),
        ]);
        const paths = [...(ls.data ?? []), ...(as.data ?? [])]
            .map((x) => x.image_path)
            .filter((p): p is string => Boolean(p));
        if (paths.length > 0) {
            await supabase.storage.from("listing-images").remove(paths);
        }

        const { error: err } = await supabase.rpc("delete_my_account");
        if (err) {
            setError(t.failed);
            setBusy(false);
            return;
        }

        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    return (
        <div className="mt-12 rounded-3xl border border-red-300 bg-card p-6">
            <h2 className="text-xl font-bold text-red-700">⚠️ {t.danger}</h2>
            <p className="mt-2 text-sm">{t.dangerWarn}</p>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.typeDelete}
                className="mt-4 w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-red-500"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <button
                type="button"
                onClick={handleDelete}
                disabled={busy || text !== "DELETE"}
                className="mt-3 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
            >
                {busy ? t.working : t.deleteBtn}
            </button>
        </div>
    );
}