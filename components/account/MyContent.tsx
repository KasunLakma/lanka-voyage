import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { MANAGE_TEXT } from "@/data/manageText";
import type { Locale3 } from "@/data/destinations";
import OwnerActions from "./OwnerActions";

const statusStyle = {
    pending: "bg-gold-400/30 text-amber-800",
    published: "bg-ocean-50 text-ocean-700",
    rejected: "bg-red-100 text-red-700",
} as const;

export default async function MyContent({
    userId,
    locale,
    isProvider,
}: {
    userId: string;
    locale: Locale3;
    isProvider: boolean;
}) {
    const t = MANAGE_TEXT[locale];
    const supabase = await createClient();

    const [listings, videos, articles] = await Promise.all([
        isProvider
            ? supabase
                .from("listings")
                .select("id,name,status,image_path,review_note")
                .eq("owner_id", userId)
                .order("created_at", { ascending: false })
            : Promise.resolve({ data: [] as never[] }),
        supabase
            .from("videos")
            .select("id,title,status,review_note")
            .eq("owner_id", userId)
            .order("created_at", { ascending: false }),
        supabase
            .from("articles")
            .select("id,title,status,image_path,review_note")
            .eq("author_id", userId)
            .order("created_at", { ascending: false }),
    ]);

    type Item = {
        id: string;
        title: string;
        status: string;
        image_path?: string | null;
        review_note?: string | null;
    };
    const groups: {
        heading: string;
        table: "listings" | "videos" | "articles";
        editBase: string;
        viewBase: string;
        items: Item[];
        show: boolean;
    }[] = [
            {
                heading: t.myListings,
                table: "listings",
                editBase: "/edit/listing",
                viewBase: "/directory",
                show: isProvider,
                items: (listings.data ?? []).map((x: { id: string; name: string; status: string; image_path: string | null; review_note: string | null }) => ({
                    id: x.id,
                    title: x.name,
                    status: x.status,
                    image_path: x.image_path,
                    review_note: x.review_note,
                })),
            },
            {
                heading: t.myVideos,
                table: "videos",
                editBase: "/edit/video",
                viewBase: "/videos",
                show: true,
                items: (videos.data ?? []).map((x) => ({
                    id: x.id,
                    title: x.title,
                    status: x.status,
                    review_note: x.review_note,
                })),
            },
            {
                heading: t.myArticles,
                table: "articles",
                editBase: "/edit/article",
                viewBase: "/articles",
                show: true,
                items: (articles.data ?? []).map((x) => ({
                    id: x.id,
                    title: x.title,
                    status: x.status,
                    image_path: x.image_path,
                    review_note: x.review_note,
                })),
            },
        ];

    const label = {
        pending: t.pending,
        published: t.published,
        rejected: t.rejected,
    } as const;

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold">{t.myContent}</h2>
            {groups
                .filter((g) => g.show)
                .map((g) => (
                    <div key={g.table} className="mt-5">
                        <h3 className="font-semibold">{g.heading}</h3>
                        {g.items.length === 0 ? (
                            <p className="mt-2 text-sm text-muted">{t.none}</p>
                        ) : (
                            <div className="mt-2 grid gap-2">
                                {g.items.map((i) => {
                                    const status = i.status as keyof typeof label;
                                    return (
                                        <div
                                            key={i.id}
                                            className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-line bg-card p-4"
                                        >
                                            <div className="min-w-0">
                                                <Link
                                                    href={`${g.viewBase}/${i.id}`}
                                                    className="font-bold hover:text-ocean-700"
                                                >
                                                    {i.title}
                                                </Link>
                                                {status === "rejected" && i.review_note && (
                                                    <p className="text-sm text-red-700">
                                                        📝 {i.review_note}
                                                    </p>
                                                )}
                                                <OwnerActions
                                                    table={g.table}
                                                    id={i.id}
                                                    imagePath={i.image_path}
                                                    editHref={`${g.editBase}/${i.id}`}
                                                />
                                            </div>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                                            >
                                                {label[status]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}