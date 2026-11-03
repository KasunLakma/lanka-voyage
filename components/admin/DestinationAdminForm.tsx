"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { resizeImage } from "@/lib/images";
import { DEST_ADMIN_TEXT } from "@/data/destAdminText";
import { MAP_TEXT } from "@/data/mapText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";
import LocationPicker, { type LatLng } from "@/components/map/LocationPicker";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

const CATEGORY_KEYS = [
    "beaches",
    "hillCountry",
    "culture",
    "wildlife",
    "waterfalls",
    "food",
    "nightlife",
    "wellness",
    "adventure",
    "festivals",
];

const LANGS = [
    { code: "en", label: "English" },
    { code: "si", label: "සිංහල" },
    { code: "ta", label: "தமிழ்" },
] as const;

const lines = (s: string) =>
    s
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 8);

const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

type Fields = Record<string, string>;
const EMPTY: Fields = {
    slug: "",
    category: "",
    name_en: "", name_si: "", name_ta: "",
    summary_en: "", summary_si: "", summary_ta: "",
    best_time_en: "", best_time_si: "", best_time_ta: "",
    highlights_en: "", highlights_si: "", highlights_ta: "",
};

export default function DestinationAdminForm() {
    const locale = useLocale() as Locale3;
    const t = DEST_ADMIN_TEXT[locale];
    const m = MAP_TEXT[locale];
    const tc = useTranslations("categories");
    const router = useRouter();

    const [f, setF] = useState<Fields>(EMPTY);
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<LatLng | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const set =
        (key: string) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setF({ ...f, [key]: e.target.value });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);

        const slug = slugify(f.slug || f.name_en);
        if (f.name_en.trim().length < 2 || slug.length < 2) return setError(t.needName);
        if (!file) return setError(t.needPhoto);
        if (!location) return setError(t.needLocation);

        setLoading(true);
        const supabase = createClient();

        let imagePath = "";
        try {
            const blob = await resizeImage(file, 2200, 0.82);
            imagePath = `destinations/${crypto.randomUUID()}.jpg`;
            const { error: upErr } = await supabase.storage
                .from("listing-images")
                .upload(imagePath, blob, { contentType: "image/jpeg" });
            if (upErr) {
                setError(`${t.failed} (${upErr.message})`);
                setLoading(false);
                return;
            }
        } catch {
            setError(t.failed);
            setLoading(false);
            return;
        }

        const { error: err } = await supabase.from("destinations").insert({
            slug,
            category: f.category,
            name_en: f.name_en.trim(),
            name_si: f.name_si.trim() || null,
            name_ta: f.name_ta.trim() || null,
            summary_en: f.summary_en.trim() || null,
            summary_si: f.summary_si.trim() || null,
            summary_ta: f.summary_ta.trim() || null,
            best_time_en: f.best_time_en.trim() || null,
            best_time_si: f.best_time_si.trim() || null,
            best_time_ta: f.best_time_ta.trim() || null,
            highlights_en: lines(f.highlights_en),
            highlights_si: lines(f.highlights_si),
            highlights_ta: lines(f.highlights_ta),
            image: imagePath,
            lat: location.lat,
            lng: location.lng,
            sort_order: 100,
            published: false,
        });

        if (err) {
            await supabase.storage.from("listing-images").remove([imagePath]);
            setError(`${t.failed} (${err.message})`);
        } else {
            setDone(true);
            setF(EMPTY);
            setFile(null);
            setLocation(null);
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-3xl border border-line bg-card p-6 shadow-sm"
        >
            <h2 className="text-2xl font-bold">➕ {t.add}</h2>

            <input placeholder={t.slug} value={f.slug} onChange={set("slug")} className={inputClass} />

            <select required value={f.category} onChange={set("category")} className={inputClass}>
                <option value="">{t.chooseCategory}</option>
                {CATEGORY_KEYS.map((k) => (
                    <option key={k} value={k}>
                        {tc(k)}
                    </option>
                ))}
            </select>

            {LANGS.map((l) => (
                <fieldset key={l.code} className="rounded-2xl border border-line p-4">
                    <legend className="px-2 text-sm font-bold text-ocean-700">{l.label}</legend>
                    <div className="flex flex-col gap-2">
                        <input
                            required={l.code === "en"}
                            maxLength={80}
                            placeholder={`${t.name} (${l.label})${l.code === "en" ? " *" : ""}`}
                            value={f[`name_${l.code}`]}
                            onChange={set(`name_${l.code}`)}
                            className={inputClass}
                        />
                        <textarea
                            rows={3}
                            maxLength={2000}
                            placeholder={`${t.summary} (${l.label})`}
                            value={f[`summary_${l.code}`]}
                            onChange={set(`summary_${l.code}`)}
                            className={inputClass}
                        />
                        <input
                            maxLength={120}
                            placeholder={`${t.bestTime} (${l.label})`}
                            value={f[`best_time_${l.code}`]}
                            onChange={set(`best_time_${l.code}`)}
                            className={inputClass}
                        />
                        <textarea
                            rows={3}
                            placeholder={`${t.highlights} (${l.label})`}
                            value={f[`highlights_${l.code}`]}
                            onChange={set(`highlights_${l.code}`)}
                            className={inputClass}
                        />
                    </div>
                </fieldset>
            ))}

            <div>
                <p className="mb-1 text-sm font-medium">{t.photo}</p>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm"
                />
            </div>

            <div>
                <p className="mb-1 text-sm font-medium">{t.location}</p>
                <LocationPicker value={location} onChange={setLocation} labels={m} />
            </div>

            {error && <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
            {done && <p className="rounded-xl bg-ocean-50 px-4 py-3 text-sm text-ocean-800">✅ {t.saved}</p>}

            <button type="submit" disabled={loading} className={`${buttonStyles("primary")} disabled:opacity-60`}>
                {loading ? t.saving : t.save}
            </button>
        </form>
    );
}