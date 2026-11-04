import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import { youtubeEmbed, youtubeThumb } from "@/lib/youtube";
import { VIDEO_CATEGORIES, VIDEO_TEXT } from "@/data/videoText";
import type { Locale3 } from "@/data/destinations";
import ReportButton from "@/components/reviews/ReportButton";
import type { Metadata } from "next";
import { clip, pageAlternates } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
    const { locale, id } = await params;
    const supabase = await createClient();
    const { data: v } = await supabase
        .from("videos")
        .select("title,description,youtube_id,status")
        .eq("id", id)
        .maybeSingle();
    if (!v) return {};
    return {
        title: v.title,
        description: clip(v.description) || v.title,
        alternates: pageAlternates(locale, `/videos/${id}`),
        robots: { index: v.status === "published" },
        openGraph: {
            title: v.title,
            description: clip(v.description) || v.title,
            images: [youtubeThumb(v.youtube_id)],
        },
    };
}
export default async function VideoPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale: raw, id } = await params;
    const locale = raw as Locale3;
    const t = VIDEO_TEXT[locale];

    const supabase = await createClient();
    const { data: video } = await supabase
        .from("videos")
        .select("youtube_id,title,description,category,district,status")
        .eq("id", id)
        .maybeSingle();

    if (!video) notFound();
    const cat = VIDEO_CATEGORIES.find((c) => c.key === video.category);

    return (
        <Container className="max-w-4xl py-10">
            <Link href="/videos" className="text-sm text-ocean-700 underline">
                ← {t.back}
            </Link>

            <div className="mt-4 aspect-video overflow-hidden rounded-3xl bg-black shadow-lg">
                <iframe
                    src={youtubeEmbed(video.youtube_id)}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>

            <h1 className="mt-6 text-3xl font-bold">{video.title}</h1>
            <p className="mt-2 text-muted">
                {cat?.icon} {cat?.label[locale]} · 📍 {video.district}
            </p>
            {video.status !== "published" && (
                <p className="mt-3 rounded-xl bg-gold-400/20 px-4 py-2 text-sm">
                    ⏳ {video.status}
                </p>
            )}
            {video.description && (
                <p className="mt-4 whitespace-pre-line text-lg leading-relaxed">
                    {video.description}
                </p>
            )}
            <div className="mt-8">
                <ReportButton targetType="video" targetId={id} />
            </div>
        </Container>
    );
}