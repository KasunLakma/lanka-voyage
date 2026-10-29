"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { REPORT_TEXT, REPORT_REASONS } from "@/data/reportText";
import type { Locale3 } from "@/data/destinations";

export default function ReportButton({
    targetType,
    targetId,
}: {
    targetType: "listing" | "video" | "article" | "review";
    targetId: string;
}) {
    const t = REPORT_TEXT[useLocale() as Locale3];
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{
        kind: "ok" | "err";
        text: string;
        login?: boolean;
    } | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!reason) return;
        setLoading(true);
        setMsg(null);

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            setMsg({ kind: "err", text: t.loginFirst, login: true });
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("reports").insert({
            target_type: targetType,
            target_id: targetId,
            reason,
            details: details.trim() || null,
        });

        if (error) {
            const text =
                error.code === "23505"
                    ? t.already
                    : error.message.includes("too many")
                        ? t.tooMany
                        : t.failed;
            setMsg({ kind: "err", text });
        } else {
            setMsg({ kind: "ok", text: t.thanks });
            setOpen(false);
            setReason("");
            setDetails("");
        }
        setLoading(false);
    }

    return (
        <div className="mt-2 text-sm">
            {!open && (
                <button
                    type="button"
                    onClick={() => {
                        setOpen(true);
                        setMsg(null);
                    }}
                    className="text-xs text-muted underline hover:text-red-600"
                >
                    {t.report}
                </button>
            )}

            {open && (
                <form
                    onSubmit={submit}
                    className="mt-2 flex max-w-md flex-col gap-2 rounded-2xl border border-line bg-card p-4"
                >
                    <p className="font-semibold">{t.title}</p>
                    <select
                        required
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="rounded-xl border border-line bg-surface px-3 py-2"
                    >
                        <option value="">{t.chooseReason}</option>
                        {REPORT_REASONS.map((r) => (
                            <option key={r} value={r}>
                                {t.reasons[r]}
                            </option>
                        ))}
                    </select>
                    <textarea
                        rows={2}
                        maxLength={500}
                        placeholder={t.detailsPh}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="rounded-xl border border-line bg-surface px-3 py-2"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading || !reason}
                            className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? t.sending : t.send}
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-line px-4 py-2 text-xs"
                        >
                            {t.cancel}
                        </button>
                    </div>
                </form>
            )}

            {msg && (
                <p
                    className={`mt-2 text-xs ${msg.kind === "ok" ? "text-ocean-700" : "text-red-600"
                        }`}
                >
                    {msg.text}{" "}
                    {msg.login && (
                        <Link href="/login" className="underline">
                            {t.goLogin}
                        </Link>
                    )}
                </p>
            )}
        </div>
    );
}