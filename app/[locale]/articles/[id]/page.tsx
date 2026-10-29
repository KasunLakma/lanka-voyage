import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { ARTICLE_TEXT, ARTICLE_LANGS } from "@/data/articleText";
import { VIDEO_CATEGORIES } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";
import ReportButton from "@/components/reviews/ReportButton";

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale: raw, id } = await params;
    const locale = raw as Locale3;
    const t = ARTICLE_TEXT[locale];

    const supabase = await createClient();
    const { data: a } = await supabase
        .from("articles")
        .select(
            "title,summary,body,language,category,district,image_path,author_name,status,created_at",
        )
        .eq("id", id)
        .maybeSingle();

    if (!a) notFound();

    const cat = VIDEO_CATEGORIES.find((c) => c.key === a.category);
    const lang = ARTICLE_LANGS.find((l) => l.key === a.language);
    const paragraphs: string[] = String(a.body).split(/\n{2,}/);

    return (
        <article className="pb-16">
            {a.image_path && (
                <div className="relative h-72 w-full overflow-hidden sm:h-96">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={listingImageUrl(a.image_path)}
                        alt={a.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </div>
            )}

            <Container className="max-w-3xl pt-8">
                <Link href="/articles" className="text-sm text-ocean-700 underline">
                    ← {t.back}
                </Link>

                {a.status !== "published" && (
                    <p className="mt-4 rounded-xl bg-gold-400/20 px-4 py-2 text-sm">
                        ⏳ {t.pendingBanner} ({a.status})
                    </p>
                )}

                <p className="mt-4 text-sm text-muted">
                    {cat?.icon} {cat?.label[locale]} · 📍 {a.district} ·{" "}
                    <span className="rounded-full bg-ocean-50 px-2 py-0.5 text-ocean-700">
                        {lang?.label}
                    </span>
                </p>
                <h1 className="mt-2 text-4xl font-extrabold leading-tight">
                    {a.title}
                </h1>
                <p className="mt-2 text-sm text-muted">
                    {t.by} {a.author_name} ·{" "}
                    {new Date(a.created_at).toLocaleDateString()}
                </p>
                <p className="mt-5 text-xl font-medium text-muted">{a.summary}</p>

                <div className="mt-6">
                    {paragraphs.map((p, i) => (
                        <p
                            key={i}
                            className="mt-4 whitespace-pre-line text-lg leading-relaxed"
                        >
                            {p}
                        </p>
                    ))}
                </div>
                <div className="mt-8">
                    <ReportButton targetType="article" targetId={id} />
                </div>
            </Container>
        </article>
    );
}