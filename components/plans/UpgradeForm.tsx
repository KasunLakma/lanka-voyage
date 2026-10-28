"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLAN_TEXT, BANK, totalPrice } from "@/data/planText";
import type { Locale3 } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-ocean-500";

export default function UpgradeForm() {
    const locale = useLocale() as Locale3;
    const t = PLAN_TEXT[locale];
    const router = useRouter();

    const [plan, setPlan] = useState<"plus" | "pro">("plus");
    const [months, setMonths] = useState(1);
    const [currency, setCurrency] = useState<"LKR" | "USD">("LKR");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [created, setCreated] = useState<{
        payment_code: string;
        amount: number;
        currency: string;
    } | null>(null);

    // Shown price only. The database calculates the real amount itself.
    const total = totalPrice(plan, currency, months);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { data, error: err } = await createClient()
            .from("payment_requests")
            .insert({ plan, months, currency, note: note.trim() || null })
            .select("payment_code,amount,currency")
            .single();

        if (err) {
            setError(err.code === "42501" ? t.tooMany : t.failed);
        } else {
            setCreated(data);
            setNote("");
            router.refresh();
        }
        setLoading(false);
    }

    const bankReady = BANK.bankName && BANK.accountNumber;

    return (
        <div id="upgrade" className="rounded-3xl border border-line bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">{t.upgradeTitle}</h2>

            {created ? (
                <div className="mt-4 space-y-4">
                    <p className="font-semibold text-ocean-700">✅ {t.sentTitle}</p>
                    <p className="text-sm">{t.sentSteps}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-ocean-50 p-4">
                            <p className="text-xs text-muted">{t.yourCode}</p>
                            <p className="mt-1 text-2xl font-extrabold tracking-wider text-ocean-800">
                                {created.payment_code}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-ocean-50 p-4">
                            <p className="text-xs text-muted">{t.amountToPay}</p>
                            <p className="mt-1 text-2xl font-extrabold text-ocean-800">
                                {created.currency} {Number(created.amount).toLocaleString("en-US")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-line p-4 text-sm">
                        <p className="mb-2 font-semibold">🏦 {t.bankTitle}</p>
                        {bankReady ? (
                            <ul className="space-y-1">
                                <li>{t.bankName}: {BANK.bankName}</li>
                                <li>{t.accountName}: {BANK.accountName}</li>
                                <li>{t.accountNumber}: {BANK.accountNumber}</li>
                                <li>{t.branch}: {BANK.branch}</li>
                            </ul>
                        ) : (
                            <p className="text-muted">{t.bankMissing}</p>
                        )}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                    <div>
                        <p className="mb-2 text-sm font-medium">{t.fPlan}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {(["plus", "pro"] as const).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPlan(p)}
                                    className={`rounded-xl border px-4 py-3 font-semibold transition ${plan === p
                                            ? "border-ocean-600 bg-ocean-50 text-ocean-800"
                                            : "border-line bg-surface"
                                        }`}
                                >
                                    {t[p]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium">{t.fMonths}</p>
                        <select
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            className={inputClass}
                        >
                            {[1, 3, 6, 12].map((m) => (
                                <option key={m} value={m}>
                                    {t.monthsN.replace("{n}", String(m))}
                                    {m === 12 ? " ⭐ (10)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium">{t.fCurrency}</p>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as "LKR" | "USD")}
                            className={inputClass}
                        >
                            <option value="LKR">{t.curLKR}</option>
                            <option value="USD">{t.curUSD}</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        maxLength={200}
                        placeholder={t.fNote}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className={inputClass}
                    />

                    <p className="text-lg font-bold">
                        {t.total}: {currency} {total.toLocaleString("en-US")}
                    </p>

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
                        {loading ? t.requesting : t.request}
                    </button>
                </form>
            )}
        </div>
    );
}