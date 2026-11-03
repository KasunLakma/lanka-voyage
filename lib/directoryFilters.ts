import { CATEGORIES, DISTRICTS } from "@/data/listingText";

export type Filters = {
    category: string;
    district: string;
    verified: boolean;
    q: string;
};

type RawParams = {
    category?: string;
    district?: string;
    verified?: string;
    q?: string;
};

// Only values we know are accepted (anything else is ignored)
export function parseFilters(sp: RawParams): Filters {
    return {
        category: CATEGORIES.some((c) => c.key === sp.category)
            ? (sp.category as string)
            : "",
        district: DISTRICTS.includes(sp.district ?? "")
            ? (sp.district as string)
            : "",
        verified: sp.verified === "1",
        q: (sp.q ?? "").slice(0, 60),
    };
}

export function buildQuery(f: Filters) {
    const p = new URLSearchParams();
    if (f.category) p.set("category", f.category);
    if (f.district) p.set("district", f.district);
    if (f.verified) p.set("verified", "1");
    if (f.q.trim()) p.set("q", f.q.trim());
    const s = p.toString();
    return s ? `/directory?${s}` : "/directory";
}

// Stops "%" and "_" typed in the search box from acting as wildcards
const escapeLike = (s: string) => s.replace(/[\\%_]/g, "\\$&");

type Q = {
    eq: (column: string, value: unknown) => Q;
    ilike: (column: string, pattern: string) => Q;
};

// Adds the filters to a Supabase query (used on the server page AND for the live count)
export function applyFilters<T>(query: T, f: Filters): T {
    let q = query as unknown as Q;
    if (f.category) q = q.eq("category", f.category);
    if (f.district) q = q.eq("district", f.district);
    if (f.verified) q = q.eq("verified", true);
    if (f.q.trim()) q = q.ilike("name", `%${escapeLike(f.q.trim())}%`);
    return q as unknown as T;
}