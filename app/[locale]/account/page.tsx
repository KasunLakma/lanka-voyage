import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import UpgradeForm from "@/components/plans/UpgradeForm";
import { createClient } from "@/lib/supabase/server";
import { PLAN_TEXT, LIMITS, effectivePlan } from "@/data/planText";
import type { Locale3 } from "@/data/destinations";

export default async function AccountPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = PLAN_TEXT[locale];

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
        .select("full_name,plan,plan_expires_at,account_type")
        .eq("id", user.id)
        .single();

    const plan = effectivePlan(profile?.plan, profile?.plan_expires_at);

    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);

    const { count: videoCount } = await supabase
        .from("videos")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id)
        .gte("created_at", monthStart.toISOString());

    const { count: listingCount } = await supabase
        .from("listings")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id);

    const { data: requests } = await supabase
        .from("payment_requests")
        .select("id,plan,months,currency,amount,payment_code,status,review_note,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    const statusStyle = {
        pending: "bg-gold-400/30 text-amber-800",
        approved: "bg-ocean-50 text-ocean-700",
        rejected: "bg-red-100 text-red-700",
    } as const;

    return (
        <Container className="max-w-3xl py-12">
            <h1 className="text-3xl font-bold">{t.account}</h1>
            <p className="mt-1 text-muted">
                {profile?.full_name} · {user.email}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-line bg-card p-6">
                    <p className="text-sm text-muted">{t.planLabel}</p>
                    <p className="mt-1 text-3xl font-extrabold text-ocean-700">
                        {t[plan]}
                    </p>
                    {plan !== "free" && profile?.plan_expires_at && (
                        <p className="mt-1 text-sm text-muted">
                            {t.validUntil}:{" "}
                            {new Date(profile.plan_expires_at).toLocaleDateString()}
                        </p>
                    )}
                    <Link href="/pricing" className="mt-3 inline-block text-sm text-ocean-700 underline">
                        {t.seePlans}
                    </Link>
                </div>

                <div className="rounded-3xl border border-line bg-card p-6">
                    <p className="text-sm font-semibold">{t.usageTitle}</p>
                    <p className="mt-3 text-sm">
                        🎬 {t.videosUsed}: {videoCount ?? 0} {t.of} {LIMITS[plan].videos}
                    </p>
                    {profile?.account_type === "provider" && (
                        <p className="mt-2 text-sm">
                            🏨 {t.listingsUsed}: {listingCount ?? 0} {t.of}{" "}
                            {LIMITS[plan].listings}
                        </p>
                    )}
                    {profile?.account_type === "provider" && (
                        <Link href="/provider" className="mt-3 inline-block text-sm text-ocean-700 underline">
                            {t.myListings}
                        </Link>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <UpgradeForm />
            </div>

            <h2 className="mt-10 text-2xl font-bold">{t.myRequests}</h2>
            {requests && requests.length > 0 ? (
                <div className="mt-4 grid gap-3">
                    {requests.map((r) => {
                        const status = r.status as keyof typeof statusStyle;
                        return (
                            <div
                                key={r.id}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4"
                            >
                                <div>
                                    <p className="font-bold">
                                        {t[r.plan as "plus" | "pro"]} · {r.months}m · {r.currency}{" "}
                                        {Number(r.amount).toLocaleString("en-US")}
                                    </p>
                                    <p className="text-sm text-muted">
                                        {r.payment_code} ·{" "}
                                        {new Date(r.created_at).toLocaleDateString()}
                                    </p>
                                    {r.review_note && (
                                        <p className="mt-1 text-sm text-red-700">📝 {r.review_note}</p>
                                    )}
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                                >
                                    {t[status]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="mt-4 text-muted">{t.noRequests}</p>
            )}
        </Container>
    );
}