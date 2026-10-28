"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { resizeImage } from "@/lib/images";
import { CATEGORIES, DISTRICTS, LIST_TEXT } from "@/data/listingText";
import { PHOTO_TEXT } from "@/data/photoText";
import { MAP_TEXT } from "@/data/mapText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";
import LocationPicker, { type LatLng } from "@/components/map/LocationPicker";
import { PLAN_TEXT } from "@/data/planText";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

export default function ListingForm() {
    const locale = useLocale() as Locale3;
    const t = LIST_TEXT[locale];
    const p = PHOTO_TEXT[locale];
    const m = MAP_TEXT[locale];
    const router = useRouter();

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [district, setDistrict] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState(false);
    const [sltda, setSltda] = useState("");
    const [location, setLocation] = useState<LatLng | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const chosen = e.target.files?.[0];
        if (!chosen) return;
        if (!chosen.type.startsWith("image/") || chosen.size > 15 * 1024 * 1024) {
            setError(p.notImage);
            return;
        }
        setError("");
        setFile(chosen);
        setPreview(URL.createObjectURL(chosen));
    }

    function removeFile() {
        setFile(null);
        setPreview("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
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

        // 1) Upload the photo (if any)
        let imagePath: string | null = null;
        if (file) {
            try {
                const blob = await resizeImage(file);
                imagePath = `${user.id}/${crypto.randomUUID()}.jpg`;
                const { error: upErr } = await supabase.storage
                    .from("listing-images")
                    .upload(imagePath, blob, { contentType: "image/jpeg" });
                if (upErr) {
                    setError(`${p.failed} (${upErr.message})`);
                    setLoading(false);
                    return;
                }
            } catch {
                setError(p.failed);
                setLoading(false);
                return;
            }
        }

        // 2) Save the listing
        const { error: err } = await supabase.from("listings").insert({
            owner_id: user.id,
            category,
            name: name.trim(),
            description: description.trim(),
            district,
            phone: phone.trim(),
            whatsapp,
            sltda_number: sltda.trim() || null,
            image_path: imagePath,
            lat: location?.lat ?? null,
            lng: location?.lng ?? null,
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
            setLoading(false);
        } else {
            router.push("/provider");
            router.refresh();
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
        >
            <h1 className="text-3xl font-bold">{t.addListing}</h1>
            <p className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                ℹ️ {t.tourismOnly}
            </p>

            <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
            >
                <option value="">{t.chooseCategory}</option>
                {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                        {c.icon} {c.label[locale]}
                    </option>
                ))}
            </select>

            <input
                type="text"
                required
                minLength={2}
                maxLength={100}
                placeholder={t.fName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
            />

            <textarea
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                placeholder={t.fDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
            />

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

            <input
                type="tel"
                required
                placeholder={t.fPhone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
            />

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.checked)}
                    className="h-4 w-4"
                />
                {t.fWhatsapp}
            </label>

            <input
                type="text"
                maxLength={50}
                placeholder={t.fSltda}
                value={sltda}
                onChange={(e) => setSltda(e.target.value)}
                className={inputClass}
            />

            {/* Location on the map */}
            <div>
                <p className="mb-2 text-sm font-medium">{m.locationLabel}</p>
                <LocationPicker value={location} onChange={setLocation} labels={m} />
            </div>

            {/* Cover photo */}
            <div>
                <p className="mb-2 text-sm font-medium">{p.label}</p>
                {preview ? (
                    <div className="relative overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="" className="h-48 w-full object-cover" />
                        <button
                            type="button"
                            onClick={removeFile}
                            className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white"
                        >
                            ✕ {p.remove}
                        </button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFile}
                        className="w-full rounded-xl border border-dashed border-line bg-surface px-4 py-6 text-sm"
                    />
                )}
                <p className="mt-1 text-xs text-muted">{p.hint}</p>
            </div>

            {error && (
                <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                    {error}
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