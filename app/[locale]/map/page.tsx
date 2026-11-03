import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import MapView, { type Pin } from "@/components/map/MapView";
import { createClient } from "@/lib/supabase/server";
import { fetchDestinations, destName } from "@/lib/destinations";
import type { Locale3 } from "@/data/destinations";
import { CATEGORIES } from "@/data/listingText";
import { MAP_TEXT } from "@/data/mapText";

export default async function MapPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const locale = raw as Locale3;
    const m = MAP_TEXT[locale];
    const tc = await getTranslations("categories");

    const supabase = await createClient();
    const [dests, listingsRes] = await Promise.all([
        fetchDestinations(supabase),
        supabase
            .from("listings")
            .select("id,name,category,district,phone,lat,lng")
            .eq("status", "published")
            .not("lat", "is", null)
            .not("lng", "is", null),
    ]);

    const pins: Pin[] = [
        ...dests.map((d) => ({
            id: `d-${d.slug}`,
            kind: "destination" as const,
            category: d.category,
            lng: d.lng,
            lat: d.lat,
            title: destName(d, locale),
            subtitle: tc(d.category),
            icon: "📍",
            href: `/destinations/${d.slug}`,
        })),
        ...(listingsRes.data ?? []).map((l) => {
            const cat = CATEGORIES.find((c) => c.key === l.category);
            return {
                id: `l-${l.id}`,
                kind: "listing" as const,
                category: l.category,
                lng: l.lng as number,
                lat: l.lat as number,
                title: l.name,
                subtitle: `${cat?.label[locale] ?? ""} · ${l.district}`,
                icon: cat?.icon ?? "📌",
                phone: l.phone as string,
            };
        }),
    ];

    const usedCategories = CATEGORIES.filter((c) =>
        pins.some((p) => p.kind === "listing" && p.category === c.key),
    );
    const chips = [
        { key: "all", label: m.all },
        { key: "destinations", label: m.destinations },
        ...usedCategories.map((c) => ({
            key: c.key,
            label: `${c.icon} ${c.label[locale]}`,
        })),
    ];

    return (
        <Container className="py-10">
            <SectionTitle title={m.title} subtitle={m.subtitle} />
            <MapView
                pins={pins}
                chips={chips}
                locale={locale}
                labels={{
                    call: m.call,
                    open: m.open,
                    nearMe: m.nearMe,
                    noLocation: m.noLocation,
                }}
            />
        </Container>
    );
}