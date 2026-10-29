"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { resizeImage } from "@/lib/images";
import { DISTRICTS } from "@/data/listingText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import { UPCOMING_TEXT } from "@/data/upcomingText";
import { MAP_TEXT } from "@/data/mapText";
import { UI_TEXT, type Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";
import LocationPicker, { type LatLng } from "@/components/map/LocationPicker";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

const EMPTY = {
    name_en: "",
    name_si: "",
    name_ta: "",
    summary_en: "",
    summary_si: "",
    summary_ta: "",
    category: "",
    district: "",
    status: "planned",
    year: "",
    source_url: "",
};

export default function UpcomingAdminForm() {
    const locale = useLocale() as Locale3;
    const t = UPCOMING_TEXT[locale];
    const ui = UI_TEXT[locale];
    const m = MAP_TEXT[locale];
    const router = useRouter();

    const [f, setF] = useState(EMPTY);
    const [location, setLocation] = useState<LatLng | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const set = (key: keyof typeof EMPTY) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setF({ ...f, [key]: e.target.value });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);
        setLoading(true);
        const supabase = createClient();

        let imagePath: string | null = null;
        if (file) {
            try {
                const blob = await resizeImage(file);
                imagePath = `upcoming/${crypto.randomUUID()}.jpg`;
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
        }

        const { error: err } = await supabase.from("upcoming_destinations").insert({
            name_en: f.name_en.trim(),
            name_si: f.name_si.trim() || null,
            name_ta: f.name_ta.trim() || null,
            summary_en: f.summary_en.trim() || null,
            summary_si: f.summary_si.trim() || null,
            summary_ta: f.summary_ta.trim() || null,
            category: f.category,
            district: f.district,
            status: f.status,
            expected_year: f.year ? Number(f.year) : null,
            source_url: f.source_url.trim(),
            image_path: imagePath,
            lat: location?.lat ?? null,
            lng: location?.lng ?? null,
            published: false,
        });

        if (err) {
            if (imagePath) {
                await supabase.storage.from("listing-images").remove([imagePath]);
            }
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
            <h2 className="text-2xl font-bold">➕ {t.addNew}</h2>

            <input required minLength={2} maxLength={120} placeholder={t.fNameEn} value={f.name_en} onChange={set("name_en")} className={inputClass} />
            <input maxLength={120} placeholder={t.fNameSi} value={f.name_si} onChange={set("name_si")} className={inputClass} />
            <input maxLength={120} placeholder={t.fNameTa} value={f.name_ta} onChange={set("name_ta")} className={inputClass} />

            <textarea rows={2} maxLength={1000} placeholder={t.fSummaryEn} value={f.summary_en} onChange={set("summary_en")} className={inputClass} />
            <textarea rows={2} maxLength={1000} placeholder={t.fSummarySi} value={f.summary_si} onChange={set("summary_si")} className={inputClass} />
            <textarea rows={2} maxLength={1000} placeholder={t.fSummaryTa} value={f.summary_ta} onChange={set("summary_ta")} className={inputClass} />

            <select required value={f.category} onChange={set("category")} className={inputClass}>
                <option value="">{t.chooseCategory}</option>
                {VIDEO_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                        {c.icon} {c.label[locale]}
                    </option>
                ))}
            </select>

            <select required value={f.district} onChange={set("district")} className={inputClass}>
                <option value="">{t.chooseDistrict}</option>
                {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            <select required value={f.status} onChange={set("status")} className={inputClass}>
                <option value="planned">{ui.planned}</option>
                <option value="under_construction">{ui.underConstruction}</option>
                <option value="opening_soon">{ui.opensSoon}</option>
            </select>

            <input type="number" min={2024} max={2045} placeholder={t.fYear} value={f.year} onChange={set("year")} className={inputClass} />

            <div>
                <input
                    type="url"
                    required
                    pattern="https://.*"
                    placeholder={t.fSource}
                    value={f.source_url}
                    onChange={set("source_url")}
                    className={inputClass}
                />
                <p className="mt-1 text-xs text-muted">{t.fSourceHint}</p>
            </div>

            <div>
                <p className="mb-1 text-sm font-medium">{t.fPhoto}</p>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm"
                />
            </div>

            <div>
                <p className="mb-1 text-sm font-medium">{t.mapHint}</p>
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