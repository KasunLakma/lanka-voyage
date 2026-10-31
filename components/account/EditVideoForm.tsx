"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { DISTRICTS } from "@/data/listingText";
import { VIDEO_CATEGORIES, VIDEO_TEXT } from "@/data/videoText";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

type Initial = {
    id: string;
    title: string;
    description: string | null;
    category: string;
    district: string;
};

export default function EditVideoForm({ initial }: { initial: Initial }) {
    const locale = useLocale() as Locale3;
    const t = VIDEO_TEXT[locale];
    const m = MANAGE_TEXT[locale];
    const router = useRouter();

    const [title, setTitle] = useState(initial.title);
    const [description, setDescription] = useState(initial.description ?? "");
    const [category, setCategory] = useState(initial.category);
    const [district, setDistrict] = useState(initial.district);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);
        setLoading(true);
        const { data, error: err } = await createClient()
            .from("videos")
            .update({
                title: title.trim(),
                description: description.trim() || null,
                category,
                district,
            })
            .eq("id", initial.id)
            .select("id");
        if (err) setError(`${m.failed} (${err.message})`);
        else if (!data || data.length === 0) setError(m.failed);
        else {
            setDone(true);
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">{m.editVideo}</h1>
            <p className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                ℹ️ {m.reviewAgain} {m.videoLinkFixed}
            </p>

            <input required minLength={3} maxLength={120} placeholder={t.fTitle} value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
            <textarea rows={3} maxLength={1000} placeholder={t.fDescription} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
            <select required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {VIDEO_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                        {c.icon} {c.label[locale]}
                    </option>
                ))}
            </select>
            <select required value={district} onChange={(e) => setDistrict(e.target.value)} className={inputClass}>
                {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            {error && <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
            {done && <p className="rounded-xl bg-ocean-50 px-4 py-3 text-sm text-ocean-800">✅ {m.saved}</p>}

            <button type="submit" disabled={loading} className={`${buttonStyles("primary")} disabled:opacity-60`}>
                {loading ? m.saving : m.save}
            </button>
            <Link href="/account" className="text-center text-sm text-ocean-700 underline">
                ← {m.back}
            </Link>
        </form>
    );
}