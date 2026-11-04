import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { LOCALES, SITE_URL } from "@/lib/site";

export const revalidate = 3600; // rebuilt at most once an hour

const STATIC_PAGES = [
    "",
    "/destinations",
    "/upcoming",
    "/articles",
    "/directory",
    "/map",
    "/videos",
    "/pricing",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/content-policy",
];

function entry(
    path: string,
    lastModified?: string,
    priority = 0.6,
): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
    );
    return LOCALES.map((l) => ({
        url: `${SITE_URL}/${l}${path}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority,
        alternates: { languages },
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createPublicClient();
    const [dests, articles, listings, videos] = await Promise.all([
        supabase.from("destinations").select("slug,created_at").eq("published", true),
        supabase.from("articles").select("id,created_at").eq("status", "published"),
        supabase.from("listings").select("id,created_at").eq("status", "published"),
        supabase.from("videos").select("id,created_at").eq("status", "published"),
    ]);

    return [
        ...STATIC_PAGES.flatMap((p) => entry(p, undefined, p === "" ? 1 : 0.7)),
        ...(dests.data ?? []).flatMap((x) =>
            entry(`/destinations/${x.slug}`, x.created_at, 0.9),
        ),
        ...(articles.data ?? []).flatMap((x) =>
            entry(`/articles/${x.id}`, x.created_at, 0.7),
        ),
        ...(listings.data ?? []).flatMap((x) =>
            entry(`/directory/${x.id}`, x.created_at, 0.7),
        ),
        ...(videos.data ?? []).flatMap((x) =>
            entry(`/videos/${x.id}`, x.created_at, 0.6),
        ),
    ];
}