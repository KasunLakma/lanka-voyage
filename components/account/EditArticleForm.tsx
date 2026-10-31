"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { DISTRICTS } from "@/data/listingText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import { ARTICLE_TEXT, ARTICLE_LANGS } from "@/data/articleText";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

type Initial = {
    id: string;
    title: string;
    summary: string;
    body: string;
    language: string;
    category: string;
    district: string;
};

export default function EditArticleForm({ initial }: { initial: Initial }) {
    const locale = useLocale() as Locale3;
    const t = ARTICLE_TEXT[locale];
    const m = MANAGE_TEXT[locale];
    const router = useRouter();

    const [title, setTitle] = useState(initial.title);
    const [summary, setSummary] = useState(initial.summary);
    const [body, setBody] = useState(initial.body);
    const [language, setLanguage] = useState(initial.language);
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
            .from("articles")
            .update({
                title: title.trim(),
                summary: summary.trim(),
                body: body.trim(),
                language,
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
            className="mx-auto flex max-w-2xl flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">{m.editArticle}</h1>
            <p className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                ℹ️ {m.reviewAgain} {m.photoNote}
            </p>

            <input required minLength={5} maxLength={150} placeholder={t.fTitle} value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
            <textarea required minLength={10} maxLength={300} rows={2} placeholder={t.fSummary} value={summary} onChange={(e) => setSummary(e.target.value)} className={inputClass} />
            <textarea required minLength={200} maxLength={20000} rows={12} placeholder={t.fBody} value={body} onChange={(e) => setBody(e.target.value)} className={inputClass} />
            <select required value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass}>
                {ARTICLE_LANGS.map((l) => (
                    <option key={l.key} value={l.key}>
                        {t.fLanguage}: {l.label}
                    </option>
                ))}
            </select>
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