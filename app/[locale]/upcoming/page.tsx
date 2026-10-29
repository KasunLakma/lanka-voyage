import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FollowButton from "@/components/upcoming/FollowButton";
import { createClient } from "@/lib/supabase/server";
import { listingImageUrl } from "@/lib/images";
import { UPCOMING_TEXT } from "@/data/upcomingText";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default async function UpcomingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const ui = UI_TEXT[locale];
    const t = UPCOMING_TEXT[locale];

    const supabase = await createClient();
    const { data: items } = await supabase
        .from("upcoming_destinations")
        .select(
            "id,name_en,name_si,name_ta,summary_en,summary_si,summary_ta,district,status,expected_year,source_url,image_path",
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let followed = new Set<string>();
    if (user) {
        const { data: f } = await supabase
            .from("upcoming_follows")
            .select("upcoming_id");
        followed = new Set((f ?? []).map((x) => x.upcoming_id));
    }

    const statusLabel = {
        planned: ui.planned,
        under_construction: ui.underConstruction,
        opening_soon: ui.opensSoon,
    } as const;

    return (
        <Container className="py-12">
            <SectionTitle title={ui.upcoming} subtitle={ui.upcomingSub} />

            {items && items.length > 0 ? (
                <>
                    <p className="mb-10 text-sm text-muted">ℹ️ {t.notifyNote}</p>
                    <div className="space-y-16">
                        {items.map((u, i) => {
                            const name =
                                (locale === "si" ? u.name_si : locale === "ta" ? u.name_ta : null) ||
                                u.name_en;
                            const summary =
                                (locale === "si"
                                    ? u.summary_si
                                    : locale === "ta"
                                        ? u.summary_ta
                                        : null) || u.summary_en;
                            return (
                                <div
                                    key={u.id}
                                    className="grid items-center gap-8 md:grid-cols-2"
                                >
                                    <div
                                        className={`relative aspect-4/3 overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] shadow-lg ${i % 2 ? "md:order-2" : ""
                                            }`}
                                    >
                                        {u.image_path ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={listingImageUrl(u.image_path)}
                                                alt={name}
                                                loading="lazy"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-ocean-600 to-tea-500 text-7xl">
                                                🗓️
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative rounded-2xl border border-line bg-card p-6 pt-10 shadow-md">
                                        <div className="absolute -top-8 right-4 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-4 border-double border-ocean-700/70 bg-card p-2 text-center text-[11px] font-extrabold uppercase leading-tight text-ocean-700/80">
                                            {statusLabel[u.status as keyof typeof statusLabel]}
                                        </div>
                                        <h3 className="text-2xl font-bold">{name}</h3>
                                        <p className="mt-1 text-sm text-muted">
                                            📍 {u.district}
                                            {u.expected_year
                                                ? ` · ${ui.expected}: ${u.expected_year}`
                                                : ""}
                                        </p>
                                        {summary && <p className="mt-3">{summary}</p>}
                                        <a
                                            href={u.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-block text-sm text-ocean-700 underline"
                                        >
                                            🔗 {t.source}
                                        </a>
                                        <div>
                                            <FollowButton
                                                id={u.id}
                                                followed={followed.has(u.id)}
                                                loggedIn={!!user}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <p className="py-16 text-center text-muted">{t.empty}</p>
            )}
        </Container>
    );
}