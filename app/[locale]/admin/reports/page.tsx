import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminNav from "@/components/admin/AdminNav";
import ReportActions from "@/components/admin/ReportActions";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_TEXT } from "@/data/adminText";
import { REPORT_TEXT } from "@/data/reportText";
import type { Locale3 } from "@/data/destinations";

const STATUSES = ["open", "resolved", "dismissed"] as const;
type Row = { id: string;[key: string]: unknown };

export default async function AdminReportsPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = REPORT_TEXT[locale];
    const at = ADMIN_TEXT[locale];
    const { status: statusParam } = await searchParams;
    const status = STATUSES.find((s) => s === statusParam) ?? "open";

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <Link href="/login" className={buttonStyles("primary")}>
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

    const { data: reportRows } = await supabase
        .from("reports")
        .select("id,target_type,target_id,reason,details,status,admin_note,created_at")
        .eq("status", status)
        .order("created_at", { ascending: false });
    const reports = reportRows ?? [];

    // Look up the reported content (one query per content type)
    const idsOf = (type: string) => [
        ...new Set(
            reports.filter((r) => r.target_type === type).map((r) => r.target_id),
        ),
    ];
    async function fetchByIds(table: string, cols: string, ids: string[]) {
        if (ids.length === 0) return new Map<string, Row>();
        const { data } = await supabase.from(table).select(cols).in("id", ids);
        return new Map(((data ?? []) as unknown as Row[]).map((x) => [x.id, x]));
    }
    const [listings, videos, articles, reviews] = await Promise.all([
        fetchByIds("listings", "id,name,status", idsOf("listing")),
        fetchByIds("videos", "id,title,status", idsOf("video")),
        fetchByIds("articles", "id,title,status", idsOf("article")),
        fetchByIds(
            "reviews",
            "id,comment,rating,status,target_type,target_id",
            idsOf("review"),
        ),
    ]);

    // Group reports by the content they are about
    const groups = new Map<string, typeof reports>();
    reports.forEach((r) => {
        const key = `${r.target_type}:${r.target_id}`;
        groups.set(key, [...(groups.get(key) ?? []), r]);
    });

    function describe(type: string, id: string) {
        if (type === "listing") {
            const x = listings.get(id);
            return {
                label: x ? String(x.name) : t.gone,
                href: `/directory/${id}`,
                state: x ? String(x.status) : "",
            };
        }
        if (type === "video") {
            const x = videos.get(id);
            return {
                label: x ? String(x.title) : t.gone,
                href: `/videos/${id}`,
                state: x ? String(x.status) : "",
            };
        }
        if (type === "article") {
            const x = articles.get(id);
            return {
                label: x ? String(x.title) : t.gone,
                href: `/articles/${id}`,
                state: x ? String(x.status) : "",
            };
        }
        const x = reviews.get(id);
        const base = x?.target_type === "listing" ? "/directory" : "/destinations";
        return {
            label: x ? `${"★".repeat(Number(x.rating))} ${String(x.comment ?? "")}` : t.gone,
            href: x ? `${base}/${String(x.target_id)}` : "/",
            state: x ? String(x.status) : "",
        };
    }

    const tab = (active: boolean) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;
    const tabLabel = {
        open: t.openTab,
        resolved: t.resolvedTab,
        dismissed: t.dismissedTab,
    } as const;

    return (
        <Container className="py-12">
            <AdminNav />
            <h1 className="text-3xl font-bold">🚩 {t.adminTitle}</h1>
            <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                🔎 {t.adminHint}
            </p>

            <div className="mb-6 mt-6 flex gap-2 border-b border-line pb-3">
                {STATUSES.map((s) => (
                    <Link
                        key={s}
                        href={`/admin/reports?status=${s}`}
                        className={tab(status === s)}
                    >
                        {tabLabel[s]}
                    </Link>
                ))}
            </div>

            {groups.size > 0 ? (
                <div className="grid gap-4">
                    {[...groups.entries()].map(([key, items]) => {
                        const first = items[0];
                        const d = describe(first.target_type, first.target_id);
                        return (
                            <div
                                key={key}
                                className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase text-ocean-700">
                                            {t.types[first.target_type as keyof typeof t.types]}
                                            {d.state && ` · ${d.state}`}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-lg font-bold">
                                            {d.label}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                        {t.reportsN.replace("{n}", String(items.length))}
                                    </span>
                                </div>

                                <Link
                                    href={d.href}
                                    className="mt-2 inline-block text-sm text-ocean-700 underline"
                                >
                                    {t.view} →
                                </Link>

                                <ul className="mt-3 space-y-1 text-sm">
                                    {items.map((r) => (
                                        <li key={r.id}>
                                            •{" "}
                                            <strong>
                                                {t.reasons[r.reason as keyof typeof t.reasons]}
                                            </strong>
                                            {r.details ? `: ${r.details}` : ""}{" "}
                                            <span className="text-xs text-muted">
                                                ({new Date(r.created_at).toLocaleDateString()})
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {first.admin_note && (
                                    <p className="mt-2 text-sm text-muted">📝 {first.admin_note}</p>
                                )}

                                <ReportActions
                                    targetType={
                                        first.target_type as "listing" | "video" | "article" | "review"
                                    }
                                    targetId={first.target_id}
                                    status={first.status}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            )}
        </Container>
    );
}