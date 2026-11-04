import type { Metadata } from "next";
import { LOCALES, SITE_URL } from "./site";

// Canonical link + language versions of a page (helps Google show the right language)
export function pageAlternates(
    locale: string,
    path: string,
): Metadata["alternates"] {
    const p = path === "/" ? "" : path;
    return {
        canonical: `${SITE_URL}/${locale}${p}`,
        languages: {
            ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${p}`])),
            "x-default": `${SITE_URL}/en${p}`,
        },
    };
}

export function clip(text: string | null | undefined, max = 160) {
    const s = (text ?? "").replace(/\s+/g, " ").trim();
    return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}