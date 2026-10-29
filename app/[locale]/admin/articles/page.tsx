import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminNav from "@/components/admin/AdminNav";
import ModerationActions from "@/components/admin/ModerationActions";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { ADMIN_TEXT } from "@/data/adminText";
import { ARTICLE_TEXT, ARTICLE_LANGS } from "@/data/articleText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";

const STATUSES = ["pending", "published", "rejected"] as const;

export default async function AdminArticlesPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = ADMIN_TEXT[locale];
    const at = ARTICLE_TEXT[locale];
    const { status: statusParam } = await searchParams;
    const status = STATUSES.find((s) => s === statusParam) ?? "pending";

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{at.loginFirst}</p>
                <Link href="/login" className={`${buttonStyles("primary")} mt-6`}>
                    {at.goLogin}
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
                <p className="text-lg">{t.notAdmin}</p>
            </Container>
        );
    }

    const { data: items } = await supabase
        .from("articles")
        .select(
            "id,title,summary,body,language,category,district,image_path,author_name,status,review_note,created_at",
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
            <h1 className="text-3xl font-bold">📝 {at.adminTitle}</h1>
            <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                🔎 {at.rules}
            </p>

            <div className="mb-6 mt-6 flex gap-2 border-b border-line pb-3">
                {STATUSES.map((s) => (
                    <Link
                        key={s}
                        href={`/admin/articles?status=${s}`}
                        className={tab(status === s)}
                    >
                        {t[s]}
                    </Link>
                ))}
            </div>

            {items && items.length > 0 ? (
                <div className="grid gap-4">
                    {items.map((a) => {
                        const cat = VIDEO_CATEGORIES.find((c) => c.key === a.category);
                        const lang = ARTICLE_LANGS.find((l) => l.key === a.language);
                        return (
                            <div
                                key={a.id}
                                className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                            >
                                {a.image_path && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={listingImageUrl(a.image_path)}
                                        alt=""
                                        className="mb-3 h-48 w-full rounded-2xl object-cover"
                                    />
                                )}
                                <h2 className="text-lg font-bold">{a.title}</h2>
                                <p className="text-sm text-muted">
                                    {cat?.icon} {cat?.label[locale]} · 📍 {a.district} ·{" "}
                                    {lang?.label} · {a.author_name} ·{" "}
                                    {new Date(a.created_at).toLocaleDateString()}
                                </p>
                                <p className="mt-2 text-sm font-medium">{a.summary}</p>
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-sm text-ocean-700">
                                        {at.fBody}
                                    </summary>
                                    <div className="mt-2 max-h-96 overflow-y-auto whitespace-pre-line rounded-xl bg-surface p-4 text-sm">
                                        {a.body}
                                    </div>
                                </details>
                                {a.review_note && (
                                    <p className="mt-2 text-sm text-red-700">📝 {a.review_note}</p>
                                )}
                                <ModerationActions
                                    table="articles"
                                    id={a.id}
                                    status={a.status}
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