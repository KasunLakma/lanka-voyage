import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import SaveButton from "@/components/saved/SaveButton";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { youtubeThumb } from "@/lib/youtube";
import { destImage } from "@/lib/destinations";
import { effectivePlan } from "@/data/planText";
import { SAVED_LIMIT, SAVED_TEXT } from "@/data/savedText";
import type { Locale3 } from "@/data/destinations";

type Card = {
    key: string;
    type: "listing" | "destination" | "video" | "article";
    id: string;
    title: string;
    href: string;
    image: string | null;
    createdAt: string;
};

export default async function SavedPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const t = SAVED_TEXT[locale];

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

    const [{ data: profile }, { data: favs }] = await Promise.all([
        supabase
            .from("profiles")
            .select("plan,plan_expires_at")
            .eq("id", user.id)
            .single(),
        supabase
            .from("favorites")
            .select("target_type,target_id,created_at")
            .order("created_at", { ascending: false }),
    ]);

    const plan = effectivePlan(profile?.plan, profile?.plan_expires_at);
    const max = SAVED_LIMIT[plan];
    const rows = favs ?? [];
    const idsOf = (type: string) =>
        rows.filter((r) => r.target_type === type).map((r) => r.target_id);

    const [ls, ds, vs, as] = await Promise.all([
        idsOf("listing").length
            ? supabase
                .from("listings")
                .select("id,name,image_path")
                .in("id", idsOf("listing"))
            : Promise.resolve({ data: [] as never[] }),
        idsOf("destination").length
            ? supabase
                .from("destinations")
                .select("slug,name_en,name_si,name_ta,image")
                .in("slug", idsOf("destination"))
            : Promise.resolve({ data: [] as never[] }),
        idsOf("video").length
            ? supabase
                .from("videos")
                .select("id,title,youtube_id")
                .in("id", idsOf("video"))
            : Promise.resolve({ data: [] as never[] }),
        idsOf("article").length
            ? supabase
                .from("articles")
                .select("id,title,image_path")
                .in("id", idsOf("article"))
            : Promise.resolve({ data: [] as never[] }),
    ]);

    const created = (type: string, id: string) =>
        rows.find((r) => r.target_type === type && r.target_id === id)?.created_at ??
        "";

    const cards: Card[] = [
        ...(ls.data ?? []).map(
            (x: { id: string; name: string; image_path: string | null }): Card => ({
                key: `listing:${x.id}`,
                type: "listing",
                id: x.id,
                title: x.name,
                href: `/directory/${x.id}`,
                image: x.image_path ? listingImageUrl(x.image_path) : null,
                createdAt: created("listing", x.id),
            }),
        ),
        ...(ds.data ?? []).map(
            (x: {
                slug: string;
                name_en: string;
                name_si: string | null;
                name_ta: string | null;
                image: string;
            }): Card => ({
                key: `destination:${x.slug}`,
                type: "destination",
                id: x.slug,
                title:
                    (locale === "si" ? x.name_si : locale === "ta" ? x.name_ta : null) ||
                    x.name_en,
                href: `/destinations/${x.slug}`,
                image: destImage(x.image),
                createdAt: created("destination", x.slug),
            }),
        ),
        ...(vs.data ?? []).map(
            (x: { id: string; title: string; youtube_id: string }): Card => ({
                key: `video:${x.id}`,
                type: "video",
                id: x.id,
                title: x.title,
                href: `/videos/${x.id}`,
                image: youtubeThumb(x.youtube_id),
                createdAt: created("video", x.id),
            }),
        ),
        ...(as.data ?? []).map(
            (x: { id: string; title: string; image_path: string | null }): Card => ({
                key: `article:${x.id}`,
                type: "article",
                id: x.id,
                title: x.title,
                href: `/articles/${x.id}`,
                image: x.image_path ? listingImageUrl(x.image_path) : null,
                createdAt: created("article", x.id),
            }),
        ),
    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const icon = { listing: "🏨", destination: "🌴", video: "🎬", article: "📝" };

    return (
        <Container className="py-12">
            <h1 className="text-3xl font-bold">♥ {t.title}</h1>
            <p className="mt-1 text-sm text-muted">
                {(max === null ? t.unlimited : t.count)
                    .replace("{n}", String(rows.length))
                    .replace("{max}", String(max ?? ""))}
                {max !== null && rows.length >= max && (
                    <>
                        {" · "}
                        <Link href="/pricing" className="text-ocean-700 underline">
                            {t.seePlans}
                        </Link>
                    </>
                )}
            </p>

            {cards.length === 0 ? (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c) => (
                        <div
                            key={c.key}
                            className="overflow-hidden rounded-3xl border border-line bg-card shadow-sm"
                        >
                            <Link href={c.href} className="block">
                                {c.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        loading="lazy"
                                        className="h-40 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-5xl">
                                        {icon[c.type]}
                                    </div>
                                )}
                            </Link>
                            <div className="p-4">
                                <p className="text-xs text-muted">
                                    {icon[c.type]} {t.types[c.type]}
                                </p>
                                <Link
                                    href={c.href}
                                    className="mt-1 line-clamp-2 block font-bold hover:text-ocean-700"
                                >
                                    {c.title}
                                </Link>
                                <div className="mt-3">
                                    <SaveButton
                                        targetType={c.type}
                                        targetId={c.id}
                                        initialSaved={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}