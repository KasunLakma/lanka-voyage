import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { youtubeThumb } from "@/lib/youtube";
import { VIDEO_CATEGORIES, VIDEO_TEXT } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";

export default async function VideosPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const { category } = await searchParams;
    const t = VIDEO_TEXT[locale];

    const supabase = await createClient();
    let query = supabase
        .from("videos")
        .select("id,youtube_id,title,category,district")
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (category && VIDEO_CATEGORIES.some((c) => c.key === category)) {
        query = query.eq("category", category);
    }
    const { data: videos } = await query;

    const chip = (active: boolean) =>
        `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active
            ? "bg-ocean-600 text-white"
            : "text-muted hover:bg-ocean-50 hover:text-ocean-700"
        }`;

    return (
        <Container className="py-12">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <SectionTitle title={t.title} subtitle={t.subtitle} />
                <Link href="/videos/new" className={buttonStyles("primary")}>
                    + {t.addVideo}
                </Link>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-line pb-3">
                <Link href="/videos" className={chip(!category)}>
                    {t.all}
                </Link>
                {VIDEO_CATEGORIES.map((c) => (
                    <Link
                        key={c.key}
                        href={`/videos?category=${c.key}`}
                        className={chip(category === c.key)}
                    >
                        {c.icon} {c.label[locale]}
                    </Link>
                ))}
            </div>

            {videos && videos.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((v) => {
                        const cat = VIDEO_CATEGORIES.find((c) => c.key === v.category);
                        return (
                            <Link
                                key={v.id}
                                href={`/videos/${v.id}`}
                                className="group block overflow-hidden rounded-3xl border border-line bg-card shadow-sm transition hover:shadow-md"
                            >
                                <div className="relative aspect-video">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={youtubeThumb(v.youtube_id)}
                                        alt={v.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition group-hover:scale-110">
                                            ▶
                                        </span>
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="line-clamp-2 font-bold">{v.title}</h3>
                                    <p className="mt-1 text-sm text-muted">
                                        {cat?.icon} {cat?.label[locale]} · {v.district}
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