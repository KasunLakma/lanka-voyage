import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import AdminVideoActions from "@/components/videos/AdminVideoActions";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_TEXT } from "@/data/adminText";
import { VIDEO_CATEGORIES, VIDEO_TEXT } from "@/data/videoText";
import { youtubeEmbed } from "@/lib/youtube";
import type { Locale3 } from "@/data/destinations";
import AdminNav from "@/components/admin/AdminNav";

const STATUSES = ["pending", "published", "rejected"] as const;

export default async function AdminVideosPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ status?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = ADMIN_TEXT[locale];
    const vt = VIDEO_TEXT[locale];
    const { status: statusParam } = await searchParams;
    const status = STATUSES.find((s) => s === statusParam) ?? "pending";

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <p className="text-lg">{vt.loginFirst}</p>
                <Link href="/login" className={`${buttonStyles("primary")} mt-6`}>
                    {vt.goLogin}
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
        .from("videos")
        .select(
            "id,youtube_id,title,description,category,district,status,review_note,created_at",
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
            <h1 className="text-3xl font-bold">🎬 {vt.title}</h1>
            <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-3 text-sm">
                🔎 {vt.rules}
            </p>

            <div className="mb-6 mt-6 flex gap-2 border-b border-line pb-3">
                {STATUSES.map((s) => (
                    <Link
                        key={s}
                        href={`/admin/videos?status=${s}`}
                        className={tab(status === s)}
                    >
                        {t[s]}
                    </Link>
                ))}
            </div>

            {items && items.length > 0 ? (
                <div className="grid gap-4">
                    {items.map((v) => {
                        const cat = VIDEO_CATEGORIES.find((c) => c.key === v.category);
                        return (
                            <div
                                key={v.id}
                                className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                            >
                                <div className="aspect-video max-w-xl overflow-hidden rounded-2xl bg-black">
                                    <iframe
                                        src={youtubeEmbed(v.youtube_id)}
                                        title={v.title}
                                        className="h-full w-full"
                                        allowFullScreen
                                    />
                                </div>
                                <h2 className="mt-3 text-lg font-bold">{v.title}</h2>
                                <p className="text-sm text-muted">
                                    {cat?.icon} {cat?.label[locale]} · 📍 {v.district} ·{" "}
                                    {new Date(v.created_at).toLocaleDateString()}
                                </p>
                                {v.description && (
                                    <p className="mt-2 text-sm">{v.description}</p>
                                )}
                                {v.review_note && (
                                    <p className="mt-2 text-sm text-red-700">📝 {v.review_note}</p>
                                )}
                                <AdminVideoActions id={v.id} status={v.status} />
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