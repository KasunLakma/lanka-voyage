import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import Hero from "@/components/landing/Hero";
import IslandMap from "@/components/landing/IslandMap";
import StatsBand from "@/components/landing/StatsBand";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import { createClient } from "@/lib/supabase/server";
import { destImage, destName, fetchDestinations } from "@/lib/destinations";
import { youtubeThumb } from "@/lib/youtube";
import { listingImageUrl } from "@/lib/images";
import { LANDING_TEXT } from "@/data/landingText";
import { COMMUNITY_TEXT, type Locale3 } from "@/data/destinations";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const ts = await getTranslations("sections");
    const tn = await getTranslations("nav");
    const lt = LANDING_TEXT[locale];
    const community = COMMUNITY_TEXT[locale];

    const supabase = await createClient();
    const [dests, videosRes, articlesRes, listingsCount, videosCount, articlesCount] =
        await Promise.all([
            fetchDestinations(supabase),
            supabase
                .from("videos")
                .select("id,youtube_id,title")
                .eq("status", "published")
                .order("created_at", { ascending: false })
                .limit(3),
            supabase
                .from("articles")
                .select("id,title,summary,image_path")
                .eq("status", "published")
                .order("created_at", { ascending: false })
                .limit(3),
            supabase
                .from("listings")
                .select("id", { count: "exact", head: true })
                .eq("status", "published"),
            supabase
                .from("videos")
                .select("id", { count: "exact", head: true })
                .eq("status", "published"),
            supabase
                .from("articles")
                .select("id", { count: "exact", head: true })
                .eq("status", "published"),
        ]);
    const videos = videosRes.data ?? [];
    const articles = articlesRes.data ?? [];
    const businesses = listingsCount.count ?? 0;

    return (
        <>
            <Hero
                images={dests.map((d) => ({ src: destImage(d.image), alt: d.name_en }))}
                destinations={dests.length}
                businesses={businesses}
            />

            <IslandMap
                pins={dests.map((d) => ({
                    slug: d.slug,
                    name: destName(d, locale),
                    lat: d.lat,
                    lng: d.lng,
                }))}
                title={lt.mapTitle}
                note={lt.mapNote}
            />

            <StatsBand
                items={[
                    { value: dests.length, label: lt.stats[0] },
                    { value: businesses, label: lt.stats[1] },
                    { value: videosCount.count ?? 0, label: lt.stats[2] },
                    { value: articlesCount.count ?? 0, label: lt.stats[3] },
                ]}
            />

            {dests.length > 0 && (
                <Container className="mt-8">
                    <SectionTitle title={ts("featuredDestinations")} />
                    <DestinationExplorer items={dests} />
                </Container>
            )}

            <Container className="mt-16">
                <div className="relative flex min-h-80 items-end overflow-hidden rounded-3xl p-8 text-white sm:p-12">
                    <Image
                        src="/images/ella.jpg"
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/10" />
                    <div className="relative max-w-xl">
                        <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
                            {community.title}
                        </h2>
                        <p className="mt-3 text-lg text-white/90">{community.sub}</p>
                        <Link
                            href="/register"
                            className="mt-6 inline-flex rounded-full bg-sun px-7 py-3.5 text-sm font-bold text-lagoon-900 hover:brightness-95"
                        >
                            {tn("register")}
                        </Link>
                    </div>
                </div>
            </Container>

            {videos.length > 0 && (
                <Container className="mt-14">
                    <div className="flex items-end justify-between">
                        <SectionTitle title={ts("featuredVideos")} />
                        <Link href="/videos" className="mb-6 text-sm text-ocean-700 underline">
                            {tn("videos")} →
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {videos.map((v) => (
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
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-xl text-white">
                                            ▶
                                        </span>
                                    </span>
                                </div>
                                <p className="line-clamp-2 p-4 font-bold">{v.title}</p>
                            </Link>
                        ))}
                    </div>
                </Container>
            )}

            {articles.length > 0 && (
                <Container className="mt-14">
                    <div className="flex items-end justify-between">
                        <SectionTitle title={ts("latestArticles")} />
                        <Link href="/articles" className="mb-6 text-sm text-ocean-700 underline">
                            {tn("articles")} →
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {articles.map((a) => (
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
                                        className="h-44 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-44 items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-5xl">
                                        📝
                                    </div>
                                )}
                                <div className="p-4">
                                    <p className="line-clamp-2 font-bold">{a.title}</p>
                                    <p className="mt-1 line-clamp-2 text-sm text-muted">{a.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            )}
        </>
    );
}