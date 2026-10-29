"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { resizeImage } from "@/lib/images";
import { DISTRICTS } from "@/data/listingText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import { ARTICLE_TEXT, ARTICLE_LANGS } from "@/data/articleText";
import { PLAN_TEXT } from "@/data/planText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

export default function ArticleForm() {
    const locale = useLocale() as Locale3;
    const t = ARTICLE_TEXT[locale];
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [language, setLanguage] = useState<string>(locale);
    const [category, setCategory] = useState("");
    const [district, setDistrict] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);
        setLoading(true);

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            setError(t.loginFirst);
            setLoading(false);
            return;
        }

        let imagePath: string | null = null;
        if (file) {
            try {
                const blob = await resizeImage(file);
                imagePath = `articles/${user.id}/${crypto.randomUUID()}.jpg`;
                const { error: upErr } = await supabase.storage
                    .from("listing-images")
                    .upload(imagePath, blob, { contentType: "image/jpeg" });
                if (upErr) {
                    setError(`${t.saveFailed} (${upErr.message})`);
                    setLoading(false);
                    return;
                }
            } catch {
                setError(t.saveFailed);
                setLoading(false);
                return;
            }
        }

        const { error: err } = await supabase.from("articles").insert({
            author_id: user.id,
            title: title.trim(),
            summary: summary.trim(),
            body: body.trim(),
            language,
            category,
            district,
            image_path: imagePath,
        });

        if (err) {
            if (imagePath) {
                await supabase.storage.from("listing-images").remove([imagePath]);
            }
            setError(
                err.code === "42501"
                    ? PLAN_TEXT[locale].limitReached
                    : `${t.saveFailed} (${err.message})`,
            );
        } else {
            setDone(true);
            setTitle("");
            setSummary("");
            setBody("");
            setCategory("");
            setDistrict("");
            setFile(null);
            setAgree(false);
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">{t.write}</h1>

            <div className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                <p className="font-semibold">ℹ️ {t.rulesTitle}</p>
                <p className="mt-1">{t.rules}</p>
            </div>

            <input
                type="text"
                required
                minLength={5}
                maxLength={150}
                placeholder={t.fTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
            />

            <textarea
                required
                minLength={10}
                maxLength={300}
                rows={2}
                placeholder={t.fSummary}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={inputClass}
            />

            <div>
                <textarea
                    required
                    minLength={200}
                    maxLength={20000}
                    rows={12}
                    placeholder={t.fBody}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={inputClass}
                />
                <p className="mt-1 text-xs text-muted">{t.fBodyHint}</p>
            </div>

            <select
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={inputClass}
                aria-label={t.fLanguage}
            >
                {ARTICLE_LANGS.map((l) => (
                    <option key={l.key} value={l.key}>
                        {t.fLanguage}: {l.label}
                    </option>
                ))}
            </select>

            <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
            >
                <option value="">{t.chooseCategory}</option>
                {VIDEO_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                        {c.icon} {c.label[locale]}
                    </option>
                ))}
            </select>

            <select
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={inputClass}
            >
                <option value="">{t.chooseDistrict}</option>
                {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            <div>
                <p className="mb-1 text-sm font-medium">{t.fCover}</p>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm"
                />
            </div>

            <label className="flex items-start gap-2 text-sm">
                <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4"
                />
                {t.ownWork}
            </label>

            {error && (
                <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            {done && (
                <p className="rounded-xl bg-ocean-50 px-4 py-3 text-sm text-ocean-800">
                    ✅ {t.saved}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`${buttonStyles("primary")} disabled:opacity-60`}
            >
                {loading ? t.submitting : t.submit}
            </button>
        </form>
    );
}