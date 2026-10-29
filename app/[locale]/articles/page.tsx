import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { ARTICLE_TEXT, ARTICLE_LANGS } from "@/data/articleText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";

export default async function ArticlesPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const { category } = await searchParams;
    const t = ARTICLE_TEXT[locale];

    const supabase = await createClient();
    let query = supabase
        .from("articles")
        .select("id,title,summary,language,category,district,image_path,author_name,created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (category && VIDEO_CATEGORIES.some((c) => c.key === category)) {
        query = query.eq("category", category);
    }
    const { data: articles } = await query;

    const chip = (active: boolean) =>
        `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <SectionTitle title={t.title} subtitle={t.subtitle} />
                <Link href="/articles/new" className={buttonStyles("primary")}>
                    ✍️ {t.write}
                </Link>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-line pb-3">
                <Link href="/articles" className={chip(!category)}>
                    {t.all}
                </Link>
                {VIDEO_CATEGORIES.map((c) => (
                    <Link
                        key={c.key}
                        href={`/articles?category=${c.key}`}
                        className={chip(category === c.key)}
                    >
                        {c.icon} {c.label[locale]}
                    </Link>
                ))}
            </div>

            {articles && articles.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((a) => {
                        const cat = VIDEO_CATEGORIES.find((c) => c.key === a.category);
                        const lang = ARTICLE_LANGS.find((l) => l.key === a.language);
                        return (
                            <Link
                                key={a.id}
                                href={`/articles/${a.id}`}
                                className="group block overflow-hidden rounded-3xl border border-line bg-card shadow-sm transition hover:shadow-md"
                            >
                                {a.image_path ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={listingImageUrl(a.image_path)}
                                        alt={a.title}
                                        loading="lazy"
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-6xl">
                                        {cat?.icon ?? "📝"}
                                    </div>
                                )}
                                <div className="p-5">
                                    <p className="text-xs text-muted">
                                        {cat?.icon} {cat?.label[locale]} · {a.district} ·{" "}
                                        <span className="rounded-full bg-ocean-50 px-2 py-0.5 text-ocean-700">
                                            {lang?.label}
                                        </span>
                                    </p>
                                    <h3 className="mt-2 line-clamp-2 text-lg font-bold">
                                        {a.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm text-muted">
                                        {a.summary}
                                    </p>
                                    <p className="mt-3 text-xs text-muted">
                                        {t.by} {a.author_name} ·{" "}
                                        {new Date(a.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            )}
        </Container>
    );
}