"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES, DISTRICTS, LIST_TEXT } from "@/data/listingText";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

type Initial = {
    id: string;
    name: string;
    category: string;
    description: string;
    district: string;
    phone: string;
    whatsapp: boolean;
    sltda_number: string | null;
};

export default function EditListingForm({ initial }: { initial: Initial }) {
    const locale = useLocale() as Locale3;
    const t = LIST_TEXT[locale];
    const m = MANAGE_TEXT[locale];
    const router = useRouter();

    const [category, setCategory] = useState(initial.category);
    const [name, setName] = useState(initial.name);
    const [description, setDescription] = useState(initial.description);
    const [district, setDistrict] = useState(initial.district);
    const [phone, setPhone] = useState(initial.phone);
    const [whatsapp, setWhatsapp] = useState(initial.whatsapp);
    const [sltda, setSltda] = useState(initial.sltda_number ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setDone(false);
        setLoading(true);
        const { data, error: err } = await createClient()
            .from("listings")
            .update({
                category,
                name: name.trim(),
                description: description.trim(),
                district,
                phone: phone.trim(),
                whatsapp,
                sltda_number: sltda.trim() || null,
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
            <h1 className="text-3xl font-bold">{m.editListing}</h1>
            <p className="rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                ℹ️ {m.reviewAgain} {m.photoNote}
            </p>

            <select required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                        {c.icon} {c.label[locale]}
                    </option>
                ))}
            </select>
            <input required minLength={2} maxLength={100} placeholder={t.fName} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            <textarea required minLength={10} maxLength={2000} rows={4} placeholder={t.fDescription} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
            <select required value={district} onChange={(e) => setDistrict(e.target.value)} className={inputClass}>
                {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
            <input type="tel" required placeholder={t.fPhone} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} className="h-4 w-4" />
                {t.fWhatsapp}
            </label>
            <input maxLength={50} placeholder={t.fSltda} value={sltda} onChange={(e) => setSltda(e.target.value)} className={inputClass} />

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