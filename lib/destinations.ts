import type { SupabaseClient } from "@supabase/supabase-js";
import type { Locale3 } from "@/data/destinations";
import { listingImageUrl } from "@/lib/images";

export const DEST_COLUMNS =
    "slug,image,category,name_en,name_si,name_ta,summary_en,summary_si,summary_ta,best_time_en,best_time_si,best_time_ta,highlights_en,highlights_si,highlights_ta,lat,lng";

export type Dest = {
    slug: string;
    image: string;
    category: string;
    name_en: string;
    name_si: string | null;
    name_ta: string | null;
    summary_en: string | null;
    summary_si: string | null;
    summary_ta: string | null;
    best_time_en: string | null;
    best_time_si: string | null;
    best_time_ta: string | null;
    highlights_en: string[];
    highlights_si: string[];
    highlights_ta: string[];
    lat: number;
    lng: number;
};

// "/images/x.jpg" is a file in the project; anything else is in Supabase Storage
export function destImage(path: string) {
    return path.startsWith("/") ? path : listingImageUrl(path);
}

export function destName(d: Dest, locale: Locale3) {
    return (locale === "si" ? d.name_si : locale === "ta" ? d.name_ta : null) || d.name_en;
}

export function destSummary(d: Dest, locale: Locale3) {
    return (
        (locale === "si" ? d.summary_si : locale === "ta" ? d.summary_ta : null) ||
        d.summary_en ||
        ""
    );
}

export function destBestTime(d: Dest, locale: Locale3) {
    return (
        (locale === "si" ? d.best_time_si : locale === "ta" ? d.best_time_ta : null) ||
        d.best_time_en ||
        ""
    );
}

export function destHighlights(d: Dest, locale: Locale3) {
    const list =
        locale === "si" ? d.highlights_si : locale === "ta" ? d.highlights_ta : d.highlights_en;
    return list && list.length > 0 ? list : d.highlights_en;
}

export async function fetchDestinations(supabase: SupabaseClient): Promise<Dest[]> {
    const { data } = await supabase
        .from("destinations")
        .select(DEST_COLUMNS)
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
    return (data ?? []) as unknown as Dest[];
}