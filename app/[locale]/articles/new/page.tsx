import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import ArticleForm from "@/components/articles/ArticleForm";
import { createClient } from "@/lib/supabase/server";
import { ARTICLE_TEXT } from "@/data/articleText";
import type { Locale3 } from "@/data/destinations";

export default async function NewArticlePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const t = ARTICLE_TEXT[raw as Locale3];

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

    const { data: mine } = await supabase
        .from("articles")
        .select("id,title,status,review_note,created_at")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

    const statusLabel = {
        pending: t.pending,
        published: t.published,
        rejected: t.rejected,
    } as const;
    const statusStyle = {
        pending: "bg-gold-400/30 text-amber-800",
        published: "bg-ocean-50 text-ocean-700",
        rejected: "bg-red-100 text-red-700",
    } as const;

    return (
        <Container className="py-12">
            <ArticleForm />

            <div className="mx-auto mt-10 max-w-2xl">
                <h2 className="text-2xl font-bold">{t.myArticles}</h2>
                {mine && mine.length > 0 ? (
                    <div className="mt-4 grid gap-3">
                        {mine.map((a) => {
                            const status = a.status as keyof typeof statusLabel;
                            return (
                                <div
                                    key={a.id}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4"
                                >
                                    <div className="min-w-0">
                                        <Link
                                            href={`/articles/${a.id}`}
                                            className="font-bold hover:text-ocean-700"
                                        >
                                            {a.title}
                                        </Link>
                                        <p className="text-xs text-muted">
                                            {new Date(a.created_at).toLocaleDateString()}
                                        </p>
                                        {a.status === "rejected" && a.review_note && (
                                            <p className="mt-1 text-sm text-red-700">
                                                📝 {a.review_note}
                                            </p>
                                        )}
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                                    >
                                        {statusLabel[status]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="mt-4 text-muted">{t.none}</p>
                )}
            </div>
        </Container>
    );
}