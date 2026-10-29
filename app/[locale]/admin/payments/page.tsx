import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminPaymentActions from "@/components/plans/AdminPaymentActions";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_TEXT } from "@/data/adminText";
import { PLAN_TEXT } from "@/data/planText";
import type { Locale3 } from "@/data/destinations";
import AdminNav from "@/components/admin/AdminNav";

const STATUSES = ["pending", "approved", "rejected"] as const;

export default async function AdminPaymentsPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = PLAN_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const { status: statusParam } = await searchParams;
    const status = STATUSES.find((s) => s === statusParam) ?? "pending";

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{t.loginFirst}</p>
                <Link href="/login" className={`${buttonStyles("primary")} mt-6`}>
                    {t.goLogin}
                </Link>
            </Container>
        );
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

    if (!profile?.is_admin) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{at.notAdmin}</p>
            </Container>
        );
    }

    const { data: items } = await supabase
        .from("payment_requests")
        .select(
            "id,plan,months,currency,amount,payment_code,contact_email,note,status,review_note,created_at",
        )
        .eq("status", status)
        .order("created_at", { ascending: false });

    const tab = (active: boolean) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <AdminNav />
            <h1 className="text-3xl font-bold">💳 {t.adminTitle}</h1>
            <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                🔎 {t.adminHint}
            </p>

            <div className="mb-6 mt-6 flex gap-2 border-b border-line pb-3">
                {STATUSES.map((s) => (
                    <Link
                        key={s}
                        href={`/admin/payments?status=${s}`}
                        className={tab(status === s)}
                    >
                        {t[s]}
                    </Link>
                ))}
            </div>

            {items && items.length > 0 ? (
                <div className="grid gap-4">
                    {items.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <p className="text-xl font-extrabold tracking-wider text-ocean-800">
                                        {r.payment_code}
                                    </p>
                                    <p className="font-semibold">
                                        {t[r.plan as "plus" | "pro"]} · {r.months} · {t.amountLbl}:{" "}
                                        {r.currency} {Number(r.amount).toLocaleString("en-US")}
                                    </p>
                                </div>
                                <p className="text-sm text-muted">
                                    {new Date(r.created_at).toLocaleString()}
                                </p>
                            </div>
                            <p className="mt-2 text-sm">
                                ✉️ {t.emailLbl}: {r.contact_email}
                            </p>
                            {r.note && <p className="mt-1 text-sm">📝 {r.note}</p>}
                            {r.review_note && (
                                <p className="mt-1 text-sm text-red-700">{r.review_note}</p>
                            )}
                            <AdminPaymentActions id={r.id} status={r.status} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            )}
        </Container>
    );
}