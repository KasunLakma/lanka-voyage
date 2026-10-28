"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { parseYoutubeId } from "@/lib/youtube";
import { DISTRICTS } from "@/data/listingText";
import { VIDEO_CATEGORIES, VIDEO_TEXT } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";
import { PLAN_TEXT } from "@/data/planText";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

export default function VideoForm() {
    const locale = useLocale() as Locale3;
    const t = VIDEO_TEXT[locale];

    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [district, setDistrict] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);

        const youtubeId = parseYoutubeId(url);
        if (!youtubeId) {
            setError(t.badUrl);
            return;
        }

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

        const { error: err } = await supabase.from("videos").insert({
            owner_id: user.id,
            youtube_id: youtubeId,
            title: title.trim(),
            description: description.trim() || null,
            category,
            district,
        });

        if (err) {
            setError(
                err.code === "23505"
                    ? t.duplicate
                    : err.code === "42501"
                        ? PLAN_TEXT[locale].limitReached
                        : `${t.saveFailed} (${err.message})`,
            );
        } else {
            setDone(true);
            setUrl("");
            setTitle("");
            setDescription("");
            setCategory("");
            setDistrict("");
            setAgree(false);
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">{t.addVideo}</h1>

            <div className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                <p className="font-semibold">ℹ️ {t.rulesTitle}</p>
                <p className="mt-1">{t.rules}</p>
            </div>

            <div>
                <input
                    type="url"
                    required
                    placeholder={t.fUrl}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={inputClass}
                />
                <p className="mt-1 text-xs text-muted">{t.fUrlHint}</p>
            </div>

            <input
                type="text"
                required
                minLength={3}
                maxLength={120}
                placeholder={t.fTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
            />

            <textarea
                rows={3}
                maxLength={1000}
                placeholder={t.fDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
            />

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

            <label className="flex items-start gap-2 text-sm">
                <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4"
                />
                {t.ownVideo}
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