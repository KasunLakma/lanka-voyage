"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { applyFilters, buildQuery, type Filters } from "@/lib/directoryFilters";
import { CATEGORIES, DISTRICTS } from "@/data/listingText";
import { FILTER_TEXT } from "@/data/filterText";
import type { Locale3 } from "@/data/destinations";

export default function FilterSheet({ initial }: { initial: Filters }) {
    const locale = useLocale() as Locale3;
    const t = FILTER_TEXT[locale];
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<Filters>(initial);
    const [q, setQ] = useState(initial.q);
    const [count, setCount] = useState<number | null>(null);

    const active =
        (initial.category ? 1 : 0) +
        (initial.district ? 1 : 0) +
        (initial.verified ? 1 : 0);

    useEffect(() => {
        setQ(initial.q);
    }, [initial.q]);

    // Lock page scrolling and allow Esc to close while the sheet is open
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    // Live count: "Show N places"
    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        setCount(null);
        const timer = setTimeout(async () => {
            const base = createClient()
                .from("listings")
                .select("id", { count: "exact", head: true })
                .eq("status", "published");
            const { count: c } = await applyFilters(base, {
                ...draft,
                q: initial.q,
            });
            if (!cancelled) setCount(c ?? 0);
        }, 250);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [open, draft, initial.q]);

    function openSheet() {
        setDraft({ ...initial });
        setOpen(true);
    }

    function apply() {
        router.push(buildQuery({ ...draft, q: initial.q }));
        setOpen(false);
    }

    function submitSearch(e: React.FormEvent) {
        e.preventDefault();
        router.push(buildQuery({ ...initial, q }));
    }

    const chip = (on: boolean) =>
        `rounded-full border px-4 py-2 text-sm font-medium transition ${on
            ? "border-ocean-600 bg-ocean-600 text-white"
            : "border-line bg-surface hover:bg-ocean-50"
        }`;

    return (
        <>
            <div className="mb-5 flex gap-2">
                <form
                    onSubmit={submitSearch}
                    className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-card px-4"
                >
                    <span aria-hidden>🔍</span>
                    <input
                        type="search"
                        value={q}
                        maxLength={60}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={t.searchPh}
                        className="min-w-0 flex-1 bg-transparent py-3 outline-none"
                    />
                </form>
                <button
                    type="button"
                    onClick={openSheet}
                    className="relative shrink-0 whitespace-nowrap rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                >
                    ⚙️ {t.filters}
                    {active > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-slate-900">
                            {active}
                        </span>
                    )}
                </button>
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        aria-label={t.close}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/50"
                    />

                    <div className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-card p-6 pb-0 shadow-2xl sm:max-w-lg sm:rounded-3xl">
                        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">{t.filters}</h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label={t.close}
                                className="px-2 text-xl text-muted"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="mb-2 mt-5 text-sm font-semibold">{t.category}</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setDraft({ ...draft, category: "" })}
                                className={chip(draft.category === "")}
                            >
                                {t.all}
                            </button>
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c.key}
                                    type="button"
                                    onClick={() => setDraft({ ...draft, category: c.key })}
                                    className={chip(draft.category === c.key)}
                                >
                                    {c.icon} {c.label[locale]}
                                </button>
                            ))}
                        </div>

                        <p className="mb-2 mt-6 text-sm font-semibold">{t.district}</p>
                        <select
                            value={draft.district}
                            onChange={(e) => setDraft({ ...draft, district: e.target.value })}
                            className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500"
                        >
                            <option value="">{t.anyDistrict}</option>
                            {DISTRICTS.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                        <label className="mt-6 flex cursor-pointer items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
                            <span className="text-sm font-semibold">✔ {t.verifiedOnly}</span>
                            <input
                                type="checkbox"
                                checked={draft.verified}
                                onChange={(e) =>
                                    setDraft({ ...draft, verified: e.target.checked })
                                }
                                className="h-5 w-5 accent-ocean-600"
                            />
                        </label>

                        <div className="sticky bottom-0 -mx-6 mt-6 flex items-center gap-3 border-t border-line bg-card px-6 py-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setDraft({
                                        category: "",
                                        district: "",
                                        verified: false,
                                        q: initial.q,
                                    })
                                }
                                className="text-sm font-semibold text-muted underline"
                            >
                                {t.reset}
                            </button>
                            <button
                                type="button"
                                onClick={apply}
                                disabled={count === 0}
                                className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                            >
                                {count === null
                                    ? "…"
                                    : count === 0
                                        ? t.showNone
                                        : t.showN.replace("{n}", String(count))}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}